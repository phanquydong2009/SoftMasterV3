import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from './apiConfig';
import { useNavigation } from '@react-navigation/native'; 

const Notification = ({ userID }) => {
    const [notificationCount, setNotificationCount] = useState(0);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/enrollCourse/notifications/${userID}`);
                const data = response.data;
                const notifications = data.notifications || [];
                setNotificationCount(notifications.length);
            } catch (error) {
                console.error('Response error:', error.response.data);
            }
        };

        fetchNotifications();
    }, [userID]);

    // Hàm để chuyển sang NotificationScreen
    const handleNotificationPress = () => {
        navigation.navigate('NotificationScreen', { userID });
    };

    return (
        <View style={styles.header2}>
            <TouchableOpacity style={styles.btn_noti} onPress={handleNotificationPress}>
                <Image source={require('../design/image/ic_notification.png')} style={styles.img_btn_noti} />
            </TouchableOpacity>
            {notificationCount > 0 && (
                <View style={styles.containerNumber}>
                    <Text style={styles.numberNoti}>{notificationCount}</Text>
                </View>
            )}
        </View>
    );
};

export default Notification;

const styles = StyleSheet.create({
    containerNumber: {
        top: -8,
        right: -8,
        backgroundColor: 'red',
        width: 23,
        height: 23,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
    },
    numberNoti: {
        fontSize: 15,
        color: '#FFFFFF',
        fontFamily: 'Mulish-ExtraBold',
    },
    header2: {
        flexDirection: 'column',
        flex: 1,
        marginHorizontal: 20,
        alignItems: 'flex-end',
    },
    btn_noti: {
        width: 40,
        height: 40,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: '#167F71',
        justifyContent: 'center',
        alignItems: 'center',
    },
    img_btn_noti: {
        width: 30,
        height: 30,
    },
});
