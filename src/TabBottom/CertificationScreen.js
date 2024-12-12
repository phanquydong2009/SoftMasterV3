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

  // Hàm fetch chứng chỉ
  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/certificate/getbyuserID/${userID}`);
      const data = await response.json();
  
      // Sắp xếp chứng chỉ theo updatedAt từ mới nhất đến cũ nhất
      const sortedData = data.certificates?.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)) || [];
  
      setCertificates(sortedData);
    } catch (error) {
      // console.error('Lỗi khi lấy dữ liệu từ API:', error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect để lấy dữ liệu khi có userID
  useEffect(() => {
    if (userID) {
      fetchCertificates(); // Lấy chứng chỉ khi userID thay đổi
    }
  }, [userID]);

  // Hàm làm mới dữ liệu khi kéo xuống
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchCertificates(); // Lấy lại dữ liệu khi làm mới
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
      sub={item.updatedAt.split('T')[0]}  
      image={item.courseID?.img}
      courseName={item.courseID?.name} 
      teacherID={item.courseID?.teacherID}  
      updatedAt={item.updatedAt}  
      userName={item.userID?.name}    
      certificateID={item._id} 
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
      <View style={styles.body}>
        {certificates.length === 0 ? (
          <Text style={styles.emptyText}>Bạn chưa có chứng chỉ nào</Text>
        ) : (
          <FlatList
            data={certificates}
            renderItem={renderItem} 
            keyExtractor={(item) => item._id}  
            showsVerticalScrollIndicator={false}  
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}  
              />
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default CertificationScreen;
