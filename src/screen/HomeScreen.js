import React, { useRef, useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, Image, FlatList, Dimensions, ScrollView, RefreshControl } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import BASE_URL from '../component/apiConfig';
import styles from '../styles/HomeScreenStyles';
import FollowTeacherCourse from '../component/FollowTeacherCourse';
import TopCourse from '../component/TopCourse';
import ListTeacher from '../component/ListTeacher';

const { width } = Dimensions.get('window');

// Danh sách hình ảnh cho slider
const images = [
    require('../design/image/slide1.jpg'),
    require('../design/image/slide2.jpg'),
    require('../design/image/slide3.png'),
    require('../design/image/slide4.jpg'),
    require('../design/image/slide5.jpg'),
];

const HomeScreen = () => {
    const [currentIndex, setCurrentIndex] = useState(0); // Index của hình ảnh slider hiện tại
    const [selectedCourse, setSelectedCourse] = useState('Tất cả'); // Môn học đang được chọn
    const [subjects, setSubjects] = useState([]); // Danh sách các môn học
    const [refreshing, setRefreshing] = useState(false); // Trạng thái refresh
    const flatListRef = useRef(null);
    const navigation = useNavigation();
    const route = useRoute();
    const { name, userID } = route.params || {};

  

    // Hàm lấy danh sách các môn học từ API
    const fetchSubjects = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/subject/getAll`);
            setSubjects(response.data.map(subject => subject.name)); // Lưu tên các môn học vào state
        } catch (error) {
            console.error('Lỗi lấy dữ liệu subjects:', error);
        }
    };

    // Hàm xử lý khi kéo xuống để refresh
    const onRefresh = async () => {
        setRefreshing(true);
        await fetchSubjects(); // Tải lại danh sách môn học
        setRefreshing(false);
    };

    useEffect(() => {
        fetchSubjects(); // Lấy dữ liệu môn học khi màn hình được load lần đầu
    }, []);

    // Hàm điều hướng đến màn hình tất cả giảng viên
    const handleViewAllMentor = () => {
        navigation.navigate('AllMentor', { userID });
    };

    // Hàm điều hướng đến màn hình tất cả khóa học
    const handleViewPopularCourses = () => {
        navigation.navigate('AllCourse', { userID });
    };

    // Hàm điều hướng đến màn hình tìm kiếm
    const handleSearch = () => {
        navigation.navigate('Search', { userID });
    };

    // Cập nhật index của slider mỗi 2 giây
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2000);
        return () => clearInterval(interval); // Xoá interval khi component bị unmount
    }, []);

    // Cuộn đến hình ảnh mới khi index thay đổi
    useEffect(() => {
        if (flatListRef.current) {
            flatListRef.current.scrollToIndex({ index: currentIndex, animated: true });
        }
    }, [currentIndex]);

    // Hàm để thay đổi index khi hình ảnh trong slider được viewable
    const handleViewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index); // Cập nhật index khi thay đổi hình ảnh
        }
    }).current;

    // Hàm render mỗi item trong slider
    const renderItem = ({ item }) => (
        <View style={styles.slide}>
            <Image source={item} style={styles.slideImage} />
        </View>
    );

    // Hàm xác định kích thước của dot trong slider
    const dotSize = (index) => (index === currentIndex ? { width: 18, height: 8 } : { width: 8, height: 8 });

    // Hàm xác định màu sắc của dot trong slider
    const dotColor = (index) => (index === currentIndex ? '#FAC840' : '#1A6EFC');

    // Hàm render mỗi item trong danh sách môn học
    const renderCourseItem = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.courseItem,
                {
                    backgroundColor: item === selectedCourse ? '#2795FF' : '#E8F1FF',
                    borderRadius: 20,
                },
            ]}
            onPress={() => setSelectedCourse(item)} // Cập nhật môn học khi chọn
        >
            <Text style={[styles.courseText, { color: item === selectedCourse ? '#FFFFFF' : '#202244' }]}>{item}</Text>
        </TouchableOpacity>
    );

    // Xác định layout cho mỗi item trong FlatList slider
    const getItemLayout = (data, index) => ({
        length: width,
        offset: width * index,
        index,
    });

    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} // Kéo để refresh
        >
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.header1}>
                    <View style={styles.welcome_container}>
                        <Text style={styles.txtHi}>Xin chào, </Text>
                        <Text style={styles.txtName}>{name}!</Text>
                    </View>
                    <Text style={styles.txtFind}>Bạn muốn học gì hôm nay?</Text>
                </View>
                <View style={styles.header2}>
                    <TouchableOpacity style={styles.btn_noti}>
                        <Image source={require('../design/image/ic_notification.png')} style={styles.img_btn_noti} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Search Button */}
            <View style={styles.searchContainer}>
                <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
                    <Image source={require('../design/image/ic_search.png')} style={styles.searchIcon} />
                    <Text style={styles.textInput}>Tìm kiếm</Text>
                </TouchableOpacity>
            </View>

            {/* Slider */}
            <View style={styles.slide_container}>
                <FlatList
                    ref={flatListRef}
                    data={images}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => `image-${index}`}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onViewableItemsChanged={handleViewableItemsChanged}
                    getItemLayout={getItemLayout}
                />
                <View style={styles.dotContainer}>
                    {images.map((_, index) => (
                        <View
                            key={index}
                            style={[styles.dot, dotSize(index), { backgroundColor: dotColor(index) }]}
                        />
                    ))}
                </View>
            </View>

            {/* danh sách môn học  */}
            <FlatList
                data={subjects}
                renderItem={renderCourseItem}
                keyExtractor={(item) => `course-${item}`}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.ListSuject}
            />
            {/* Môn học */}
            <View style={styles.popularCourses}>
                <Text style={styles.title}>Khóa học</Text>
                <TouchableOpacity style={styles.viewAllButton} onPress={handleViewPopularCourses}>
                    <Text style={styles.viewAllText}>Xem tất cả</Text>
                </TouchableOpacity>
            </View>
            {/* Top khóa học */}
            <TopCourse userID={userID} />

            {/* Giảng viên */}
            <View style={styles.mentors_container}>
                <Text style={styles.title}>Giảng viên</Text>
                <TouchableOpacity style={styles.viewAllButton} onPress={handleViewAllMentor}>
                    <Text style={styles.viewAllText}>Xem tất cả</Text>
                </TouchableOpacity>
            </View>
            <ListTeacher userID={userID} />

            {/* Khóa học theo giảng viên */}
            <FollowTeacherCourse userID={userID} />
        </ScrollView>
    );
};

export default HomeScreen;
