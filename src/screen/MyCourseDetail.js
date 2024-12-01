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
import BASE_URL from '../component/apiConfig';
import styles from '../styles/MyCourseDetailScreenStyles';

const MyCourseDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { courseID, userID } = route.params || {};
  const { initialTestIdDone } = route.params || {};

  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [testIdDone, setTestIdDone] = useState(new Set(initialTestIdDone || []));

  useEffect(() => {
    if (!courseID) return;

    const fetchData = async () => {
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
    };

    fetchData();
  }, [courseID]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleDetailLesson = (_id) => {
    // Đánh dấu bài học là hoàn thành khi chuyển tới chi tiết
    setTestIdDone((prev) => new Set(prev).add(_id));
    navigation.navigate('DetailLesson', { _id, userID, courseID });
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const handleAddCertificate = async () => {
    if (!courseID || !userID) {
      setMessage(`Không thể thêm chứng chỉ: courseID = ${courseID}, userID = ${userID}`);
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/certificate/addcertificate/${userID}/${courseID}`);

      if (response.status === 200 || response.status === 201) {
        console.log('Thêm chứng chỉ thành công:', response.data);
        setMessage(response.data.message || 'Chứng chỉ đã được thêm thành công!');
      } else {
        console.error('Thêm chứng chỉ thất bại:', response.data);
        setMessage(response.data.message || 'Có lỗi xảy ra khi thêm chứng chỉ.');
      }
    } catch (error) {
      console.error('Lỗi khi gọi API thêm chứng chỉ:', error);
      setMessage('Không thể thêm chứng chỉ. Vui lòng thử lại sau.');
    }
  };

  const isAllCompleted = data.every((lesson) => testIdDone.has(lesson._id));

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item, index }) => {
    const isCompleted = testIdDone.has(item._id);

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
          {isCompleted && <Image source={require('../design/image/complete_icon.png')} />}
        </View>
        <View style={styles.separator} />
      </TouchableOpacity>
    );
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
          <Image
            source={require('../design/image/ic_search.png')}
            style={styles.searchIcon}
          />
        </TouchableOpacity>
      </View>

      {filteredData.length === 0 ? (
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
            <RefreshControl
              refreshing={refreshing}
              onRefresh={refreshData}
            />
          }
        />
      )}

      {message && (
        <View style={styles.errorTextContainer}>
          <Text style={styles.errorText}>{message}</Text>
        </View>
      )}

      {isAllCompleted && (
        <View style={styles.btnBottom}>
          <TouchableOpacity style={styles.btnNextLesson} onPress={handleAddCertificate}>
            <Text style={styles.txtNext}>Học bài tiếp theo</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default MyCourseDetail;
