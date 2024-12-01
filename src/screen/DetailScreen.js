import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import BASE_URL from '../component/apiConfig';
import styles from '../styles/DetailScreenStyles';

const DetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { courseId, userID } = route.params;
  console.log('nhận CourseId:', courseId);
  const [courseData, setCourseData] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [countEnrolledUsers, setCountEnrolledUsers] = useState(0);
  const [countFeedback, setCountFeedback] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const handleNavigateToReview = () => {
    navigation.navigate('ReviewCourse', { courseId, userID });
  };

  const fetchCourseDetail = useCallback(async () => {
    if (!userID) {
      console.log('Lỗi', 'Không tìm thấy ID người dùng');
      return;
    }

    try {
      setIsLoading(true);
      const courseResponse = await fetch(
        `${BASE_URL}/course/getDetailByCourseID/${courseId}/?userID=${userID}`
      );

      if (!courseResponse.ok) {
        throw new Error('Lỗi khi lấy thông tin chi tiết khóa học');
      }

      const courseData = await courseResponse.json();
      setCourseData(courseData);
      setIsError(false);
    } catch (error) {
      console.error('Lỗi khi lấy thông tin chi tiết khóa học:', error);
      setIsError(true);

    } finally {
      setIsLoading(false);
    }
  }, [courseId, userID]);

  const isFocused = useIsFocused();  const fetchEnrolledUsersCount = useCallback(async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/enrollCourse/countEnrolledUsers/${courseId}`
      );

      if (!response.ok) {
        throw new Error('Lỗi khi lấy số lượng học sinh đã tham gia');
      }

      const data = await response.json();
      setCountEnrolledUsers(data.count);
    } catch (error) {

      setCountEnrolledUsers(0);
    }
  }, [courseId]);


  useEffect(() => {
    fetchCourseDetail();
    fetchEnrolledUsersCount(); 
  }, [isFocused, fetchCourseDetail, fetchEnrolledUsersCount]);


  useEffect(() => {
    fetchCourseDetail();
  }, [isFocused, fetchCourseDetail]);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const ratingResponse = await fetch(
          `${BASE_URL}/feedbackCourse/averageRatingByCourseID/${courseId}`
        );

        if (!ratingResponse.ok) {
          throw new Error('Lỗi khi lấy đánh giá trung bình');
        }
        const ratingData = await ratingResponse.json();
        setAverageRating(ratingData.averageRating || 0);

        const feedbackResponse = await fetch(
          `${BASE_URL}/feedbackCourse/countFeedbackByCourseID/${courseId}`
        );

        if (!feedbackResponse.ok) {
          throw new Error('Lỗi khi lấy số lượng phản hồi');
        }
        const feedbackData = await feedbackResponse.json();
        setCountFeedback(feedbackData.count);
      } catch (error) {

        setAverageRating(0);
        setCountFeedback(0);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  // tạo link thanh tóan
  const createPaymentUrl = async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/payment/create-payment-url`,
        {
          method: 'POST',
          body: JSON.stringify({
            userID: userID,
            courseId,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await res.json();
      console.log('Dữ liệu trả về từ API thanh toán:', data);
      // Kiểm tra nếu có URL thanh toán trong dữ liệu trả về
      if (data && data.paymentUrl) {
        console.log('URL thanh toán:', data.paymentUrl);
        return data.paymentUrl;
      }
      // Nếu API trả về trực tiếp URL thay vì trong paymentUrl, kiểm tra trực tiếp
      else if (typeof data === 'string' && data.startsWith('http')) {
        console.log('URL thanh toán:', data);
        return data;
      }
      else {
        console.log('Lỗi', 'Không có URL thanh toán');
        return null;
      }
    } catch (error) {

      return null;
    }
  };


  // kiểm tra user đã tham gia khóa học chưa 
  const onJoinCoursePress = async () => {
    try {
      // Kiểm tra xem người dùng đã tham gia khóa học chưa
      console.log('Đang kiểm tra trạng thái tham gia khóa học...');
      const checkEnrollmentResponse = await fetch(
        `${BASE_URL}/enrollCourse/check-enrollment/${userID}/${courseId}`
      );
  
      if (!checkEnrollmentResponse.ok) {
        throw new Error('Lỗi khi kiểm tra tham gia khóa học');
      }
  
      const enrollmentData = await checkEnrollmentResponse.json();
      console.log('Dữ liệu trạng thái tham gia:', enrollmentData);
  
      // Nếu đã tham gia khóa học
      if (enrollmentData.enrolled) {
        Alert.alert(
          'Thông báo',
          'Bạn đã tham gia khóa học này rồi!',
          [
            {
              text: 'Quay lại khóa học của tôi',
              onPress: () => navigation.navigate('Tabs', {
                screen: 'Khóa học',
                params: { courseID: courseId, userID: userID }
              }),
            },
            {
              text: 'OK',
              style: 'cancel',
            },
          ]
        );
        return; // Dừng việc tạo link thanh toán và không tiếp tục
      }
  
      // Nếu khóa học có giá > 0, tạo URL thanh toán
      if (courseData.price > 0) {
        console.log('Đang tạo URL thanh toán...');
        const paymentUrl = await createPaymentUrl();
        if (paymentUrl) {
          console.log('URL thanh toán:', paymentUrl);
          // Chuyển sang màn thanh toán và truyền thêm courseId và userID
          navigation.navigate('CoursePayment', {
            paymentUrl,
            courseId,
            userID
          });
        }
      } else {
        // Nếu khóa học miễn phí, thực hiện đăng ký
        console.log('Đang đăng ký vào khóa học miễn phí...');
        const enrollResponse = await fetch(
          `${BASE_URL}/enrollCourse/enrollCourse/${userID}/${courseId}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
  
        if (!enrollResponse.ok) {
          throw new Error('Lỗi khi đăng ký khóa học');
        }
  
        const enrollResult = await enrollResponse.json();
        console.log('Kết quả đăng ký:', enrollResult);
        Alert.alert(
          'Thông báo',
          'Bạn đã tham gia khóa học thành công!',
          [
            {
              text: 'Quay lại khóa học của tôi',
              onPress: () => navigation.navigate('Tabs', {
                screen: 'Khóa học',
                params: { courseID: courseId, userID: userID }
              }),
            },
            {
              text: 'OK',
              style: 'cancel',
            },
          ]
        );
        setCourseData((prevData) => ({
          ...prevData,
          isJoinedCourse: true,
        }));
      }
    } catch (error) {
      Alert.alert(
        'Thông báo',
        'Có lỗi xảy ra khi tham gia khóa học',
        [
          {
            text: 'OK',
            style: 'cancel',
          },
        ]
      );
    }
  };
  


  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Đang tải thông tin khóa học...</Text>
      </View>
    );
  }

  if (isError || !courseData) {
    return (
      <View style={styles.container}>
        <Text>Không thể tải thông tin khóa học. Vui lòng thử lại sau.</Text>
      </View>
    );
  }

  const { name, img, describe, teacherID } = courseData;
  const teacherName = teacherID ? teacherID.name : 'Giảng viên không xác định';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../design/image/ic_back.png')}
            style={styles.imgBack}
          />
        </TouchableOpacity>
        <Text style={styles.txtHeader}>Thông tin khóa học</Text>
      </View>
      <View style={styles.top}>
        <View style={styles.banner}>
          <Image source={{ uri: img }} style={styles.imgBanner} />
          <Text style={styles.nameCourse}>{name}</Text>
        </View>
        <View style={styles.infoTeacher}>
          <Image
            source={{ uri: teacherID?.avatar }}
            style={styles.avatarTeacher}
          />
          <Text style={styles.nameTeacher}>{teacherName}</Text>
        </View>
        <View style={styles.infoCourse}>
          <Text style={styles.txtInfo}>Số bài học 7 quiz & 2 Video</Text>
          <Text style={styles.txtInfo}>Giá: {courseData.price.toLocaleString('vi-VN')} VND</Text>
        </View>
        <View style={styles.data_container}>
        <TouchableOpacity>
          <View style={styles.column}>
            <Text style={styles.txt_number}>{countEnrolledUsers} học sinh</Text>
            <Text style={styles.title}>Đã tham gia</Text>
          </View>
        </TouchableOpacity>
          <View style={styles.column}>
            <Text style={styles.txt_number}>
              {averageRating ? `${parseFloat(averageRating).toFixed(1)} ⭐` : '0 ⭐'}
            </Text>
            <Text style={styles.title}>Đánh giá</Text>
          </View>

          <View style={styles.column}>
            <Text style={styles.txt_number}>
              {countFeedback || '0'}
            </Text>
            <Text style={styles.title}>Nhận xét</Text>
            <TouchableOpacity onPress={handleNavigateToReview}>
              <Text style={styles.viewReviewsButton}>Xem đánh giá</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.line} />
        <View style={styles.describe}>
          <ScrollView nestedScrollEnabled={true} style={styles.scrollDescribe}>
            <Text style={styles.txt_describe}>{describe}</Text>
          </ScrollView>
        </View>
      </View>

      <View style={styles.button}>
        <TouchableOpacity
          style={styles.btn_container}
          onPress={onJoinCoursePress}
        >
          <Text style={styles.txtBtn}>
            {courseData.isJoinedCourse ? 'Bắt đầu' : 'Tham gia ngay'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailScreen;