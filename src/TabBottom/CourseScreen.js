import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import styles from '../stylesTabBottom/CourseScreenStyles';
import BASE_URL from '../component/apiConfig';

const CourseScreen = ({ route }) => {
  const { userID } = route.params;
  const [selected, setSelected] = useState(2);
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [courseIdDone, setCourseIdDone] = useState([]);
  const navigation = useNavigation();

  // Hàm gọi API lấy danh sách chứng chỉ của người dùng
  const fetchCertificates = useCallback(async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/certificate/getbyuserID/${userID}`
      );
      const certificates = response.data.certificates;
      const completedCourseIds = certificates.map(
        (certificate) => certificate.courseID._id
      );
      setCourseIdDone(completedCourseIds);
    } catch (error) {

    }
  }, [userID]);

  // Hàm gọi API lấy danh sách khóa học
  const fetchCourses = useCallback(async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/enrollCourse/getCourseUserEnrolled/${userID}`
      );
      const enrolledCourses = response.data;
  
      const courseDetails = await Promise.all(
        enrolledCourses.map(async (course) => {
          if (course.courseID) {
            const courseDetailURL = `${BASE_URL}/course/getDetailByCourseID/${course.courseID._id}`;
            const courseDetailResponse = await axios.get(courseDetailURL);
            return {
              ...courseDetailResponse.data,
              progress: 'Chưa bắt đầu',
              progressWidth: '0%',
              status: 'đang thực hiện',
              isCompleted: courseIdDone.includes(course.courseID._id),
              createdAt: courseDetailResponse.data.createdAt,
            };
          } else {
            return null; 
          }
        })
      );
  
      // Sắp xếp theo `createdAt` tăng dần
      const sortedCourses = courseDetails
        .filter((course) => course !== null)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
      setCourses(sortedCourses);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu khóa học:', error);
    }
  }, [userID, courseIdDone]);
  
  
  useEffect(() => {
    fetchCertificates().then(fetchCourses); // Gọi fetchCourses sau khi lấy danh sách chứng chỉ
  }, [fetchCertificates, fetchCourses]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handlePress = (buttonId) => {
    setSelected(buttonId);
  };

  const handleViewCert = () => {
    navigation.navigate('Cert');
  };

  const handleViewCourseDetail = (courseID) => {
    navigation.navigate('MyCourseDetail', { courseID, userID });
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const filteredData = courses.filter((item) => {
    const matchStatus =
      item.status === (selected === 1 ? 'hoàn thành' : 'đang thực hiện');
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchCertificates();
    await fetchCourses();
    setRefreshing(false);
  };

  const renderItem = ({ item }) => {
    const getProgressBarColor = (width) => {
      const progress = parseFloat(width);
      return progress < 50 ? '#FCCB40' : '#167F71';
    };

    const Wrapper =
      item.status === 'đang thực hiện' || item.status === 'hoàn thành'
        ? TouchableOpacity
        : View;

    const progressWidth = item.isCompleted ? '100%' : item.progressWidth;
    const progressStatus = item.isCompleted
      ? 'Hoàn thành'
      : item.status === 'đang thực hiện'
        ? 'Chưa hoàn thành'
        : item.progress;

    return (
      <Wrapper
        style={styles.viewFlatlist}
        onPress={
          item.status === 'đang thực hiện' || item.status === 'hoàn thành'
            ? () => handleViewCourseDetail(item._id)
            : undefined
        }
      >
        <Image source={{ uri: item.img }} style={styles.image} />

        {item.isCompleted && (
          <Image
            source={require('../design/image/complete_icon.png')}
            style={styles.completeIcon}
          />
        )}

        <View style={styles.content}>
          <Text style={styles.title}>{item.name}</Text>
          <Text
            style={styles.description}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.describe}
          </Text>

          {item.status === 'hoàn thành' ? (
            <TouchableOpacity
              style={styles.certificateButton}
              onPress={handleViewCert}
            >
              <Text style={styles.certificateButtonText}>XEM CHỨNG CHỈ</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.progressContainer}>
              <View style={styles.progressBarBackground}>
                <View
                  style={[
                    styles.progressBar,
                    {
                      width: progressWidth,
                      backgroundColor: getProgressBarColor(progressWidth),
                    },
                  ]}
                />
              </View>
              <Text style={styles.progressText}>{progressStatus}</Text>
            </View>
          )}
        </View>
      </Wrapper>
    );
  };

  const completedCourses = courses.filter((course) => course.isCompleted);
  const inProgressCourses = courses.filter((course) => !course.isCompleted);

  return (
    <View style={styles.container}>
      <View style={styles.viewHeader}>
        <TouchableOpacity onPress={handleGoBack}>
          <Image source={require('../design/image/ic_back.png')} />
        </TouchableOpacity>
        <Text style={styles.viewTextHeader}>Khóa học của tôi</Text>
      </View>
      <View style={styles.viewInput}>
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
      <View style={styles.viewDonePending}>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: selected === 2 ? '#167F71' : '#E8F1FF' },
          ]}
          onPress={() => handlePress(2)}
        >
          <Text
            style={[
              styles.buttonText,
              { color: selected === 2 ? '#FFF' : '#202244' },
            ]}
          >
            Đang thực hiện
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: selected === 1 ? '#167F71' : '#E8F1FF' },
          ]}
          onPress={() => handlePress(1)}
        >
          <Text
            style={[
              styles.buttonText,
              { color: selected === 1 ? '#FFF' : '#202244' },
            ]}
          >
            Hoàn thành
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.flatListContainer}>
        <FlatList
          data={selected === 1 ? completedCourses : inProgressCourses}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      </View>
    </View>
  );
};

export default CourseScreen;
