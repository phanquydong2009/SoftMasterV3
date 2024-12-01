import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from '../styles/SecurityScreenStyles';

const SecurityScreen = () => {
    const navigation = useNavigation();
    // State for switch
    const [isRememberMeEnabled, setIsRememberMeEnabled] = useState(false);

    const toggleSwitch = () => {
        setIsRememberMeEnabled(prev => !prev);
    };
    const handleForgotPassword = () => {
        navigation.navigate('ForgotPassword');
    };
  
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Image
                        source={require('../design/image/ic_back.png')}
                        style={styles.backIcon}
                    />
                </TouchableOpacity>
                <Text style={styles.headerText}>Bảo Mật</Text>
            </View>
            {/* Image and Text Content */}
            <View style={styles.content}>
                <ImageBackground
                    style={styles.securityIcon}
                    resizeMode="cover"
                    source={require('../design/image/security.png')}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.securityText}>
                        Để bảo vệ tối đa tài khoản của bạn, chúng tôi khuyến nghị sử dụng mật khẩu có chứa các ký tự đặc biệt nhằm tăng cường tính bảo mật.
                    </Text>
                </View>
                {/* Remember Me Switch */}
                <View style={styles.switchContainer}>
                    <Text style={styles.switchText}>Ghi nhớ tôi</Text>
                    <TouchableOpacity
                        style={[
                            styles.outer,
                            { backgroundColor: isRememberMeEnabled ? '#0961F5' : '#E8F1FF' }
                        ]}
                        onPress={toggleSwitch}
                    >
                        <View
                            style={[
                                styles.inner,
                                { backgroundColor: isRememberMeEnabled ? '#E8F1FF' : '#f4f3f4', transform: [{ translateX: isRememberMeEnabled ? 30 : 0 }] }
                            ]}
                        />
                    </TouchableOpacity>
                </View>
                {/* Action Buttons */}
                <TouchableOpacity style={styles.infoButton}>
                    <Text style={styles.infoButtonText}>Xem thông tin</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.passwordButton} onPress={handleForgotPassword} >
                    <Text style={styles.passwordButtonText}>Thay đổi mật khẩu</Text>
                    <Image
                        source={require('../design/image/Circle.png')}
                        style={styles.buttonIcon}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SecurityScreen;

