import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BASE_URL from '../component/apiConfig';
import styles from '../styles/ForgotPasswordStyles';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [error, setError] = useState('');
    const navigation = useNavigation();

    const handleBack = () => {
        navigation.goBack();
    };

    const handleSignIn = () => {
        navigation.navigate('SignIn');
    };

    const handleSignUp = () => {
        navigation.navigate('SignUp');
    };

    const handleOtpVerification = async () => {
        if (!email) {
            setError('Vui lòng nhập đủ thông tin');
        } else if (!/\S+@gmail\.com$/.test(email)) {
            setError('Email không đúng định dạng');
        } else {
            try {
                setError('');
                // Gọi API kiểm tra email
                const response = await fetch(`${BASE_URL}/user/getAll`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const result = await response.json();
                const user = result.find(user => user.email === email);

                if (user) {
                    // Gửi mã OTP về email
                    const otpResponse = await fetch(`${BASE_URL}/user/forgot-password`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email }),
                    });

                    if (otpResponse.ok) {
                        const otpData = await otpResponse.json(); // Nhận dữ liệu phản hồi
                        navigation.navigate('OtpForgetPassWord', { email, _id: user._id }); // Chuyển sang màn OtpForgetPassWord
                    } else {
                        const otpError = await otpResponse.json();
                        setError(otpError.message || 'Có lỗi xảy ra khi gửi mã OTP');
                    }
                } else {
                    setError('Email không tồn tại');
                }
            } catch (error) {
                console.error('Lỗi kết nối:', error);
                setError('Không thể kết nối đến máy chủ');
            }
        }
    };



    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack}>
                    <Image source={require('../design/image/ic_back.png')} style={styles.imgBack} />
                </TouchableOpacity>
                <Text style={styles.txtHeader}>Đổi Mật Khẩu</Text>
            </View>
            <View style={styles.imgContainer}>
                <Image source={require('../design/image/robot1.png')} style={styles.img} />
            </View>
            <View style={styles.form}>
                <Text style={styles.label}>Địa chỉ Email</Text>
                <View style={[
                    styles.inputContainer,
                    { borderColor: error ? 'red' : isFocused ? 'black' : '#000' },
                ]}>
                    <Image source={require('../design/image/ic_email.png')} style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập Email"
                        value={email}
                        onChangeText={setEmail}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    />
                </View>
                {error ? <Text style={styles.error}>{error}</Text> : <View style={styles.line} />}
            </View>
            {/* <View style={styles.checkContainer}>
                <TouchableOpacity onPress={handleSignIn}>
                    <Text style={styles.txtSignIn}>Đăng nhập</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSignUp}>
                    <Text style={styles.txtSignUp}>Đăng kí</Text>
                </TouchableOpacity>
            </View> */}
            <TouchableOpacity style={styles.btnLogin} onPress={handleOtpVerification}>
                <Text style={styles.txtLogin}>Xác thực OTP</Text>
            </TouchableOpacity>
            {/* <View style={styles.orContainer}>
                <View style={styles.lineOr} />
                <Text style={styles.txtOr}>Hoặc</Text>
                <View style={styles.lineOr} />
            </View>
            <View style={styles.socialButtonsContainer}>
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
    );
};

export default ForgotPassword;


