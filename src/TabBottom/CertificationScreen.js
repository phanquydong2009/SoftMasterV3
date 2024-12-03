import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  RefreshControl,
} from 'react-native';
import ToolBar from '../component/ToolBar';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from '../stylesTabBottom/CertificationScreenStyles';
import BASE_URL from '../component/apiConfig';

const CertificationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userID } = route.params || {}; // Lấy userID từ tham số điều hướng
  const [certificates, setCertificates] = useState([]); // Trạng thái lưu danh sách chứng chỉ
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
  const [refreshing, setRefreshing] = useState(false); // Trạng thái cho chức năng kéo để làm mới

  // Định nghĩa hàm fetchCertificates ngoài useEffect để có thể sử dụng ở nhiều nơi
  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/certificate/getbyuserID/${userID}`);
      const data = await response.json();
  
      // Sắp xếp chứng chỉ theo updatedAt từ mới nhất đến cũ nhất
      const sortedData = data.certificates?.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)) || [];
  
      setCertificates(sortedData);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu từ API:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userID) {
      fetchCertificates(); // Gọi hàm fetchCertificates khi có userID
    }
  }, [userID]);

  // Hàm làm mới dữ liệu khi kéo xuống
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchCertificates();  // Gọi lại hàm fetchCertificates
    setRefreshing(false);
  };

  // Hàm xử lý khi bấm vào chứng chỉ để xem chi tiết
  const handleCert = (_id, courseName, teacherID, updatedAt, userName) => {
    navigation.navigate('Cert', {
      userID,
      nameCourse: courseName,
      teacherID,
      updatedAt,
      userName,
      certificateID: _id,  
    });
  };

  // Component hiển thị thông tin chứng chỉ
  const PersonalBrandingCard = ({ name, sub, image, courseName, teacherID, updatedAt, userName, certificateID }) => {
    return (
      <View style={styles.container2}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subtitle}>Hoàn thành ngày: {sub}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleCert(certificateID, courseName, teacherID, updatedAt, userName)}  // Truyền certificateID vào đây
          >
            <Text style={styles.buttonText}>Xem</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Hàm render mỗi item trong danh sách chứng chỉ
  const renderItem = ({ item }) => (
    <PersonalBrandingCard
      name={item.courseID?.name}
      sub={item.updatedAt.split('T')[0]}  // Chỉ lấy ngày từ updatedAt
      image={item.courseID?.img}
      courseName={item.courseID?.name} 
      teacherID={item.courseID?.teacherID}  
      updatedAt={item.updatedAt}  
      userName={item.userID?.name}    
      certificateID={item._id}  // Truyền _id chứng chỉ vào đây
    />
  );

  // Nếu đang tải dữ liệu, hiển thị thông báo
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ToolBar title={'Chứng chỉ'} />
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Đang tải...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ToolBar title={'Chứng chỉ'} />
      <FlatList
        data={certificates}
        renderItem={renderItem}  // Hiển thị mỗi chứng chỉ
        keyExtractor={(item) => item._id}  // Dùng _id làm key cho mỗi item
        showsVerticalScrollIndicator={false}  // Tắt thanh cuộn dọc
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}  // Gọi hàm onRefresh khi kéo xuống
          />
        }
      />
    </SafeAreaView>
  );
};

export default CertificationScreen;
