import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import ToolBar from '../component/ToolBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_URL from '../component/apiConfig';
import styles from '../stylesTabBottom/ProfileScreenStyles';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const userID = route.params?.userID;

  const [userData, setUserData] = useState({
    _id: '',
    name: '',
    email: '',
    avatar: '',
  });
  const [refreshing, setRefreshing] = useState(false);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/user/getUserByID/${userID}`);
      const user = await response.json();

      console.log('Dữ liệu người dùng:', user);
      console.log('URL của avatar:', user.avatar);

      if (user) {
        setUserData({
          _id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar || 'https://i.ibb.co/HzGR3ff/noprofile.png',
        });
      } else {
        console.error('Không tìm thấy người dùng');
      }
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu người dùng:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userID]);

  const handleEditProfile = () => {
    console.log('ID truyền qua là:', userData._id);
    navigation.navigate('EditProfile', { userID: userData._id });
  };

  const onSignOut = async () => {
    await AsyncStorage.removeItem('USER_INFO');
    navigation.navigate('SignIn');
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchUserData().then(() => setRefreshing(false));
  }, []);

  const profileItems = [
    {
      title: 'Nâng cấp lên Premium',
      icon: require('../design/image/vip.png'),
      onPress: () => navigation.navigate('Premium'),
    },
    {
      title: 'Chỉnh sửa hồ sơ',
      icon: require('../design/image/edit_profile.png'),
      onPress: handleEditProfile,
    },
    {
      title: 'Tùy chọn thanh toán',
      icon: require('../design/image/payment.png'),
      onPress: () => navigation.navigate('CardPayment'),
    },
    {
      title: 'Bảo mật',
      icon: require('../design/image/ic_security.png'),
      onPress: () => navigation.navigate('Security'),
    },
    {
      title: 'Ngôn ngữ',
      icon: require('../design/image/language.png'),
      value: 'Vietnam(VN)',
      onPress: () => navigation.navigate('Language'),
    },
    { title: 'Chế độ tối', icon: require('../design/image/dark_mode.png') },
    {
      title: 'Điều khoản & Điều kiện',
      icon: require('../design/image/terms.png'),
      onPress: () => navigation.navigate('TermsPolicy'),
    },
    {
      title: 'Mời bạn bè',
      icon: require('../design/image/invite_friends.png'),
      onPress: () => navigation.navigate('ShareFriend'),
    },
    {
      title: 'Đăng xuất',
      icon: require('../design/image/logout.png'),
      onPress: onSignOut,
    },
  ];

  const ProfileItem = ({ icon, title, value, onPress }) => (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View style={styles.itemLeft}>
        {icon && (
          <Image source={icon} style={styles.itemIcon} resizeMode="contain" />
        )}
        <Text style={styles.itemTitle}>{title}</Text>
      </View>
      <View style={styles.itemRight}>
        {value && <Text style={styles.itemValue}>{value}</Text>}
        <Image source={require('../design/image/ic_backRight.png')} />
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <ToolBar title={'Trang cá nhân'} />
      <View style={styles.boxContainer}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <View>
              <Image
                source={
                  userData.avatar
                    ? { uri: userData.avatar }
                    : require('../design/image/noprofile.png')
                }
                style={styles.profileImage}
              />
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/1829/1829589.png',
                }}
                style={styles.updateImage}
              />
            </View>
          </View>
          <Text style={styles.name}>{userData.name}</Text>
          <Text style={styles.email}>{userData.email}</Text>
        </View>
        {profileItems.map((item, index) => (
          <ProfileItem
            key={index}
            icon={item.icon}
            title={item.title}
            value={item.value}
            onPress={item.onPress}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
