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
  // Edit review modal state
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [editSelectedStars, setEditSelectedStars] = useState(0);
  const [editComment, setEditComment] = useState('');
  const [editingReviewId, setEditingReviewId] = useState(null);

  useEffect(() => {
    fetchFeedbacks();
    checkEnrollment();  // Kiểm tra nếu người dùng đã tham gia khóa học khi component được render
  }, []);
  // Xử lý chọn sao
  const handleStarPress = (index) => {
    setSelectedStars(index + 1);
  };
  // Lấy feedback của khóa học
  const fetchFeedbacks = async () => {
    try {
      const response = await fetch(`${BASE_URL}/feedbackCourse/getFeedbackByCourseID/${courseId}`);
      const feedbackData = await response.json();

      if (!Array.isArray(feedbackData)) {
        console.log('Feedback data is not an array, setting reviews to empty.');
        setReviews([]);
        return;
      }

      // Sort reviews by 'updatedAt' in descending order
      const sortedReviews = feedbackData.sort((a, b) => new Date(b.feedbackDetail.updatedAt) - new Date(a.feedbackDetail.updatedAt));

      setReviews(sortedReviews);
    } catch (error) {
      console.error('Error fetching feedback:', error);
      setReviews([]);
    }
  };

  // Định dạng ngày tháng
  const formatDate = (dateString) => {
    const timestamp = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - timestamp) / 1000);

    if (seconds < 60) return `${seconds} giây trước`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} phút trước`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} giờ trước`;
    const days = Math.floor(hours / 24);
    return `${days} ngày trước`;
  };

  // Delete review
  const handleDeleteReview = async (feedbackId) => {
    const url = `${BASE_URL}/feedbackCourse/delete/${userID}/${courseId}`;
    try {
      const response = await fetch(url, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedReviews = reviews.filter((item) => item._id !== feedbackId);
        setReviews(updatedReviews);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Không thể xóa đánh giá.');
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      setErrorMessage('Lỗi khi xóa đánh giá.');
    }
  };

  // Edit review
  const handleEditReview = (item) => {
    setEditingReviewId(item._id);
    setEditSelectedStars(item.feedbackDetail.rating);
    setEditComment(item.feedbackDetail.content);
    setEditModalVisible(true);
  };

  // Submit edited review
  const handleSubmitEditReview = async () => {
    if (!editingReviewId) return;

    const url = `${BASE_URL}/feedbackCourse/update/${userID}/${courseId}`;
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rating: editSelectedStars,
          content: editComment,
        }),
      });

      if (response.ok) {
        setEditModalVisible(false);
        setEditComment('');
        setEditSelectedStars(0);
        fetchFeedbacks();
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Đã xảy ra lỗi khi sửa đánh giá.');
      }
    } catch (error) {
      setErrorMessage('Không thể kết nối đến máy chủ.');
    }
  };

  // Handle star selection for editing
  const handleEditStarPress = (index) => {
    setEditSelectedStars(index + 1);
  };

  // Check enrollment status
  const checkEnrollment = async () => {
    if (!userID || !courseId) return;

    const enrollmentUrl = `${BASE_URL}/enrollCourse/check-enrollment/${userID}/${courseId}`;
    try {
      const response = await fetch(enrollmentUrl);
      const data = await response.json();
      setIsEnrolled(data.enrolled);
    } catch (error) {
      setErrorMessage('Không thể kiểm tra thông tin tham gia khóa học.');
    }
  };

  // Submit new review
  const handleSubmitReview = async () => {
    if (!userID || !courseId) return;

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

  // Handle writing review
  const handleWriteReviewPress = () => {
    if (!isEnrolled) {
      setErrorMessage('Bạn chưa tham gia khóa học nên không thể đánh giá cho khóa học này được!');
    } else {
      setModalVisible(true);
    }
  };

  // Go back
  const handleGoBack = () => {
    navigation.goBack();
  };

  const renderItem = ({ item }) => {
    const stars = '⭐'.repeat(item.feedbackDetail.rating);
    const userName = item.userID && item.userID.name ? item.userID.name : 'Ẩn danh';

    return (
      <View style={styles.itemReview}>
        <View style={styles.row}>
          <Text style={styles.txtUser}>{userName}</Text>
          <Text style={styles.txtRate}>{stars}</Text>
        </View>
        <Text style={styles.txtContent}>{item.feedbackDetail.content}</Text>
        <View style={styles.action}>
          <Text style={styles.txtTime}>
            {formatDate(item.feedbackDetail.updatedAt)}
          </Text>
          {item.userID && item.userID._id === userID && (
            <>
              <TouchableOpacity onPress={() => handleEditReview(item)}>
                <Text style={{ color: 'blue', marginLeft: 120, fontFamily: 'Mulish-Bold' }}>Chỉnh Sửa</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteReview(item._id)}>
                <Text style={{ color: 'red', fontFamily: 'Mulish-Bold' }}>Xóa</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    );
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

      {/* Modal for adding review */}
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

      {/* Modal for editing review */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={isEditModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.formReview}>
            <Text style={styles.txt_titleReview}>Chỉnh sửa đánh giá của bạn!</Text>
            <View style={styles.rate_container}>
              {[...Array(5)].map((_, index) => (
                <TouchableOpacity key={index} onPress={() => handleEditStarPress(index)}>
                  <Image
                    source={
                      editSelectedStars > index
                        ? require('../design/image/ic_star_filled.png')
                        : require('../design/image/ic_star_outline.png')
                    }
                    style={[styles.star, { tintColor: editSelectedStars > index ? '#F2CA3D' : '#474953' }]}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <TextInput
              placeholder="Chỉnh sửa đánh giá của bạn"
              style={styles.input}
              multiline={true}
              value={editComment}
              onChangeText={setEditComment}
            />
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmitEditReview}>
              <Text style={styles.submitText}>Cập nhật đánh giá</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setEditModalVisible(false)}>
              <Text style={styles.closeButton}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ReviewCourseScreen;
