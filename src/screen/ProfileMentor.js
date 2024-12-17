import {
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Button
} from 'react-native';
import Modal from 'react-native-modal';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/native';
import BASE_URL from '../component/apiConfig';
import styles from '../styles/ProfileMentorStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BodyProfileMentor from '../component/BodyProfileMentor';
const ProfileMentor = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { _id, userID } = route.params;
  // console.log('Teacher id :', _id , userID );
  const [mentor, setMentor] = useState(null);
  const [followerCount, setFollowerCount] = useState(null);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [isCourses, setIsCourses] = useState(true);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [courseCount, setCourseCount] = useState(0);
  const [noCoursesMessage, setNoCoursesMessage] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);
  // Khai báo state cho modalVisible
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // Tải trạng thái theo dõi từ AsyncStorage khi tải màn hình
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
    if (isFollowing) return;

    try {
      const response = await axios.post(`${BASE_URL}/followTeacher/follow/${userID}`, {
        teacherID: _id,
      });
      if (response.data.message === "Theo dõi thành công") {
        setFollowerCount(prevCount => prevCount + 1);
        setIsFollowing(true);
        await AsyncStorage.setItem(`followStatus_${_id}`, JSON.stringify(true));
      }
    } catch (error) {
      console.error('Error following mentor:', error);
    }
  };

  const handleUnfollow = async () => {
    if (!isFollowing) return;

    try {
      const response = await axios.post(`${BASE_URL}/followTeacher/unfollow/${userID}`, {
        teacherID: _id,
      });
      if (response.data.message === "Xóa theo dõi thành công") {
        setFollowerCount(prevCount => prevCount - 1);
        setIsFollowing(false);
        await AsyncStorage.setItem(`followStatus_${_id}`, JSON.stringify(false));
      }
    } catch (error) {
      console.error('Error unfollowing mentor:', error);
    }
  };




  const handleBack = () => {
    navigation.goBack();
  };


  // ddi sang màn đánh giá
  const handleAddReview = async () => {
    // Kiểm tra đã theo dõi giảng viên chưa
    if (!isFollowing) {
      // Mở modal khi người dùng chưa theo dõi giảng viên
      setModalVisible(true);
      return;
    }

    const teacherID = _id;
    navigation.navigate('ReviewScreen', { teacherID, userID });
    // console.log('đi :', teacherID, userID); 
  };

  // Hàm để đóng modal
  const closeModal = () => {
    setModalVisible(false);
  };



  const handleButtonPress = isCoursesButton => {
    setIsCourses(isCoursesButton);
  };

  //  đến màn nhắn tin 
  const handleBoxMess = (userID, teacherID, mentor) => {
    // Kiểm tra đã theo dõi giảng viên chưa
    if (!isFollowing) {
      // Mở modal khi người dùng chưa theo dõi giảng viên
      setModalVisible(true);
      return;
    }
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

  // fetch dữ liệu khóa học và đánh giá
  useEffect(() => {

    const fetchCourses = async () => {
      const response = await axios.get(`${BASE_URL}/course/getCourseByTeacherID/${_id}`);
      //map lại để định dạng lại dữ liệu hoặc trả về mảng rỗng
      const courseData = response.data.length
        ? response.data.map(course => ({
          id: course._id,
          image: { uri: course.img },
          nameCourse: course.name,
          nameLesson: course.describe,
          quiz: `${new Intl.NumberFormat('vi-VN').format(course.price)} VNĐ`,
          createdAt: course.createdAt,
        }))
        : [];

      // Sắp xếp 
      courseData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setData(courseData); // Cập nhật dữ liệu  vào state
      // Nếu không có khóa học
      if (!courseData.length) setNoCoursesMessage("Chưa có khóa học nào");
    };

    const fetchFeedback = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/feedbackTeacher/getFeedbackByTeacherID/${_id}`);
    
        const feedbackData = response.data.length
          ? await Promise.all(
              response.data.map(async feedback => {
                let userAvatar = feedback.userID?.avatar;
    
                // Nếu không có avatar, lấy avatar từ API get userByID
                if (!userAvatar && feedback.userID?._id) {
                  try {
                    const userResponse = await axios.get(`${BASE_URL}/user/getUserByID/${feedback.userID._id}`);
                    userAvatar = userResponse.data?.avatar;
                  } catch (userError) {
                    // Xử lý lỗi nếu cần
                  }
                }
    
                // Nếu không có avatar, dùng ảnh mặc định
                const avatarImage = userAvatar ? { uri: userAvatar } : require('../design/image/noprofile.png');
    
                // Định dạng lại ngày tạo theo DD/MM/YYYY
                const formattedDate = feedback.feedbackDetail
                  ? new Date(feedback.feedbackDetail.createdAt).toLocaleDateString('en-GB')
                  : 'Ngày không xác định'; // 'en-GB' sẽ sử dụng định dạng DD/MM/YYYY
    
                return {
                  id: feedback._id,
                  name: feedback.userID?.name || "Ẩn danh",
                  img: avatarImage,
                  rating: feedback.feedbackDetail?.rating || 0,
                  comment: feedback.feedbackDetail?.content || "Không có nhận xét",
                  love: '0',
                  createdAt: formattedDate,
                };
              })
            )
          : [];
    
        // Sắp xếp đánh giá theo ngày tạo (mới nhất ở trên cùng)
        feedbackData.sort((a, b) => {
          const dateA = new Date(a.createdAt.split('/').reverse().join('-')); 
          const dateB = new Date(b.createdAt.split('/').reverse().join('-'));
          return dateB - dateA; // Sắp xếp từ mới đến cũ
        });
    
        setData(feedbackData);
        setFeedbackCount(feedbackData.length);
    
        if (!feedbackData.length) setNoCoursesMessage("Không có đánh giá nào");
      } catch (error) {

        setNoCoursesMessage("Có lỗi xảy ra khi lấy đánh giá.");
      }
    };
    

    // Hàm chung để gọi hàm lấy dữ liệu, có thể là khóa học hoặc đánh giá
    const fetchContent = async () => {
      setLoading(true);
      setNoCoursesMessage("");

      try {
        if (isCourses) {
          await fetchCourses();
        } else {
          await fetchFeedback();
        }
      } catch (error) {
        setData([]);
        setNoCoursesMessage("Không có đánh giá nào");
      } finally {
        setLoading(false);
      }
    };

    // Gọi hàm fetchContent để thực hiện tải dữ liệu
    fetchContent();
  }, [isCourses, _id]); // Hook phụ thuộc vào biến isCourses và _id

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
        <TouchableOpacity style={styles.btn_mess} onPress={() => handleBoxMess(userID, _id, mentor)}>
          <Text style={styles.txt_mess}>Nhắn tin</Text>
        </TouchableOpacity>

      </View>
      <BodyProfileMentor
        isCourses={isCourses}
        data={data}
        noCoursesMessage={noCoursesMessage}
        handleButtonPress={handleButtonPress}
      />
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
      {/* Modal thông báo lỗi */}
      <Modal
        isVisible={modalVisible} // Kiểm tra trạng thái của modal
        onBackdropPress={closeModal} // Đóng modal khi nhấn ra ngoài
        backdropColor="rgba(0, 0, 0, 0.5)" // Màu nền của backdrop
        backdropOpacity={0.5} // Độ mờ của nền
      >
        <View style={styles.modalContainer}>

          <Image
            source={require('../design/image/fl.png')}
            style={styles.image}
          />
          <Text style={styles.modalTitle}>
            Để nhắn tin hoặc đánh giá giảng viên này, bạn cần theo dõi họ trước.
          </Text>
          <Button title="Đóng" onPress={closeModal} color="#0961F5" />
        </View>
      </Modal>
    </View>

  );
};

export default ProfileMentor;