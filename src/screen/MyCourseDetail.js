import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  RefreshControl,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_URL from '../component/apiConfig';
import styles from '../styles/MyCourseDetailScreenStyles';
import Toast from 'react-native-toast-message'; // Import Toast

const MyCourseDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { courseID, userID, testIdDone } = route.params || {};

  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [completedLessons, setCompletedLessons] = useState({});

  useEffect(() => {
    // Fetch lessons when courseID is available
    if (!courseID) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/lesson/getLessonByCourseID/${courseID}`);
        const lessonsWithID = response.data.map((lesson) => ({
          ...lesson,
          _id: lesson._id || 'default_id',
        }));
        setData(lessonsWithID);
        await loadCompletedLessons();
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu bài học:', error);
      }
    };

    fetchData();
  }, [courseID]);

  useEffect(() => {
    // Store completed lesson status when testIdDone is available
    const storeCompletedLesson = async () => {
      if (testIdDone) {
        try {
          const completedLessonsData = { ...completedLessons, [testIdDone]: true };
          await AsyncStorage.setItem('completedLessons', JSON.stringify(completedLessonsData));
          setCompletedLessons(completedLessonsData);
        } catch (error) {
          console.error('Error saving completed lesson', error);
        }
      }
    };
    storeCompletedLesson();
  }, [testIdDone]);

  const loadCompletedLessons = async () => {
    try {
      const storedCompletedLessons = await AsyncStorage.getItem('completedLessons');
      if (storedCompletedLessons) {
        setCompletedLessons(JSON.parse(storedCompletedLessons));
      }
    } catch (error) {
      console.error('Error loading completed lessons', error);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleDetailLesson = (_id) => {
    navigation.navigate('DetailLesson', { _id, userID, courseID });
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const refreshData = async () => {
    setRefreshing(true);
    try {
      const response = await axios.get(`${BASE_URL}/lesson/getLessonByCourseID/${courseID}`);
      const lessonsWithID = response.data.map((lesson) => ({
        ...lesson,
        _id: lesson._id || 'default_id',
      }));
      setData(lessonsWithID);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu bài học:', error);
    }
    setRefreshing(false);
  };

  const handleAddCertificate = () => {
    if (!courseID || !userID) {
      console.log('Missing courseID or userID');
      return; // Do nothing if courseID or userID is missing
    }
  
    console.log('courseID:', courseID); 
    console.log('userID:', userID);      
  
    // Make the API call to add the certificate
    axios.post(`${BASE_URL}/certificate/addcertificate/${userID}/${courseID}`)
      .then(response => {
        const message = response.status === 200 || response.status === 201
          ? 'Cấp chứng chỉ thành công!'
          : 'Có lỗi xảy ra khi thêm chứng chỉ.';
  
        console.log('Response Status:', response.status);  // Log the response status
  
        // Show a success or error Toast based on the API response
        Toast.show({
          type: response.status === 200 || response.status === 201 ? 'success' : 'error',
          position: 'bottom',
          text1: response.status === 200 || response.status === 201 ? 'Thành công' : 'Lỗi',
          text2: message,
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 30,
          text1Style: { fontSize: 18 },
          text2Style: { fontSize: 16, color: 'black' },
          onHide: () => {
            // Navigate to CourseScreen when the toast hides, sending courseIdDone instead of courseID
            if (response.status === 200 || response.status === 201) {
              navigation.navigate('Khóa học', {
                userID: userID,
                courseIdDone: courseID,  // Pass courseIdDone instead of courseID
              });
            }
          },
        });
      })
      .catch(error => {
        console.log('API Error:', error);  // Log the error if the API call fails
      });
  };
  
  const isAllCompleted = data.every((lesson) => completedLessons[lesson._id] === true);

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item, index }) => {
    const isCompleted = completedLessons[item._id] || false;

    return (
      <TouchableOpacity style={styles.columnItem} onPress={() => handleDetailLesson(item._id)}>
        <View style={styles.courseSection}>
          <View style={styles.number_container}>
            <Text style={styles.number}>{String(index + 1).padStart(2, '0')}</Text>
          </View>
          <View style={styles.column_text}>
            <Text style={styles.sectionTitle}>{item.title}</Text>
            <Text style={styles.sectionDay}>{item.updatedAt.split('T')[0]}</Text>
          </View>
          {isCompleted && (
            <Image source={require('../design/image/complete_icon.png')} />
          )}
        </View>
        <View style={styles.separator} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <Image source={require('../design/image/ic_back.png')} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Khóa Học - Bài Học</Text>
      </View>
  
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tìm kiếm..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <TouchableOpacity>
          <Image source={require('../design/image/ic_search.png')} style={styles.searchIcon} />
        </TouchableOpacity>
      </View>
  
      {data.length === 0 ? (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>Chưa có khóa học nào! Giảng viên sẽ cập nhật sau!</Text>
        </View>
      ) : (
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          style={styles.container_list}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refreshData} />
          }
        />
      )}
  
      <View style={styles.btnBottom}>
        <TouchableOpacity style={styles.btnNextLesson} onPress={handleAddCertificate}>
          <Text style={styles.txtNext}>Học bài tiếp theo</Text>
        </TouchableOpacity>
      </View>
  
      {/* Toast Container */}
      <Toast ref={Toast.setRef} />
    </View>
  );
  
};

export default MyCourseDetail;
