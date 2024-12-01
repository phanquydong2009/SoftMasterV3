import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import BASE_URL from '../component/apiConfig';
import styles from '../styles/SignUpStyles';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState(''); // State for phone number
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailBorderColor, setEmailBorderColor] = useState('#CCCCCC');
  const [passwordBorderColor, setPasswordBorderColor] = useState('#CCCCCC');
  const [confirmPasswordBorderColor, setConfirmPasswordBorderColor] = useState('#CCCCCC');
  const [nameBorderColor, setNameBorderColor] = useState('#CCCCCC');
  const [phoneBorderColor, setPhoneBorderColor] = useState('#CCCCCC'); // Border color for phone number
  const [errorText, setErrorText] = useState('');

  // Format name with uppercase first letters
  const handleNameChange = (text) => {
    const formattedText = text.replace(/(^\w|\s\w)/g, m => m.toUpperCase());
    setName(formattedText);
    setNameBorderColor(formattedText.trim() !== '' ? '#4CAF50' : '#FF0000');
  };

  // Validate email format
  const handleEmailChange = (text) => {
    setEmail(text);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(text)) {
      setErrorText('Email không đúng định dạng');
      setEmailBorderColor('#FF0000');
    } else {
      setErrorText('');
      setEmailBorderColor('#4CAF50');
    }
  };

  // Validate phone number (only digits)
  const handlePhoneChange = (text) => {
    const phoneRegex = /^[0-9]*$/; // Regex to allow only numbers
    if (!phoneRegex.test(text)) {
      setErrorText('Số điện thoại chỉ cho phép số');
      setPhoneBorderColor('#FF0000');
    } else {
      setErrorText('');
      setPhoneBorderColor(text.trim() !== '' ? '#4CAF50' : '#CCCCCC');
      setPhone(text);
    }
  };

  // Validate password length
  const handlePasswordChange = (text) => {
    setPassword(text);
    if (text.length < 8) {
      setErrorText('Mật khẩu phải dài hơn 8 ký tự');
      setPasswordBorderColor('#FF0000');
    } else {
      setErrorText('');
      setPasswordBorderColor('#4CAF50');
    }
  };

  // Validate confirm password match
  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
    if (text !== password) {
      setErrorText('Mật khẩu không khớp');
      setConfirmPasswordBorderColor('#FF0000');
    } else {
      setErrorText('');
      setConfirmPasswordBorderColor('#4CAF50');
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => setPasswordVisible(prevState => !prevState);

  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(prevState => !prevState);

  // Focus input handler
  const handleFocus = (setBorderColor) => {
    setBorderColor('#000000'); // Change border color to black on focus
  };

  const handleSignUp = async () => {
    let valid = true;

    if (name === '' || email === '' || password === '' || confirmPassword === '' || phone === '') {
      setErrorText('Vui lòng điền đầy đủ thông tin!');
      if (name === '') { setNameBorderColor('#FF0000'); }
      if (email === '') { setEmailBorderColor('#FF0000'); }
      if (password === '') { setPasswordBorderColor('#FF0000'); }
      if (confirmPassword === '') { setConfirmPasswordBorderColor('#FF0000'); }
      if (phone === '') { setPhoneBorderColor('#FF0000'); } // Validate phone number
      valid = false;
    }

    if (valid && password.length >= 8 && password === confirmPassword && errorText === '') {
      setErrorText('');

      try {
        console.log('Sending registration request...');
        const response = await axios.post(`${BASE_URL}/user/register`, {
          name,
          email,
          password,
          phone, // Send phone number in the registration request
        });

        console.log('Register Response:', response.data);

        if (response.data.message === 'Mã OTP đã được gửi đến email của bạn') {
          // Navigate to OTP screen after successful registration
          navigation.navigate('Otp', { email });
        } else {
          setErrorText('Đăng ký không thành công. Vui lòng thử lại.');
        }
      } catch (error) {
        console.error('Sign up error:', error);
        setErrorText('Tài khoản đã tồn tại hoặc Email đã đăng kí !');
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('SignUpOrSignIn')}>
            <Image source={require('../design/image/ic_back.png')} style={styles.imgBack} />
          </TouchableOpacity>
          <Text style={styles.txtHeader}>Đăng kí</Text>
        </View>

        <View style={styles.imgContainer}>
          <Image source={require('../design/image/robot1.png')} style={styles.img} />
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Họ và tên</Text>
          <View style={[styles.inputContainer, { borderColor: nameBorderColor }]} >
            <Image source={require('../design/image/ic_email.png')} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Nhập họ tên"
              value={name}
              onChangeText={handleNameChange}
              onFocus={() => handleFocus(setNameBorderColor)}
            />
          </View>

          <Text style={styles.label}>Địa chỉ Email</Text>
          <View style={[styles.inputContainer, { borderColor: emailBorderColor }]} >
            <Image source={require('../design/image/ic_email.png')} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Nhập Email"
              value={email}
              onChangeText={handleEmailChange}
              onFocus={() => handleFocus(setEmailBorderColor)}
            />
          </View>

          {/* Phone Number Input */}
          <Text style={styles.label}>Số điện thoại</Text>
          <View style={[styles.inputContainer, { borderColor: phoneBorderColor }]}>
            <Image source={require('../design/image/ic_phone.png')} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Nhập số điện thoại"
              value={phone}
              onChangeText={handlePhoneChange}
              keyboardType="numeric" // Show numeric keyboard
              onFocus={() => handleFocus(setPhoneBorderColor)}
            />
          </View>

          <Text style={styles.label}>Mật khẩu</Text>
          <View style={[styles.inputContainer, { borderColor: passwordBorderColor }]} >
            <Image source={require('../design/image/ic_lock.png')} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Nhập mật khẩu"
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={handlePasswordChange}
              onFocus={() => handleFocus(setPasswordBorderColor)}
            />

            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Image
                source={passwordVisible ? require('../design/image/ic_eyeHint.png') : require('../design/image/ic_eyeShow.png')}
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Nhập lại mật khẩu</Text>
          <View style={[styles.inputContainer, { borderColor: confirmPasswordBorderColor }]} >
            <Image source={require('../design/image/ic_lock.png')} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Nhập lại mật khẩu"
              secureTextEntry={!confirmPasswordVisible}
              value={confirmPassword}
              onChangeText={handleConfirmPasswordChange}
              onFocus={() => handleFocus(setConfirmPasswordBorderColor)}
            />

            <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
              <Image
                source={confirmPasswordVisible ? require('../design/image/ic_eyeHint.png') : require('../design/image/ic_eyeShow.png')}
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>

          {errorText !== '' && <Text style={styles.errorText}>{errorText}</Text>}

          <TouchableOpacity style={styles.btnLogin} onPress={handleSignUp}>
            <Text style={styles.txtLogin}>Đăng kí</Text>
          </TouchableOpacity>

          {/* <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={styles.googleButton}>
              <Image source={require('../design/image/ic_google.png')} style={styles.socialIcon} />
              <Text style={styles.socialTextGG}>GOOGLE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.facebookButton}>
              <Image source={require('../design/image/ic_facebook.png')} style={styles.socialIcon} />
              <Text style={styles.socialTextFB}>FACEBOOK</Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};


export default SignUpScreen;
