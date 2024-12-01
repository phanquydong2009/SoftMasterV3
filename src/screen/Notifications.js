import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import styles from '../styles/NotificationsStyles';

const Notifications = ({ navigation }) => {
    // State for each toggle
    const [isSpecialOffersEnabled, setIsSpecialOffersEnabled] = useState(true);
    const [isSoundEnabled, setIsSoundEnabled] = useState(true);
    const [isGeneralNotificationEnabled, setIsGeneralNotificationEnabled] = useState(true);
    const [isPaymentOptionsEnabled, setIsPaymentOptionsEnabled] = useState(true);
    const [isAppUpdatesEnabled, setIsAppUpdatesEnabled] = useState(true);
    const [isNewServicesEnabled, setIsNewServicesEnabled] = useState(false);
    const [isNewTipsEnabled, setIsNewTipsEnabled] = useState(false);

    const toggleSwitch = (setter) => {
        setter(prev => !prev);
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
                <Text style={styles.headerText}>Thông Báo</Text>
            </View>
            {/* Notifications List */}
            <View style={styles.notificationItem}>
                <Text style={styles.notificationText}>Ưu đãi đặc biệt</Text>
                <TouchableOpacity
                    style={[
                        styles.outer,
                        { backgroundColor: isSpecialOffersEnabled ? '#0961F5' : '#E8F1FF' }
                    ]}
                    onPress={() => toggleSwitch(setIsSpecialOffersEnabled)}
                >
                    <View
                        style={[
                            styles.inner,
                            { backgroundColor: isSpecialOffersEnabled ? '#E8F1FF' : '#f4f3f4', transform: [{ translateX: isSpecialOffersEnabled ? 30 : 0 }] }
                        ]}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.notificationItem}>
                <Text style={styles.notificationText}>Âm thanh</Text>
                <TouchableOpacity
                    style={[
                        styles.outer,
                        { backgroundColor: isSoundEnabled ? '#0961F5' : '#E8F1FF' }
                    ]}
                    onPress={() => toggleSwitch(setIsSoundEnabled)}
                >
                    <View
                        style={[
                            styles.inner,
                            { backgroundColor: isSoundEnabled ? '#E8F1FF' : '#f4f3f4', transform: [{ translateX: isSoundEnabled ? 30 : 0 }] }
                        ]}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.notificationItem}>
                <Text style={styles.notificationText}>Thông báo chung</Text>
                <TouchableOpacity
                    style={[
                        styles.outer,
                        { backgroundColor: isGeneralNotificationEnabled ? '#0961F5' : '#E8F1FF' }
                    ]}
                    onPress={() => toggleSwitch(setIsGeneralNotificationEnabled)}
                >
                    <View
                        style={[
                            styles.inner,
                            { backgroundColor: isGeneralNotificationEnabled ? '#E8F1FF' : '#f4f3f4', transform: [{ translateX: isGeneralNotificationEnabled ? 30 : 0 }] }
                        ]}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.notificationItem}>
                <Text style={styles.notificationText}>Tùy chọn thanh toán</Text>
                <TouchableOpacity
                    style={[
                        styles.outer,
                        { backgroundColor: isPaymentOptionsEnabled ? '#0961F5' : '#E8F1FF' }
                    ]}
                    onPress={() => toggleSwitch(setIsPaymentOptionsEnabled)}
                >
                    <View
                        style={[
                            styles.inner,
                            { backgroundColor: isPaymentOptionsEnabled ? '#E8F1FF' : '#f4f3f4', transform: [{ translateX: isPaymentOptionsEnabled ? 30 : 0 }] }
                        ]}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.notificationItem}>
                <Text style={styles.notificationText}>Cập nhật ứng dụng</Text>
                <TouchableOpacity
                    style={[
                        styles.outer,
                        { backgroundColor: isAppUpdatesEnabled ? '#0961F5' : '#E8F1FF' }
                    ]}
                    onPress={() => toggleSwitch(setIsAppUpdatesEnabled)}
                >
                    <View
                        style={[
                            styles.inner,
                            { backgroundColor: isAppUpdatesEnabled ? '#E8F1FF' : '#f4f3f4', transform: [{ translateX: isAppUpdatesEnabled ? 30 : 0 }] }
                        ]}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.notificationItem}>
                <Text style={styles.notificationText}>Dịch vụ mới có sẵn</Text>
                <TouchableOpacity
                    style={[
                        styles.outer,
                        { backgroundColor: isNewServicesEnabled ? '#0961F5' : '#E8F1FF' }
                    ]}
                    onPress={() => toggleSwitch(setIsNewServicesEnabled)}
                >
                    <View
                        style={[
                            styles.inner,
                            { backgroundColor: isNewServicesEnabled ? '#E8F1FF' : '#f4f3f4', transform: [{ translateX: isNewServicesEnabled ? 30 : 0 }] }
                        ]}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.notificationItem}>
                <Text style={styles.notificationText}>Mẹo mới có sẵn</Text>
                <TouchableOpacity
                    style={[
                        styles.outer,
                        { backgroundColor: isNewTipsEnabled ? '#0961F5' : '#E8F1FF' } // Ensure consistency here
                    ]}
                    onPress={() => toggleSwitch(setIsNewTipsEnabled)}
                >
                    <View
                        style={[
                            styles.inner,
                            { backgroundColor: isNewTipsEnabled ? '#E8F1FF' : '#f4f3f4', transform: [{ translateX: isNewTipsEnabled ? 30 : 0 }] }
                        ]}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Notifications;

