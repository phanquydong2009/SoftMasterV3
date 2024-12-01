import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Modal } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import BASE_URL from '../component/apiConfig';
const PasswordNew = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordBorderColor, setPasswordBorderColor] = useState('#CCCCCC');
    const [confirmPasswordBorderColor, setConfirmPasswordBorderColor] = useState('#CCCCCC');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const navigation = useNavigation();
    const route = useRoute();
    const { _id } = route.params;

    const handleBack = () => {
        navigation.navigate('SignUpOrSignIn');
    };

    const handleInputFocus = (type) => {
        if (type === 'password') {
            setPasswordBorderColor('#000000');
        } else if (type === 'confirmPassword') {
            setConfirmPasswordBorderColor('#000000');
        }
        setErrorText('');
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const validateInputs = async () => {
        let valid = true;

        // Reset border colors and error text
        setPasswordBorderColor('#CCCCCC');
        setConfirmPasswordBorderColor('#CCCCCC');
        setErrorText('');

        // Validate password
        if (password === '') {
            setPasswordBorderColor('#FF0000');
            setErrorText('Vui lòng điền mật khẩu');
            valid = false;
        } else if (password.length < 8) {
            setPasswordBorderColor('#FF0000');
            setErrorText('Mật khẩu phải có ít nhất 8 ký tự');
            valid = false;
        } else {
            setPasswordBorderColor(password ? '#4CAF50' : '#CCCCCC');
        }

        // Validate confirm password
        if (confirmPassword === '') {
            setConfirmPasswordBorderColor('#FF0000');
            setErrorText('Vui lòng nhập lại mật khẩu');
            valid = false;
        } else {
            setConfirmPasswordBorderColor(confirmPassword ? '#4CAF50' : '#CCCCCC');
        }

        // Check if passwords match
        if (password && confirmPassword && password !== confirmPassword) {
            setPasswordBorderColor('#FF0000');
            setConfirmPasswordBorderColor('#FF0000');
            setErrorText('Mật khẩu không khớp');
            valid = false;
        }

        // Proceed with API call if valid
        if (valid) {
            try {
                const response = await fetch(`${BASE_URL}/user/reset-password/${_id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ newPassword: password }),
                });

                if (!response.ok) {
                    const responseData = await response.json();
                    setErrorText(responseData.message || 'Có lỗi xảy ra khi cập nhật mật khẩu!');
                    console.error('Lỗi từ máy chủ:', responseData);
                    return;
                }

                setModalVisible(true);

                setTimeout(() => {
                    navigation.navigate('SignIn');
                }, 2000);
            } catch (error) {
                console.error('Lỗi kết nối:', error.message);
                setErrorText('Không thể kết nối đến máy chủ');
            }
        }
    };

    // Determine button background color
    const buttonBackgroundColor = password && confirmPassword ? '#0961F5' : 'rgba(117, 118, 126, 0.8)';

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack}>
                    <Image source={require("../design/image/ic_back.png")} style={styles.imgBack} />
                </TouchableOpacity>
                <Text style={styles.txtHeader}>Mật khẩu mới</Text>
            </View>
            <View style={styles.imgContainer}>
                <Image source={require('../design/image/robot1.png')} style={styles.img} />
            </View>
            <View style={styles.form}>
                <Text style={styles.label}>Mật khẩu mới</Text>
                <View style={[styles.inputContainer, { borderColor: passwordBorderColor }]}>
                    <Image source={require('../design/image/ic_lock.png')} style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập mật khẩu mới"
                        secureTextEntry={!passwordVisible}
                        onFocus={() => handleInputFocus('password')}
                        onChangeText={(text) => setPassword(text)}
                    />
                    <TouchableOpacity onPress={togglePasswordVisibility}>
                        <Image
                            source={passwordVisible ? require('../design/image/ic_eyeHint.png') : require('../design/image/ic_eyeShow.png')}
                            style={styles.eyeIcon}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.label}>Nhập lại mật khẩu mới</Text>
                <View style={[styles.inputContainer, { borderColor: confirmPasswordBorderColor }]}>
                    <Image source={require('../design/image/ic_lock.png')} style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập lại mật khẩu mới"
                        secureTextEntry={!confirmPasswordVisible}
                        onFocus={() => handleInputFocus('confirmPassword')}
                        onChangeText={(text) => setConfirmPassword(text)}
                    />
                    <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
                        <Image
                            source={confirmPasswordVisible ? require('../design/image/ic_eyeHint.png') : require('../design/image/ic_eyeShow.png')}
                            style={styles.eyeIcon}
                        />
                    </TouchableOpacity>
                </View>
                {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}
                <View style={styles.line}></View>
            </View>
            <TouchableOpacity style={[styles.btnLogin, { backgroundColor: buttonBackgroundColor }]} onPress={validateInputs}>
                <Text style={styles.txtLogin}>Hoàn tất</Text>
            </TouchableOpacity>

            {/* Custom Success Modal */}
            <Modal
                transparent={true}
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Image source={require('../design/image/done.png')} style={styles.modalImage} />
                        <Text style={styles.modalText1}>Đổi mật khẩu thành công</Text>
                        <Text style={styles.modalText}>Từ giờ bạn phải đăng nhập với mật khẩu vừa cập nhật</Text>
                        <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.modalButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};



export default PasswordNew;
