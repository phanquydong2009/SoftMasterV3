// src/screen/SignUpOrSignIn.js
import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/SignUpOrSignInStyles';

const SignUpOrSignIn = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={require('../design/image/robot1.png')} style={styles.imgLogo} />
      <View style={styles.txt_container}>
        <Text style={styles.txt}> Bạn chưa có tài khoản? Đăng kí ngay bây giờ</Text>
        <Text style={styles.txt}> Đã có tài khoản? Đăng nhập để tiếp tục.</Text>
      </View>
      <View style={styles.btn_container}>
        <TouchableOpacity style={styles.btnSignUp} onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.txtSignUp}> Đăng Ký</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnSignIn} onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.txtSignIn}> Đăng Nhập</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpOrSignIn;
