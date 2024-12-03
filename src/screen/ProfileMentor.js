import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/native';
import BASE_URL from '../component/apiConfig';
import styles from '../styles/ProfileMentorStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ProfileMentor = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { _id, userID } = route.params;
  
  const [mentor, setMentor] = useState(null);
  const [followerCount, setFollowerCount] = useState(null);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [isCourses, setIsCourses] = useState(true);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [courseCount, setCourseCount] = useState(0);
  const [noCoursesMessage, setNoCoursesMessage] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);
 console.log("dữ liệu nhận : ",  _id, userID )
  useEffect(() => {
    // Load follow status from AsyncStorage when screen loads
    const loadFollowStatus = async () => {
      try {
        const followStatus = await AsyncStorage.getItem(`followStatus_${_id}`);
        if (followStatus !== null) {
          setIsFollowing(JSON.parse(followStatus));
        }
      } catch (error) {
        console.error('Error loading follow status:', error);
      }
    };
    loadFollowStatus();
  }, [_id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mentorResponse, followerResponse, courseCountResponse] = await Promise.all([
          axios.get(`${BASE_URL}/teacher/getTeacherByID/${_id}`),
          axios.get(`${BASE_URL}/followTeacher/getFollowerCount/${_id}`),
          axios.get(`${BASE_URL}/course/countByTeacherID/${_id}`)
        ]);

        console.log('Mentor Response:', mentorResponse.data);
        console.log('Follower Response:', followerResponse.data);
        console.log('Course Count Response:', courseCountResponse.data); // Log cái này

        setMentor(mentorResponse.data);
        setFollowerCount(followerResponse.data.followerCount);
        setCourseCount(courseCountResponse.data.count.courseCount);


        // Update follow status from AsyncStorage if needed
        const followStatus = await AsyncStorage.getItem(`followStatus_${_id}`);
        if (followStatus !== null) {
          setIsFollowing(JSON.parse(followStatus));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [_id, userID]);

  const handleFollow = async () => {
    if (isFollowing) {
      Alert.alert("Thông báo", "Bạn đã theo dõi giảng viên này rồi!");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/followTeacher/follow/${userID}`, {
        teacherID: _id,
      });
      if (response.data.message === "Theo dõi thành công") {

        setFollowerCount(prevCount => prevCount + 1);
        setIsFollowing(true);

        // Save follow status to AsyncStorage
        await AsyncStorage.setItem(`followStatus_${_id}`, JSON.stringify(true));
      }
    } catch (error) {
      console.error('Error following mentor:', error);
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi theo dõi.");
    }
  };

  const handleUnfollow = async () => {
    if (!isFollowing) {
      Alert.alert("Thông báo", "Bạn chưa theo dõi giảng viên này!");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/followTeacher/unfollow/${userID}`, {
        teacherID: _id,
      });
      if (response.data.message === "Xóa theo dõi thành công") {

        setFollowerCount(prevCount => prevCount - 1);
        setIsFollowing(false);

        // Remove follow status from AsyncStorage
        await AsyncStorage.setItem(`followStatus_${_id}`, JSON.stringify(false));
      }
    } catch (error) {
      console.error('Error unfollowing mentor:', error);
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi hủy theo dõi.");
    }
  };


  // xem khóa học hoặc xem thông tin người dùng đánh giá
  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      setNoCoursesMessage("");

      try {
        const response = isCourses
          ? await axios.get(`${BASE_URL}/course/getCourseByTeacherID/${_id}`)
          : await axios.get(`${BASE_URL}/feedbackCourse/getAll`);

        if (isCourses) {
          // Xử lý dữ liệu khóa học
          const courseData = response.data.length
            ? response.data.map(course => ({
              id: course._id,
              image: { uri: course.img },
              nameCourse: course.name,
              nameLesson: course.describe,
              quiz: `${new Intl.NumberFormat('vi-VN').format(course.price)} VNĐ`, // Định dạng tiền VNĐ
              rate: '0 đánh giá',
              student: '0 học viên',
            }))
            : [];

          setData(courseData);
          if (!courseData.length) {
            setNoCoursesMessage("Chưa có khóa học nào");
          }
        } else {
          // Xử lý dữ liệu phản hồi
          const feedbackData = await Promise.all(
            response.data.flatMap(course =>
              course.feedbacks.map(async feedback => {
                const user = feedback.userID || { _id: 'no user', name: 'No user' }; // Dữ liệu mặc định nếu không có userID
                let userAvatar = null;

                if (user._id !== 'no user') {
                  try {
                    const userResponse = await axios.get(`${BASE_URL}/user/getUserByID/${user._id}`);
                    userAvatar = userResponse.data?.avatar || null; // Lấy avatar từ API
                  } catch (userError) {
                    console.warn('Lỗi khi lấy thông tin user:', userError);
                  }
                }

                return {
                  id: feedback._id,
                  name: user.name, // Hiển thị tên từ userID
                  img: userAvatar ? { uri: userAvatar } : null, // Avatar hoặc null nếu không có
                  rating: feedback.feedbackDetail?.rating || 0,
                  comment: feedback.feedbackDetail?.content || 'No comment',
                  love: '0',
                  createdAt: feedback.feedbackDetail
                    ? new Date(feedback.feedbackDetail.createdAt).toLocaleDateString()
                    : 'Unknown date',
                };
              })
            )
          );

          setData(feedbackData);
          setFeedbackCount(feedbackData.length);
        }
      } catch (error) {
        console.error('Lỗi khi lấy nội dung:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [isCourses, _id]);



  const handleBack = () => {
    navigation.goBack();
  };

  const handleAddReview = () => {
    navigation.navigate('ReviewScreen');
  };

  const handleButtonPress = isCoursesButton => {
    setIsCourses(isCoursesButton);
  };

  //  đến màn nhắn tin 
  const handleBoxMess = (userID, teacherID, mentor) => {
    const receiverId = teacherID; // Gán _id của teacher làm receiverId
    const senderName = mentor.name; // Lấy name của giáo viên
    const timestamp = new Date().toISOString(); // Lấy thời gian hiện tại
  
    console.log('Data:', { receiverId, userID, senderName, timestamp });
  
    // Điều hướng đến màn hình BoxMess với các tham số
    navigation.navigate('BoxChat', {
      receiverId,
      userID,
      senderName,
      timestamp,
    });
  };
  

  const renderItem = ({ item }) => (
    <View style={styles.detailItem}>
      {isCourses ? (
        <>
          <Image source={item.image || require('../design/image/noprofile.png')} style={styles.detailImage} />
          <View style={styles.detailContent}>
            <Text style={styles.detailNameCourse}>{item.nameCourse}</Text>
            <Text style={styles.detailNameLesson} numberOfLines={1} ellipsizeMode="tail">
              {item.nameLesson}
            </Text>
            <Text style={styles.detailQuiz}>{item.quiz}</Text>
            <View style={styles.rate_container}>
              <Text style={styles.detailRate}>{item.rate}</Text>
              <Text style={styles.detailRate}>|</Text>
              <Text style={styles.detailStudent}>{item.student}</Text>
            </View>
          </View>
        </>
      ) : (
        <>
          <Image
            source={item.img ? item.img : require('../design/image/noprofile.png')}
            style={styles.avatarUser}
          />
          <View style={styles.voteContent}>
            <View style={styles.user}>
              <Text
                style={styles.nameUser}
                numberOfLines={1}
                ellipsizeMode="tail">
                {item.name}
              </Text>
              <View style={styles.viewrate}>
                <Text style={styles.voteRate}>⭐</Text>
                <Text style={styles.voteRate}>{item.rating}</Text>
              </View>
            </View>
            <Text style={styles.voteComment}>{item.comment}</Text>
            <View style={styles.voteInfo}>
              <Text style={styles.voteLove}>❤️ {item.love}</Text>
              <Text style={styles.voteDay}>{item.createdAt}</Text>
            </View>
          </View>
        </>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!mentor) {
    return (
      <View style={styles.container}>
        <Text>Không tìm thấy thông tin giảng viên.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.btnBack}>
        <TouchableOpacity onPress={handleBack}>
          <Image
            source={require('../design/image/ic_back.png')}
            style={styles.imgBack}
          />
        </TouchableOpacity>
        <Text style={styles.txtHeader}>Hồ Sơ Giảng Viên</Text>
      </View>
      <View style={styles.header}>
        <View style={styles.avatarWrapper}>
          <Image source={{ uri: mentor.avatar }} style={styles.avatarMentor} />
        </View>
      </View>
      <View style={styles.name_container}>
        <Text style={styles.txtName}>{mentor.name}</Text>
        <Text style={styles.txtCourse}>{mentor.major}</Text>
      </View>
      <View style={styles.follow_container}>
        <View style={styles.column_item}>
          <Text style={styles.item_numberCourse}>{courseCount}</Text>
          <Text style={styles.item_title}>Khóa học</Text>
        </View>
        <View style={styles.column_item}>
          <Text style={styles.item_numberFL}>
            {followerCount !== null ? followerCount : 'Đang tải...'}
          </Text>

          <Text style={styles.txt_follow}>Theo dõi</Text>

        </View>
        <View style={styles.column_item}>
          <Text style={styles.item_numberFeedback}>{feedbackCount}</Text>
          <Text style={styles.item_title}>Đánh giá</Text>
        </View>
      </View>
      <View style={styles.bio}>
        <Text style={styles.txtbio}>{mentor.slogan}</Text>
      </View>
      <View style={styles.btnFollow_container}>
        {/* nút theo dõi  */}
        <TouchableOpacity style={styles.btn_follow} onPress={isFollowing ? handleUnfollow : handleFollow}>
          <Text style={styles.txt_follow}>{isFollowing ? "Hủy theo dõi" : "Theo dõi"}</Text>
        </TouchableOpacity>

        {/* nút nhắn tin  */}
        <TouchableOpacity style={styles.btn_mess} onPress={() => handleBoxMess(userID, _id,mentor)}>
          <Text style={styles.txt_mess}>Nhắn tin</Text>
        </TouchableOpacity>

      </View>
      <View style={styles.body}>
        <View style={styles.btnrate_container}>
          <TouchableOpacity
            onPress={() => handleButtonPress(true)}
            style={[styles.btn, isCourses && styles.btnActive]}>
            <Text style={[styles.txtActive, !isCourses && styles.txtInactive]}>
              Khóa học
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleButtonPress(false)}
            style={[styles.btn, !isCourses && styles.btnActive]}>
            <Text style={[styles.txtActive, isCourses && styles.txtInactive]}>
              Đánh giá
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.flatList}
          style={{ width: '99%', margin: 10 }}
          ListEmptyComponent={<Text style={styles.emptyMessage}>{noCoursesMessage}</Text>}
        />
      </View>
      {/* Floating Button */}
      {!isCourses && (
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={handleAddReview}>
          <Image
            source={require('../design/image/ic_add.png')}
            style={styles.floatingIcon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ProfileMentor;