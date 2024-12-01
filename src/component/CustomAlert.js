import React, { useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import styles from '../styles/QuizzCourseStyles'; 
import BASE_URL from './apiConfig';

const CustomAlert = ({ visible, score, scoreType, userID, testId }) => {
  const navigation = useNavigation(); // Use navigation hook

  // Gọi API khi modal đóng lại
  const submitScore = async () => {
    console.log('Gửi dữ liệu:', { userID, testId, score });

    try {
      const response = await fetch(`${BASE_URL}/score/addScore`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userID: userID,
          testID: testId,
          score: score,
        }),
      });
    
      if (response.ok) {
        const responseData = await response.json();
        console.log('Gửi điểm thành công, API trả về:', responseData);
      } else {
        console.log('Phản hồi từ server:', response.status, response.statusText);
        const errorData = await response.json();
        console.error('Chi tiết lỗi:', errorData);
      }
    } catch (error) {
      console.error('Lỗi kết nối đến API:', error.message);
    }
  };

  useEffect(() => {
    if (visible) {
      // Gọi API khi modal xuất hiện
      submitScore();
    }
  }, [visible]);

  // Function to handle navigation to DetailLesson
  const handleGoBackToDetailLesson = () => {
    navigation.goBack(); // Navigates to the previous screen (DetailLesson)
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={handleGoBackToDetailLesson}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Image
            source={require('../design/image/chucmung.png')}
            style={styles.modalImage}
          />
          <Text style={styles.modalHeaderText}>Xin chúc mừng</Text>
          <Text style={styles.modalSubText}>
            Chúc mừng bạn đã hoàn thành bài kiểm tra
          </Text>
          <Text style={styles.modalText}>{score} điểm</Text> 
          <Text style={styles.modalFooterText}>{scoreType}</Text>

          <TouchableOpacity
            onPress={handleGoBackToDetailLesson} // Use new function to navigate back
            style={styles.continueButtonDone}>
            <Text style={styles.continueButtonTextDone}>Tiếp theo</Text>
            <Image
              source={require('../design/image/icon_continue.png')}
              style={styles.continueButtonImage}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlert;
