// src/screen/WelcomeScreen.js
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/WelcomeScreenStyles';

const WelcomeScreen = () => {
  const [step, setStep] = useState(0);
  const navigation = useNavigation();

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      navigation.navigate('SignUpOrSignIn');
    }
  };
  const handleLogin = ()=>{
    navigation.navigate('SignIn');
  }

  const imageSource = step === 0 ? require('../design/image/welcome1.png') : require('../design/image/welcome2.png');
  const txtHeader = step === 0 ? "Chuẩn bị học tập với sự tự tin" : (step === 1 ? "Bài giảng tốt nhất hiện nay." : "Dễ dàng liên lạc với Giảng viên");
  const txtContent = step === 0 ? "Tham gia các khóa học để không ngừng rèn luyện và phát triển kỹ năng, giúp bạn trở nên tự tin hơn trong mọi lĩnh vực của cuộc sống." : (step === 1 ? "Xem video bài giảng, học tập, làm bài kiểm tra. Đào tạo mỗi ngày và nhận đánh giá từ SoftMaster." : "Gửi tin nhắn trực tiếp cho giảng viên để nhận thông tin chi tiết và cập nhật mới nhất về bài học của bạn.");
  const dotActiveIndex = step === 0 ? 0 : (step === 1 ? 1 : 2);
  const btnText = step === 2 ? "Bắt đầu" : "Tiếp tục";

  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} />
      <View style={styles.text_container}>
        <Text style={styles.txt_header}>{txtHeader}</Text>
        <Text style={styles.txt}>{txtContent}</Text>
      </View>
      <View style={styles.dot_container}>
        <View style={[styles.dot, dotActiveIndex === 0 && styles.dot_active]}></View>
        <View style={[styles.dot, dotActiveIndex === 1 && styles.dot_active]}></View>
        <View style={[styles.dot, dotActiveIndex === 2 && styles.dot_active]}></View>
      </View>
      <View style={styles.btn_container}>
        <TouchableOpacity style={styles.btn} onPress={handleNext}>
          <Text style={styles.txtbtn}>{btnText}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={styles.txtFooter1}> Đã có tài khoản? </Text>
        <Text style={styles.txtFooter2} onPress={handleLogin}> Đăng nhập</Text>
      </View>
    </View>
  );
};



export default WelcomeScreen;
