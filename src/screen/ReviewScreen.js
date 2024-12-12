import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Modal from 'react-native-modal';
import styles from '../styles/ReviewScreenStyles';
import BASE_URL from '../component/apiConfig';

const ReviewScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { teacherID, userID } = route.params;
  // console.log('nhận : ', teacherID, userID);

  const [selectedStars, setSelectedStars] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isErrorModalVisible, setErrorModalVisible] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Lấy dữ liệu phản hồi khi component được mount
    fetch(`${BASE_URL}/feedbackTeacher/getFeedbackByTeacherID/${teacherID}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // Sắp xếp các đánh giá theo thời gian, đánh giá mới nhất lên trên
          const sortedReviews = data.map((item) => ({
            stars: item.feedbackDetail.rating,
            comment: item.feedbackDetail.content,
            timestamp: new Date(item.feedbackDetail.createdAt),
            username: item.userID.name,
          })).sort((a, b) => b.timestamp - a.timestamp); // Sắp xếp các đánh giá
  
          setReviews(sortedReviews);
        } else {
          setReviews([]); // Ensure reviews is empty if the data isn't an array
        }
      })
      .catch((error) => {
        console.error('Lỗi khi lấy dữ liệu phản hồi:', error);
        setReviews([]); // Ensure reviews is empty if there's an error
      });
  }, [teacherID]);
  
  const handleBack = () => {
    navigation.goBack();
  };

  const handleStarPress = (index) => {
    setSelectedStars(index + 1);
  };

  const handleSubmitReview = () => {
    // Kiểm tra xem người dùng đã chọn sao và nhập bình luận chưa
    if (selectedStars === 0 || comment.trim() === '') {
      setErrorMessage('Vui lòng chọn sao và nhập đánh giá của bạn!');
      setErrorModalVisible(true);
      return; 
    }
  
    // Kiểm tra xem người dùng đã đánh giá giảng viên này chưa
    const isAlreadyReviewed = reviews.some(review => review.username === 'Người dùng ' && review.teacherID === teacherID);
    
    if (isAlreadyReviewed) {
      // Nếu đã đánh giá giảng viên này rồi, hiển thị thông báo lỗi và không tạo newReview
      setErrorMessage('Bạn đã đánh giá giảng viên này rồi!');
      setErrorModalVisible(true);
      return; // Dừng lại không gửi yêu cầu API và không tạo newReview
    }
  
    // Tạo dữ liệu đánh giá mới để thêm vào danh sách tạm thời
    const newReview = {
      stars: selectedStars, 
      comment: comment, 
      timestamp: new Date(), 
      username: 'Người dùng ', // Cập nhật với tên người dùng thật nếu có
      teacherID: teacherID, // Thêm ID giảng viên để xác định đánh giá của giảng viên này
    };
  
    // Thêm đánh giá mới vào đầu danh sách các đánh giá
    setReviews([newReview, ...reviews]);
  
    // Gửi yêu cầu POST lên API để lưu đánh giá
    fetch(`${BASE_URL}/feedbackTeacher/feedback/${userID}/${teacherID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rating: selectedStars, 
        content: comment, 
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('ErrorSendingReview'); // Nếu không gửi được, ném lỗi
        }
        return response.json();
      })
      .then((data) => {
        console.log('Đánh giá đã được gửi:', data);
        setModalVisible(true); // Hiển thị modal thành công
      })
      .catch((error) => {
        // Xử lý lỗi khi gửi đánh giá
        if (error.message === 'ErrorSendingReview') {
          setErrorMessage('Đã xảy ra lỗi khi gửi đánh giá. Vui lòng thử lại sau!');
        } else {
          setErrorMessage('Đã xảy ra lỗi không xác định!');
        }
        setErrorModalVisible(true); // Hiển thị modal lỗi
      });
  
    // Reset các trường nhập liệu sau khi gửi đánh giá
    setSelectedStars(0); // Đặt lại số sao đã chọn
    setComment(''); // Đặt lại nội dung bình luận
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

  const closeModal = () => {
    setModalVisible(false);
  };

  const closeErrorModal = () => {
    setErrorModalVisible(false);
  };

  const handleHome = () => {
    closeModal();
  };

  const handleViewAllReviews = () => {
    setShowAllReviews(true);
  };

  const reviewsToShow = showAllReviews ? reviews : reviews.slice(0, 2);

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
      </View>

      <FlatList
  data={reviewsToShow}
  keyExtractor={(item, index) => index.toString()}
  renderItem={({ item }) => (
    <View style={styles.reviewItem}>
      <Text style={styles.reviewText}>
        {item.username}   {'⭐'.repeat(item.stars)}
      </Text>
      <Text style={styles.reviewComment}>{item.comment}</Text>
      <Text style={styles.reviewTime}>{getElapsedTime(item.timestamp)}</Text>
    </View>
  )}
  ListEmptyComponent={
    <Text style={styles.emptyReviewText}>Chưa có đánh giá nào</Text> 
  }
  ListFooterComponent={
    !showAllReviews && reviews.length > 2 ? (
      <View style={styles.ViewAll}>
        <TouchableOpacity style={styles.btnViewAllReview} onPress={handleViewAllReviews}>
          <Text style={styles.txtViewAllReview}>Xem thêm đánh giá</Text>
        </TouchableOpacity>
      </View>
    ) : null
  }
/>


      <Modal isVisible={isModalVisible} onBackdropPress={closeModal} style={styles.modal}>
        <View style={styles.modalContent}>
          <Image source={require('../design/image/done.png')} />
          <Text style={styles.modalTitle}>Xin cảm ơn bạn !</Text>
          <Text style={styles.modalMessage}>Bạn đã gửi đánh giá thành công !</Text>
          <TouchableOpacity onPress={handleHome} style={styles.modalButton}>
            <Text style={styles.modalButtonText}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal isVisible={isErrorModalVisible} onBackdropPress={closeErrorModal} style={styles.errorModal}>
        <View style={styles.modalContent}>
          <Image source={require('../design/image/error.png')} />
          <Text style={styles.modalTitle}>Đánh giá thất bại</Text>
          <Text style={styles.modalMessage}>{errorMessage}</Text>
          <TouchableOpacity onPress={closeErrorModal} style={styles.modalButton}>
            <Text style={styles.modalButtonText}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </Modal>

    </View>
  );
};

export default ReviewScreen;
