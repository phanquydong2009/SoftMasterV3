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

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
        const response = await fetch(`${BASE_URL}/feedbackCourse/getFeedbackByCourseID/${courseId}`);
        const feedbackData = await response.json();

        if (!Array.isArray(feedbackData)) {
            setReviews([]);
            return;
        }

        // Tạo một bộ nhớ cache cho dữ liệu người dùng
        const userCache = new Map();

        const feedbacksWithUser = await Promise.all(
            feedbackData.map(async feedback => {
                // Kiểm tra nếu dữ liệu người dùng đã có trong cache
                if (userCache.has(feedback.userID)) {
                    return { ...feedback, userName: userCache.get(feedback.userID).name };
                }

                // Nếu chưa có trong cache, gọi API để lấy dữ liệu người dùng
                const userResponse = await fetch(`${BASE_URL}/user/getUserByID/${feedback.userID}`);
                const userData = await userResponse.json();

                // Lưu vào cache để sử dụng lại lần sau
                userCache.set(feedback.userID, userData);
                return { ...feedback, userName: userData.name };
            })
        );

        setReviews(feedbacksWithUser);
    } catch (error) {
        console.error('Lỗi khi lấy feedbacks:', error);
        setReviews([]);
    }
};

  const formatDate = dateString => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const renderItem = ({ item }) => {
    const stars = '⭐'.repeat(item.feedbackDetail.rating);

    return (
      <View style={styles.itemReview}>
        <View style={styles.row}>
          <Text style={styles.txtRate}>{stars}</Text>
          <Text style={styles.txtUser}>{item.userName}</Text>
        </View>

        <Text style={styles.txtContent}>{item.feedbackDetail.content}</Text>

        <Text style={styles.txtTime}>
          {formatDate(item.feedbackDetail.updatedAt)}
        </Text>
      </View>
    );
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleStarPress = index => {
    setSelectedStars(index + 1);
  };

  const handleSubmitReview = async () => {
    // Kiểm tra xem userID và courseId có hợp lệ không
    if (!userID || !courseId) {
        return;
    }

    // Tạo URL với userID và courseId
    const feedbackUrl = `${BASE_URL}/feedbackCourse/feedback/${userID}/${courseId}`;
    console.log(`Calling API: ${feedbackUrl}`); 

    try {
        const response = await fetch(feedbackUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                rating: selectedStars , 
                content: comment , 
            }),
        });

        if (response.ok) {
            console.log('Feedback submitted successfully');
            setModalVisible(false);
            setComment('');
            setSelectedStars(0); 
            fetchFeedbacks();
        } else {
            console.error('Failed to submit feedback', await response.text());
        }
    } catch (error) {
        console.error('Error submitting feedback:', error); 
    }
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
        keyExtractor={item => item._id}
        renderItem={renderItem}
      />

      <View style={styles.ViewAll}>
        <TouchableOpacity style={styles.btnViewAllReview} onPress={() => setModalVisible(true)}>
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
