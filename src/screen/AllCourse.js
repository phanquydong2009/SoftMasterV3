import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'; 
import BASE_URL from '../component/apiConfig';
import styles from '../styles/PopularCoursesStyles';

const PopularCourses = () => {
    const navigation = useNavigation();
    const route = useRoute(); 
    const { userID, courseName } = route.params;
    const [activeCourse, setActiveCourse] = useState(courseName || 'Tất cả'); 
    const [activeBookmarks, setActiveBookmarks] = useState({}); 
    const [courses, setCourses] = useState([]); 
    const [courseDetails, setCourseDetails] = useState([]); 
    const [refreshing, setRefreshing] = useState(false); // Thêm trạng thái để refresh màn hình

    // Hàm lấy danh sách các môn học
    const fetchCourses = async () => {
        try {
            const response = await fetch(`${BASE_URL}/subject/getAll`);
            const data = await response.json();
            setCourses([{ _id: null, name: 'Tất cả' }, ...data]); // Thêm mục "Tất cả" vào đầu danh sách
        } catch (error) {
            console.error('Lỗi khi lấy danh sách môn học:', error);
        }
    };

    // Hàm lấy chi tiết khóa học theo môn học
    const fetchCourseDetails = async () => {
        try {
            let response;
            if (activeCourse === 'Tất cả') {
                response = await fetch(`${BASE_URL}/course/getAll`);
            } else {
                const subject = courses.find(course => course.name === activeCourse);
                if (subject) {
                    response = await fetch(`${BASE_URL}/course/getCourseBySubjectID/${subject._id}`);
                }
            }
    
            if (response) {
                const data = await response.json();
                // Sắp xếp dữ liệu theo `createdAt` giảm dần
                const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setCourseDetails(sortedData);
            }
        } catch (error) {
            console.error('Lỗi khi lấy chi tiết khóa học:', error);
        }
    };
    

    // UseEffect để fetch danh sách môn học và chi tiết khóa học
    useEffect(() => {
        fetchCourses();
    }, []);

    useEffect(() => {
        fetchCourseDetails();
    }, [activeCourse, courses]);

    // Hàm xử lý khi kéo để làm mới (pull-to-refresh)
    const onRefresh = async () => {
        setRefreshing(true);
        await fetchCourses(); 
        await fetchCourseDetails();
        setRefreshing(false); 
    };

    // Hàm xử lý quay lại trang trước
    const handleBack = () => {
        navigation.goBack();
    };

    // Hàm xử lý thay đổi trạng thái bookmark
    const handleBookmarkToggle = (id) => {
        setActiveBookmarks(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    // Render mỗi item môn học (scroll ngang)
    const renderCourseItem = ({ item }) => {
        const isActive = item.name === activeCourse; 
        return (
            <TouchableOpacity
                style={[styles.courseItem, { backgroundColor: isActive ? '#167F71' : '#E8F1FF' }]}
                onPress={() => setActiveCourse(item.name)} 
            >
                <Text style={[styles.courseText, { color: isActive ? '#FFFFFF' : '#202244' }]}>
                    {item.name}
                </Text>
            </TouchableOpacity>
        );
    };

    // Render chi tiết khóa học
    const renderDetailItem = ({ item }) => {
        const isBookmarked = activeBookmarks[item._id]; 
        const handleDetail = () => {
            console.log("courseId:", item._id, "userID:", userID);
            navigation.navigate('Detail', { courseId: item._id, userID });
        };

        return (
            <TouchableOpacity onPress={handleDetail} style={styles.detailItem}>
                <Image source={{ uri: item.img }} style={styles.detailImage} />
                <View style={styles.detailContent}>
                    <View style={styles.bookmark}>
                        <Text style={styles.detailNameCourse} numberOfLines={1} ellipsizeMode='tail'>
                            {item.name}
                        </Text>
                        <TouchableOpacity onPress={() => handleBookmarkToggle(item._id)}>
                            <Image
                                source={isBookmarked
                                    ? require('../design/image/ic_bookmark_active.png')
                                    : require('../design/image/ic_bookmark.png')}
                                style={styles.bookmarkIcon}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.detailDescription} numberOfLines={2} ellipsizeMode='tail'>
                        {item.describe}
                    </Text>
                    <Text style={styles.detailPrice}>
                        Giá: {item.price.toLocaleString('vi-VN')} VND
                    </Text>
                    <Text style={styles.detailCreatedAt}>
                        Ngày tạo: {new Date(item.createdAt).toLocaleDateString()}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack}>
                    <Image source={require("../design/image/ic_back.png")} style={styles.imgBack} />
                </TouchableOpacity>
                <Text style={styles.txtHeader}>Tất cả khóa học</Text>
            </View>

            <View style={styles.flatListWrapper}>
                <FlatList
                    data={courses}
                    renderItem={renderCourseItem}
                    keyExtractor={(item) => item._id ? item._id.toString() : item.name} 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.flatListContainer}
                />
            </View>

            <View style={styles.detailsWrapper}>
                <FlatList
                    data={courseDetails}
                    renderItem={renderDetailItem}
                    keyExtractor={(item) => item._id.toString()}
                    contentContainerStyle={styles.detailsContainer}
                    refreshing={refreshing}
                    onRefresh={onRefresh} 
                    showsVerticalScrollIndicator={false} 
                />
            </View>
        </View>
    );
};

export default PopularCourses;