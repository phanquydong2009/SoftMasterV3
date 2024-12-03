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
  const { userID ,courseIdDone} = route.params;
  const [selected, setSelected] = useState(1);
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false); 
  const navigation = useNavigation();
 console.log('Dữ liệu nhận : ', userID ,courseIdDone)
  // Đưa fetchCourses ra ngoài useEffect và sử dụng useCallback để tránh tạo lại function không cần thiết
  const fetchCourses = useCallback(async () => {
    try {
      // Gọi API lấy danh sách khóa học mà người dùng đã đăng ký
      const response = await axios.get(
        `${BASE_URL}/enrollCourse/getCourseUserEnrolled/${userID}`
      );
      const enrolledCourses = response.data;

      // Lấy chi tiết cho từng khóa học
      const courseDetails = await Promise.all(
        enrolledCourses.map(async (course) => {
          const courseDetailURL = `${BASE_URL}/course/getDetailByCourseID/${course.courseID._id}`;
          // console.log("Lấy chi tiết cho courseID:", course.courseID._id); 
          const courseDetailResponse = await axios.get(courseDetailURL);
          return {
            ...courseDetailResponse.data,
            progress: 'Chưa bắt đầu',
            progressWidth: '0%',
            status: 'đang thực hiện',
          };
        })
      );
      setCourses(courseDetails);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu khóa học:', error);
    }
  }, [userID]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

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

  // Hàm lọc khóa học theo từ khóa tìm kiếm
  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  // Lọc dữ liệu dựa vào trạng thái của khóa học và từ khóa tìm kiếm
  const filteredData = courses.filter((item) => {
    const matchStatus = item.status === (selected === 1 ? 'hoàn thành' : 'đang thực hiện');
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  // Hàm gọi lại khi kéo xuống để làm mới dữ liệu
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchCourses(); // Lại gọi API để lấy lại dữ liệu
    setRefreshing(false);
  };

  const renderItem = ({ item }) => {
    // Hàm này trả về màu sắc cho thanh tiến trình tùy theo % hoàn thành
    const getProgressBarColor = (width) => {
      const progress = parseFloat(width);
      if (progress < 50) {
        return '#FCCB40'; // Màu vàng
      } else if (progress >= 50 && progress <= 80) {
        return '#FF6B00'; // Màu cam
      } else {
        return '#167F71'; // Màu xanh
      }
    };

    // Kiểm tra nếu khóa học đang trong tình trạng "đang thực hiện" thì cho phép bấm vào để xem chi tiết
    const Wrapper = item.status === 'đang thực hiện' ? TouchableOpacity : View;

    return (
      <Wrapper
        style={styles.viewFlatlist}
        onPress={item.status === 'đang thực hiện' ? () => handleViewCourseDetail(item._id) : undefined}
      >
        <Image source={{ uri: item.img }} style={styles.image} />

        {item.status === 'hoàn thành' && (
          <Image
            source={require('../design/image/complete_icon.png')}
            style={styles.completeIcon}
          />
        )}

        <View style={styles.content}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.description} numberOfLines={1} ellipsizeMode="tail">
            {item.describe}
          </Text>

          {item.status === 'hoàn thành' ? (
            <TouchableOpacity style={styles.certificateButton} onPress={handleViewCert}>
              <Text style={styles.certificateButtonText}>XEM CHỨNG CHỈ</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.progressContainer}>
              <View style={styles.progressBarBackground}>
                <View
                  style={[
                    styles.progressBar,
                    {
                      width: item.progressWidth,
                      backgroundColor: getProgressBarColor(item.progressWidth),
                    }
                  ]} />
              </View>
              <Text style={styles.progressText}>{item.progress}</Text>
            </View>
          )}
        </View>
      </Wrapper>
    );
  };

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
          onChangeText={handleSearch} // Cập nhật searchQuery khi người dùng nhập
        />
        <TouchableOpacity>
          <Image
            source={require('../design/image/icon_search.png')}
            style={styles.searchIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.viewDonePending}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: selected === 1 ? '#167F71' : '#E8F1FF' }]}
          onPress={() => handlePress(1)}
        >
          <Text style={[styles.buttonText, { color: selected === 1 ? '#FFF' : '#202244' }]} >
            Hoàn thành
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: selected === 2 ? '#167F71' : '#E8F1FF' }]}
          onPress={() => handlePress(2)}
        >
          <Text style={[styles.buttonText, { color: selected === 2 ? '#FFF' : '#202244' }]} >
            Đang thực hiện
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.flatListContainer}>
        <FlatList
          data={filteredData.reverse()}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing} // Điều chỉnh trạng thái refresh
          onRefresh={onRefresh} // Gọi lại khi kéo xuống
        />
      </View>
    </View>
  );
};

export default CourseScreen;
