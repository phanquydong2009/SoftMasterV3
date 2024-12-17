import { Text, View, Image, TouchableOpacity, TextInput, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Modal from 'react-native-modal';
import styles from '../styles/ReviewScreenStyles';
import BASE_URL from '../component/apiConfig';
import axios from 'axios';

const ReviewScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { teacherID, userID } = route.params;

  const [selectedStars, setSelectedStars] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isErrorModalVisible, setErrorModalVisible] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [editReviewID, setEditReviewID] = useState(null);
  const [editSelectedStars, setEditSelectedStars] = useState(0);
  const [editComment, setEditComment] = useState('');

  const [isEditModalVisible, setEditModalVisible] = useState(false);

  useEffect(() => {
    fetch(`${BASE_URL}/feedbackTeacher/getFeedbackByTeacherID/${teacherID}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const sortedReviews = data.map((item) => ({
            stars: item.feedbackDetail.rating,
            comment: item.feedbackDetail.content,
            timestamp: new Date(item.feedbackDetail.createdAt),
            username: item.userID?.name || 'Ẩn danh',
            userID: item.userID?._id,
          })).sort((a, b) => b.timestamp - a.timestamp);
          setReviews(sortedReviews);
        } else {
          setReviews([]);
        }
      })
      .catch((error) => {
        setReviews([]);
      });
  }, [teacherID]);

  const handleShowAllReviews = () => {
    setShowAllReviews(!showAllReviews); // Toggle the showAllReviews state
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleStarPress = (index) => {
    setSelectedStars(index + 1);
  };

  const handleSubmitReview = () => {
    if (selectedStars === 0 || comment.trim() === '') {
      setErrorMessage('Vui lòng chọn sao và nhập đánh giá của bạn!');
      setErrorModalVisible(true);
      return;
    }

    const isAlreadyReviewed = reviews.some(review => review.username === 'Người dùng ' && review.teacherID === teacherID);

    if (isAlreadyReviewed) {
      setErrorMessage('Bạn đã đánh giá giảng viên này rồi!');
      setErrorModalVisible(true);
      return;
    }

    fetch(`${BASE_URL}/feedbackTeacher/feedback/${userID}/${teacherID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        rating: selectedStars,
        content: comment,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('ErrorSendingReview');
        }
        return response.json();
      })
      .then((data) => {
        setErrorModalVisible(false);  // Đóng modal lỗi nếu có
        setModalVisible(true);  // Hiển thị modal thành công
        const newReview = {
          stars: selectedStars,
          comment: comment,
          timestamp: new Date(),
          username: 'Bạn vừa đánh giá',
          teacherID: teacherID,
        };
        setReviews([newReview, ...reviews]);
        setSelectedStars(0);
        setComment('');
        setEditReviewID(null);
        setEditSelectedStars(0);
        setEditComment('');
      })
      .catch((error) => {
        setErrorMessage('Bạn đã đánh giá giảng viên này trước đó !');
        setErrorModalVisible(true);
      });
  };


  const handleEditReview = (item) => {
    setEditReviewID(item.userID);
    setEditSelectedStars(item.stars);
    setEditComment(item.comment);
    setEditModalVisible(true);
  };

  const handleUpdateReview = async () => {
    if (editSelectedStars === 0 || editComment.trim() === '') {
      setErrorMessage('Vui lòng chọn sao và nhập đánh giá của bạn!');
      setErrorModalVisible(true);
      return;
    }

    try {
      const response = await axios.put(`${BASE_URL}/feedbackTeacher/update/${userID}/${teacherID}`, {
        rating: editSelectedStars,
        content: editComment,
      });

      if (response.status === 200) {
        const updatedReviews = reviews.map((review) =>
          review.userID === editReviewID
            ? { ...review, stars: editSelectedStars, comment: editComment }
            : review
        );
        setReviews(updatedReviews);
        setEditModalVisible(false); // Đóng modal chỉnh sửa
        setErrorModalVisible(false); // Đảm bảo modal lỗi đóng khi thành công
      } else {
        setErrorMessage('Cập nhật thất bại. Vui lòng thử lại!');
        setErrorModalVisible(true);
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật đánh giá:', error);
      setErrorMessage('Có lỗi xảy ra khi cập nhật đánh giá!');
      setErrorModalVisible(true);
    }
  };

  //xóa dánh giá 
  const handleDeleteReview = async (reviewID) => {
    try {
      const { teacherID, userID } = route.params;

      // Gọi API DELETE
      const response = await axios.delete(`${BASE_URL}/feedbackTeacher/delete/${userID}/${teacherID}`);

      // Kiểm tra phản hồi từ API
      if (response.status === 200) {
        console.log("Đánh giá đã được xóa thành công.");

        // Cập nhật lại danh sách đánh giá sau khi xóa
        setReviews((prevReviews) => prevReviews.filter(review => review.userID !== reviewID));
      } else {
        // Xử lý lỗi nếu cần thiết
        console.log("Có lỗi xảy ra khi xóa đánh giá.");
      }
    } catch (error) {
      // Xử lý lỗi khi gọi API
      console.error("Lỗi khi xóa đánh giá: ", error.message);
    }
  };

  const getElapsedTime = (timestamp) => {
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

  const reviewsToShow = showAllReviews ? reviews : reviews.slice(0, 3);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Image source={require('../design/image/ic_back.png')} />
        </TouchableOpacity>
        <Text style={styles.txtHeader}>Đánh giá</Text>
      </View>

      {!showAllReviews && (
        <View style={styles.formReview}>
          <Text style={styles.txt_titleReview}>Thêm đánh giá của bạn !</Text>
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
        </View>
      )}

      <View style={styles.countReview}>
        <Text style={styles.count_txt}>Đánh giá</Text>
        <View style={styles.count_number}>
          <Text style={styles.count_numberText}>{reviews.length}</Text>
        </View>
        <TouchableOpacity onPress={handleShowAllReviews}>
          <Text style={styles.txtViewAll}>{showAllReviews ? 'Ẩn bớt' : 'Xem tất cả'}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={reviewsToShow}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.reviewItem}>
            <Text style={styles.reviewText}>
              {item.username} {'⭐'.repeat(item.stars)}
            </Text>
            <Text style={styles.reviewComment}>{item.comment}</Text>
            <View style={styles.rowAction}>
              <Text style={styles.reviewTime}>{getElapsedTime(item.timestamp)}</Text>
              {item.userID === userID && (
                <TouchableOpacity onPress={() => handleEditReview(item)}>
                  <Text style={{ color: '#0961F5', marginLeft: 120, fontFamily: 'Mulish-Bold' }}>Chỉnh Sửa</Text>
                </TouchableOpacity>
              )}
              {item.userID === userID && (
                <TouchableOpacity onPress={() => handleDeleteReview(item.userID)}>
                  <Text style={{ color: 'red', fontFamily: 'Mulish-Bold' }}>Xóa</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyReviewText}>Chưa có đánh giá nào</Text>}
      />



      {/* Done Modal */}
      {isModalVisible && (
        <Text style={styles.successText}>Bạn đã gửi đánh giá thành công!</Text>
      )}


      {/* Error Modal */}
      {isErrorModalVisible && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      )}


      {/* Modal for Editing Review */}
      <Modal isVisible={isEditModalVisible} onBackdropPress={() => setEditModalVisible(false)}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Chỉnh sửa đánh giá</Text>

          <View style={styles.rate_container}>
            {[...Array(5)].map((_, index) => (
              <TouchableOpacity key={index} onPress={() => setEditSelectedStars(index + 1)}>
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

          <TouchableOpacity style={styles.submitButton} onPress={handleUpdateReview}>
            <Text style={styles.submitText}>Cập nhật đánh giá</Text>
          </TouchableOpacity>
        </View>
      </Modal>


    </View>
  );
};

export default ReviewScreen;
