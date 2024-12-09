import React, { useState } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    Modal,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import BASE_URL from '../component/apiConfig';
import styles from '../styles/UpdatePasswordStyles';

const UpdatePassword = ({ navigation }) => {
    const route = useRoute();
    const { userID, currentPassword } = route.params;

    // State 
    const [currentPasswordRoute, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [error, setError] = useState('');
    const [successPopupVisible, setSuccessPopupVisible] = useState(false); // Modal state

    const handleGoUpdatePassWord = async () => {
        // Kiểm tra mật khẩu hiện tại
        if (currentPasswordRoute !== currentPassword) {
            setError('Mật khẩu hiện tại không đúng');
            return;
        }
    
        if (!newPassword.trim() || !confirmPassword.trim()) {
            setError('Không được để trống bất kỳ ô nào');
            return;
        }
    
        if (newPassword !== confirmPassword) {
            setError('Mật khẩu mới và xác nhận mật khẩu không khớp');
            return;
        }
    
        setError('');
    
        try {
            // Gửi yêu cầu cập nhật mật khẩu
            const updateResponse = await fetch(`${BASE_URL}/user/reset-password/${userID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    newPassword: newPassword,
                }),
            });
    
            const updateData = await updateResponse.json();
    
            if (!updateResponse.ok) {
                console.log('Error from updateResponse:', updateData);
                Alert.alert('Lỗi', updateData.message || 'Không thể cập nhật mật khẩu');
                return;
            }
    
            // Nếu thành công, thay Alert bằng Modal
            setSuccessPopupVisible(true); // Hiển thị Modal thành công
            setTimeout(() => {
                setSuccessPopupVisible(false); // Đóng Modal sau vài giây (hoặc người dùng bấm OK)
                navigation.goBack(); // Quay lại màn hình trước đó
            }, 2000); // Tự động đóng Modal sau 2 giây
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Lỗi', 'Đã xảy ra lỗi trong quá trình xử lý');
        }
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    const closeSuccessPopup = () => {
        setSuccessPopupVisible(false);
        navigation.navigate('SignIn');  
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={handleGoBack}>
                            <Image source={require('../design/image/ic_back.png')} style={styles.imgBack} />
                        </TouchableOpacity>
                        <Text style={styles.txtHeader}>Đổi Mật Khẩu</Text>
                    </View>
                    <View style={styles.imgContainer}>
                        <Image source={require('../design/image/logoAppNoBG.png')} style={styles.img} />
                    </View>
                    <View style={styles.form}>
                        <Text style={styles.label}>Mật khẩu hiện tại</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Mật khẩu hiện tại"
                                value={currentPasswordRoute}
                                onChangeText={setCurrentPassword}
                                secureTextEntry={!currentPasswordVisible}
                            />
                            <TouchableOpacity onPress={() => setCurrentPasswordVisible(!currentPasswordVisible)}>
                                <Image
                                    source={currentPasswordVisible ? require('../design/image/ic_eyeShow.png') : require('../design/image/ic_eyeHint.png')}
                                    style={styles.inputIcon}
                                />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.label}>Mật khẩu mới</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Mật khẩu mới"
                                value={newPassword}
                                onChangeText={setNewPassword}
                                secureTextEntry={!newPasswordVisible}
                            />
                            <TouchableOpacity onPress={() => setNewPasswordVisible(!newPasswordVisible)}>
                                <Image
                                    source={newPasswordVisible ? require('../design/image/ic_eyeShow.png') : require('../design/image/ic_eyeHint.png')}
                                    style={styles.inputIcon}
                                />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.label}>Nhập lại mật khẩu mới</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Nhập lại mật khẩu mới"
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry={!confirmPasswordVisible}
                            />
                            <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                                <Image
                                    source={confirmPasswordVisible ? require('../design/image/ic_eyeShow.png') : require('../design/image/ic_eyeHint.png')}
                                    style={styles.inputIcon}
                                />
                            </TouchableOpacity>
                        </View>

                        {error ? <Text style={styles.error}>{error}</Text> : <View style={styles.line} />}
                    </View>

                    <TouchableOpacity style={styles.btnLogin} onPress={handleGoUpdatePassWord}>
                        <Text style={styles.txtLogin}>Cập nhật mật khẩu</Text>
                    </TouchableOpacity>
                </View>

                {/* Modal thông báo thành công */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={successPopupVisible}
                    onRequestClose={closeSuccessPopup}
                >
                    <View style={styles.popupOverlay}>
                        <View style={styles.popupContainer}>
                            <Image source={require('../design/image/sss.jpg')} style={styles.popupImage} />
                            <Text style={styles.popupTitle}>Cập nhật thành công!</Text>
                            <Text style={styles.popupMessage}>Thông tin của bạn đã được cập nhật mới.</Text>
                            <TouchableOpacity style={styles.popupButton} onPress={closeSuccessPopup}>
                                <Text style={styles.popupButtonText}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default UpdatePassword;
