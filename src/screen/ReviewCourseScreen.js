import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import BASE_URL from '../component/apiConfig';
import styles from '../styles/ReviewCourseScreenStyles';

const ReviewCourseScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { courseId, userID } = route.params;

  const [reviews, setReviews] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedStars, setSelectedStars] = useState(0);
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isEnrolled, setIsEnrolled] = useState(null);  // Kiểm tra trạng thái tham gia khóa học

  useEffect(() => {
    fetchFeedbacks();
    checkEnrollment();  // Kiểm tra nếu người dùng đã tham gia khóa học khi component được render
  }, []);

  // Lấy feedback của khóa học
  const fetchFeedbacks = async () => {
    try {
      const response = await fetch(`${BASE_URL}/feedbackCourse/getFeedbackByCourseID/${courseId}`);
      const feedbackData = await response.json();

      if (!Array.isArray(feedbackData)) {
        setReviews([]);
        return;
      }

      setReviews(feedbackData);
    } catch (error) {
      setReviews([]);
    }
  };

  // Định dạng ngày tháng
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  // Render review item
  const renderItem = ({ item }) => {
    const stars = '⭐'.repeat(item.feedbackDetail.rating);

    return (
      <View style={styles.itemReview}>
        <View style={styles.row}>
          {/* Dùng trực tiếp userName từ feedback item */}
          <Text style={styles.txtUser}>{item.userID.name}</Text>
          <Text style={styles.txtRate}>{stars}</Text>
        </View>
        <Text style={styles.txtContent}>{item.feedbackDetail.content}</Text>
        <Text style={styles.txtTime}>
          {formatDate(item.feedbackDetail.updatedAt)}
        </Text>
      </View>
    );
  };

  // Kiểm tra nếu người dùng đã tham gia khóa học
  const checkEnrollment = async () => {
    if (!userID || !courseId) return;

    const enrollmentUrl = `${BASE_URL}/enrollCourse/check-enrollment/${userID}/${courseId}`;
    try {
      const response = await fetch(enrollmentUrl);
      const data = await response.json();
      setIsEnrolled(data.enrolled);  // Cập nhật trạng thái tham gia
    } catch (error) {
      setErrorMessage('Không thể kiểm tra thông tin tham gia khóa học.');
    }
  };

  // Xử lý chọn sao
  const handleStarPress = (index) => {
    setSelectedStars(index + 1);
  };

  // Gửi đánh giá
  const handleSubmitReview = async () => {
    if (!userID || !courseId) {
      return;
    }

    const feedbackUrl = `${BASE_URL}/feedbackCourse/feedback/${userID}/${courseId}`;
    try {
      const response = await fetch(feedbackUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rating: selectedStars,
          content: comment,
        }),
      });

      if (response.ok) {
        setModalVisible(false);
        setComment('');
        setSelectedStars(0);
        setErrorMessage('');
        fetchFeedbacks();
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Đã xảy ra lỗi khi gửi đánh giá.');
      }
    } catch (error) {
      setErrorMessage('Không thể kết nối đến máy chủ.');
    }
  };

  // Xử lý khi người dùng bấm "Viết đánh giá"
  const handleWriteReviewPress = () => {
    if (!isEnrolled) {
      setErrorMessage('Bạn chưa tham gia khóa học nên không thể đánh giá cho khóa học này được!');
    } else {
      setModalVisible(true);
    }
  };

  // Quay lại màn hình trước
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <Image source={require('../design/image/ic_back.png')} />
        </TouchableOpacity>
        <Text style={styles.txtHeader}>Đánh giá</Text>
      </View>

      <View style={styles.countReview}>
        <Text style={styles.count_txt}>Tổng đánh giá</Text>
        <View style={styles.count_number}>
          <Text style={styles.count_numberText}>{reviews.length}</Text>
        </View>
      </View>

      <FlatList
        data={reviews}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />

      <Text style={styles.errorTxt}>{errorMessage}</Text>

      <View style={styles.ViewAll}>
        <TouchableOpacity
          style={styles.btnViewAllReview}
          onPress={handleWriteReviewPress}
        >
          <Text style={styles.txtViewAllReview}>Viết đánh giá</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.formReview}>
            <Text style={styles.txt_titleReview}>Thêm đánh giá của bạn!</Text>
            <View style={styles.rate_container}>
              {[...Array(5)].map((_, index) => (
                <TouchableOpacity key={index} onPress={() => handleStarPress(index)}>
                  <Image
                    source={
                      selectedStars > index
                        ? require('../design/image/ic_star_filled.png')
                        : require('../design/image/ic_star_outline.png')
                    }
                    style={[styles.star, { tintColor: selectedStars > index ? '#F2CA3D' : '#474953' }]}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <TextInput
              placeholder="Viết đánh giá của bạn"
              style={styles.input}
              multiline={true}
              value={comment}
              onChangeText={setComment}
            />
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmitReview}>
              <Text style={styles.submitText}>Gửi đánh giá</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButton}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ReviewCourseScreen;
