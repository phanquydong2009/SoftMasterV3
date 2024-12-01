import React, { useState, useRef } from 'react';
import { Text, View, TouchableOpacity, Image, TextInput, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import BASE_URL from '../component/apiConfig';
import styles from '../styles/OtpForgetPasswordStyles';
const OtpForgetPassWord = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { email: initialEmail } = route.params;
    const [email, setEmail] = useState(initialEmail || '');
    const [otp, setOtp] = useState(Array(6).fill(""));
    const [isComplete, setIsComplete] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const inputs = useRef([]);

    const handleInputChange = (text, index) => {
        if (!/^[0-9]*$/.test(text)) return;
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);
        setIsComplete(newOtp.every(item => item.length > 0));

        if (text && index < otp.length - 1) {
            inputs.current[index + 1]?.focus();
        } else if (!text && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };

    const handleVerifyOtp = async () => {
        if (!isComplete) {
            setErrorMessage('Vui lòng nhập đủ mã OTP');
            return;
        }

        setErrorMessage('');
        try {
            const otpValue = otp.join('');
            console.log('Mã OTP gửi đi:', otpValue);

            if (!email) {
                setErrorMessage('Email không hợp lệ.');
                return;
            }

            const response = await fetch(`${BASE_URL}/user/verify-otp-forgotpass/${route.params._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, otp: otpValue }),
            });

            const textResponse = await response.text();
            console.log('Phản hồi từ máy chủ:', textResponse);

            if (!response.ok) {
                const errorData = JSON.parse(textResponse);
                console.error('Lỗi xác minh OTP:', errorData);
                setErrorMessage(errorData.message || 'Có lỗi xảy ra khi xác minh OTP!');
                return;
            }

            const allUsersResponse = await fetch(`${BASE_URL}/user/getAll`);
            const allUsersData = await allUsersResponse.json();

            const user = allUsersData.find(user => user.email === email);

            if (user && user._id) {
                console.log('User ID từ phản hồi:', user._id);
                navigation.navigate('PasswordNew', { _id: user._id });
            } else {
                setErrorMessage('ID người dùng không hợp lệ hoặc không được cung cấp.');
            }
        } catch (error) {
            console.error('Lỗi kết nối:', error.message);
            setErrorMessage('Không thể kết nối đến máy chủ');
        }
    };

    return (
        <KeyboardAwareScrollView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardShouldPersistTaps="handled"
        >
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} accessibilityLabel="Quay lại">
                    <Image source={require('../design/image/ic_back.png')} style={styles.imgBack} />
                </TouchableOpacity>
                <Text style={styles.txtHeader}>Xác thực OTP</Text>
            </View>
            <View style={styles.body}>
                <Image source={require('../design/image/otp.png')} style={styles.image} />
                <Text style={styles.txt_body}>Vui lòng kiểm tra email của bạn để biết mã xác minh được gửi cho bạn.</Text>
                <View style={styles.input_container}>
                    {otp.map((value, index) => (
                        <TextInput
                            key={index}
                            style={styles.input_number}
                            keyboardType="number-pad"
                            maxLength={1}
                            value={value}
                            onChangeText={(text) => handleInputChange(text, index)}
                            ref={(input) => inputs.current[index] = input}
                            textAlign="center"
                            textAlignVertical="center"
                            underlineColorAndroid="transparent"
                            accessibilityLabel={`Ô nhập mã OTP ${index + 1}`}
                        />
                    ))}
                </View>
                {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.confirmButton, { backgroundColor: isComplete ? '#0961F5' : '#75767E' }]}
                    onPress={isComplete ? handleVerifyOtp : null}
                    disabled={!isComplete}
                    accessibilityLabel="Xác nhận OTP"
                >
                    <Text style={styles.confirmButtonText}>Xác nhận</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    );
};


export default OtpForgetPassWord;
