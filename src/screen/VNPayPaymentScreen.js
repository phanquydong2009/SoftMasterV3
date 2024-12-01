import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, View, Text, Modal, TouchableOpacity, Image } from 'react-native';
import { WebView } from 'react-native-webview';
import BASE_URL from '../component/apiConfig';

const VNPayPaymentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { paymentUrl, courseId, userID } = route.params;

  // Log thông tin nhận được
  console.log('Thông tin thanh toán: ', { paymentUrl, courseId, userID });
  const [modalVisible, setModalVisible] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(null);

  const handleUpdateStatus = async ({ paymentId, status }) => {
    try {
      await fetch(`${BASE_URL}/payment/update-payment-status`, {
        method: 'POST',
        body: JSON.stringify({
          paymentId,
          status,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      Alert.alert('Không thể cập nhật trạng thái thanh toán');
    }
  };

  const handleEnrollCourse = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/enrollCourse/enrollCourse/${userID}/${courseId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const result = await response.json();
      console.log('Kết quả đăng ký khóa học: ', result);  // Kiểm tra kết quả

      // Thay thế Alert bằng console.log
      if (result.success) {
        console.log('Đăng ký khóa học thất bại');

      } else {
        console.log('Đăng ký khóa học thành công!');
      }
    } catch (error) {
      console.log('Lỗi khi đăng ký khóa học', error); 
    }
  };


  const onNavigationStateChange = async data => {
    if (data.loading) {
      return;
    }

    const url = data.url;
    const regex = /(?<=&vnp_TransactionStatus=)\d+(?=&vnp_TxnRef)/;
    const match = url.match(regex);

    if (!match) {
      return;
    }

    const paymentIdReg =
      /(?<=vnp_TxnRef=SOFTMASTER_)[a-f0-9]+(?=&vnp_SecureHash)/;
    const matchPaymentId = url.match(paymentIdReg);
    const paymentId = matchPaymentId[0];

    const responseCode = match[0];
    if (responseCode === '00') {
      setPaymentSuccess(true);
      await handleUpdateStatus({ paymentId, status: 'SUCCESS' });
      setTimeout(async () => {
        await handleEnrollCourse();
      }, 1000);
    } else {
      setPaymentSuccess(false);
      await handleUpdateStatus({ paymentId, status: 'FAILED' });
    }

    setModalVisible(true);
  };

  const handleRetryPayment = () => {
    setModalVisible(false);
    // Logic to retry payment
    navigation.goBack();
  };

  const handleComplete = () => {
    setModalVisible(false);
    // Logic for completion (maybe navigate to a different screen)
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{
          uri: paymentUrl,
        }}
        style={{ flex: 1 }}
        onNavigationStateChange={onNavigationStateChange}
      />

      {/* Modal for Payment Result */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {paymentSuccess ? (
              <>
                <Image
                  source={require('../design/image/donePayment.png')}
                  style={styles.modalImage}
                />
                <Text style={styles.modalText}>
                  Thanh toán thành công
                </Text>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={handleComplete}
                >
                  <Text style={styles.modalButtonText}>Hoàn tất</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Image
                  source={require('../design/image/failPayment.png')}
                  style={styles.modalImage}
                />
                <Text style={styles.modalTextBold}>
                  Thanh toán thất bại
                </Text>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={handleRetryPayment}
                >
                  <Text style={styles.modalButtonText}>Thử thanh toán lại</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={handleComplete}
                >
                  <Text style={styles.modalButtonText}>Hủy thanh toán</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = {
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalTextBold: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 5,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
};

export default VNPayPaymentScreen;
