import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import BASE_URL from '../component/apiConfig';
import styles from '../styles/DetailScreenStyles';
import Toast from 'react-native-toast-message';

const DetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { courseId, userID } = route.params;
  const [courseData, setCourseData] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [countEnrolledUsers, setCountEnrolledUsers] = useState(0);
  const [countFeedback, setCountFeedback] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  // show toast
  const showToast = (message) => {
    Toast.show({
      type: 'success',
      position: 'top',
      text1: message,
      visibilityTime: 3000, // Duration for the toast to be visible
      autoHide: true,
      topOffset: 50, // Adjust this to move the toast further down or up
    });
  };



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

  const isFocused = useIsFocused();
  const fetchEnrolledUsersCount = useCallback(async () => {
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

 // tạo link thanh toán
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

    if (data && data.paymentUrl) {
      console.log('URL thanh toán:', data.paymentUrl); // Log URL thanh toán
      return data.paymentUrl;
    } else if (typeof data === 'string' && data.startsWith('http')) {
      console.log('URL thanh toán:', data); // Log URL thanh toán nếu trả về là string
      return data;
    } else {
      console.log('Lỗi', 'Không có URL thanh toán');
      return null;
    }
  } catch (error) {
    console.log('Lỗi khi tạo link thanh toán:', error);
    return null;
  }
};


  // kiểm tra user đã tham gia khóa học chưa 
  const onJoinCoursePress = async () => {
    try {
      const checkEnrollmentResponse = await fetch(
        `${BASE_URL}/enrollCourse/check-enrollment/${userID}/${courseId}`
      );
  
      if (!checkEnrollmentResponse.ok) {
        throw new Error('Lỗi khi kiểm tra tham gia khóa học');
      }
  
      const enrollmentData = await checkEnrollmentResponse.json();
  
      if (enrollmentData.enrolled) {
        // Hiển thị toast trước
        showToast('Bạn đã tham gia khóa học này rồi!');
        // Delay modal xuất hiện sau khi toast
        setTimeout(() => {
          setModalMessage('Bạn đã tham gia khóa học này rồi!');
          setModalVisible(true); // Show modal
        }, 1000); // Delay 1s (1000ms)
        return;
      }
  
      if (courseData.price > 0) {
        const paymentUrl = await createPaymentUrl();
        if (paymentUrl) {
          navigation.navigate('CoursePayment', {
            paymentUrl,
            courseId,
            userID
          });
        }
      } else {
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
        // Hiển thị toast trước
        showToast(`Chúc mừng bạn đã tham gia khóa học ${courseData.name} thành công!`);
        // Delay modal xuất hiện sau khi toast
        setTimeout(() => {
          setModalMessage('Bạn đã tham gia khóa học thành công!');
          setModalVisible(true); // Show modal
        }, 1000); // Delay 1s (1000ms)
  
        setCourseData((prevData) => ({
          ...prevData,
          isJoinedCourse: true,
        }));
      }
    } catch (error) {
      // Hiển thị toast trước khi hiển thị modal lỗi
      showToast('Có lỗi xảy ra khi tham gia khóa học');
      // Delay modal xuất hiện sau khi toast
      setTimeout(() => {
        setModalMessage('Có lỗi xảy ra khi tham gia khóa học');
        setModalVisible(true); // Show modal
      }, 1000); // Delay 1s (1000ms)
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

      {/* body */}
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
      {/* Buttom */}
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
      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Thông báo</Text>
            <Text style={styles.modalMessage}>{modalMessage}</Text>
            <View style={styles.btn_containerModel}>

              <TouchableOpacity
                style={[styles.modalButton, styles.rightButton]}
                onPress={() => navigation.navigate('Tabs', { screen: 'Khóa học', params: { userID } })}
              >
                <Text style={styles.modalButtonText}>Đến khóa học</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.leftButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Đóng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DetailScreen;
