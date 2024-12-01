import React, { useRef, useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, Image, FlatList, Dimensions, ScrollView, RefreshControl } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import BASE_URL from '../component/apiConfig';
import styles from '../styles/HomeScreenStyles';
import FollowTeacherCourse from '../component/FollowTeacherCourse';

const { width } = Dimensions.get('window');

const images = [
    require('../design/image/slide1.jpg'),
    require('../design/image/slide2.jpg'),
    require('../design/image/slide3.png'),
    require('../design/image/slide4.jpg'),
    require('../design/image/slide5.jpg'),
];

const HomeScreen = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedCourse, setSelectedCourse] = useState('Tất cả');
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [subjects, setSubjects] = useState([]);
    const [cardData, setCardData] = useState([]);
    const [mentors, setMentors] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const flatListRef = useRef(null);
    const navigation = useNavigation();
    const route = useRoute();
    const { name, userID } = route.params || {};


    const toggleBookmark = () => {
        setIsBookmarked(!isBookmarked);
    };


    // gọi api các môn học
    const fetchSubjects = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/subject/getAll`);
            setSubjects(response.data.map(subject => subject.name));
        } catch (error) {
            console.error('lỗi lấy dữ liệu subjects:', error);
        }
    };

    // gọi api dữ liệu khóa học
    const fetchCourses = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/course/getAll`);

            // Log ra các id trong dữ liệu
            // response.data.forEach(course => {
            //     console.log(course._id);
            // });

            setCardData(response.data);
        } catch (error) {
            console.error('Lỗi lấy dữ liệu khóa học:', error);
        }
    };


    // gọi api dữ liệu giảng viên
    const fetchMentors = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/teacher/getLockedTeachers`);
            const mentorData = response.data.map(mentor => {
                return {
                    _id: mentor._id?.toString() || '',
                    avatar: mentor.avatar ? { uri: mentor.avatar } : require('../design/image/noprofile.png'),
                    name: mentor.name || 'Tên chưa xác định',
                };
            });
            setMentors(mentorData);
        } catch (error) {
            console.error('Lỗi lấy dữ liệu mentors:', error);
        }
    };


    // item giảng viên
    const renderMentorItem = ({ item }) => (
        <TouchableOpacity
            style={styles.mentorCard}
            onPress={() => handleMentorPress(item)}
        >
            <Image source={item.avatar} style={styles.mentorAvatar} />
            <Text style={styles.mentorName}>{item.name}</Text>
        </TouchableOpacity>
    );
    // chuyển item sang profileMentor
    const handleMentorPress = (mentor) => {
        console.log('Mentor ID:', mentor._id, 'User ID:', userID);
        navigation.navigate('ProfileMentor', { _id: mentor._id, userID });
    };


    const onRefresh = async () => {
        setRefreshing(true);
        await fetchSubjects();
        await fetchCourses();
        await fetchMentors();
        setRefreshing(false);
    };

    useEffect(() => {
        fetchSubjects();
        fetchCourses();
        fetchMentors();
    }, []);

    const handleViewAllMentor = () => {
        navigation.navigate('AllMentor', { userID });
    };

    const handleViewPopularCourses = () => {
        navigation.navigate('AllCourse', { userID });
    };

    const handleSearch = () => {
        navigation.navigate('Search', { userID });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (flatListRef.current) {
            flatListRef.current.scrollToIndex({ index: currentIndex, animated: true });
        }
    }, [currentIndex]);

    const handleViewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    const renderItem = ({ item }) => (
        <View style={styles.slide}>
            <Image source={item} style={styles.slideImage} />
        </View>
    );

    const dotSize = (index) => (index === currentIndex ? { width: 18, height: 8 } : { width: 8, height: 8 });

    const dotColor = (index) => (index === currentIndex ? '#FAC840' : '#1A6EFC');


    // item tên các môn học
    const renderCourseItem = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.courseItem,
                {
                    backgroundColor: item === selectedCourse ? '#2795FF' : '#E8F1FF',
                    borderRadius: 20,
                },
            ]}
            onPress={() => setSelectedCourse(item)}
        >
            <Text style={[styles.courseText, { color: item === selectedCourse ? '#FFFFFF' : '#202244' }]}>{item}</Text>
        </TouchableOpacity>
    );

    // khóa học tiêu biểu item
    const renderCardItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}

        >
            <Image source={{ uri: item.img }} style={styles.cardImage} />
            <View style={styles.bookmark}>
                <Text
                    style={styles.cardInstructor}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {item.name}
                </Text>
                <TouchableOpacity onPress={toggleBookmark}>
                    <Image
                        source={isBookmarked ? require('../design/image/ic_bookmark_active.png') : require('../design/image/ic_bookmark.png')}
                        style={styles.ic_bookmark}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.containerText}>
                <Text style={styles.cardInfo}>
                    Giá khóa học : {item.price.toLocaleString('vi-VN')} VND
                </Text>

                <Text numberOfLines={2} ellipsizeMode="tail" style={styles.describe}>
                    {item.describe}
                </Text>
            </View>
        </TouchableOpacity>
    );


    const getItemLayout = (data, index) => ({
        length: width,
        offset: width * index,
        index,
    });

    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
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
            {/* searchButton */}

            <View style={styles.searchContainer}>
                <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
                    <Image source={require('../design/image/ic_search.png')} style={styles.searchIcon} />

                    <Text style={styles.textInput}>
                        Tìm kiếm
                    </Text>
                </TouchableOpacity>
            </View>


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
            {/* <View style={styles.category}>
                <Text style={styles.title}>Môn học</Text>
                <TouchableOpacity style={styles.viewAllButton} onPress={handleViewAllCategory}>
                    <Text style={styles.viewAllText}>Xem tất cả</Text>
                </TouchableOpacity>
            </View> */}

            <View style={styles.popularCourses}>
                <Text style={styles.title}>Khóa học</Text>
                <TouchableOpacity style={styles.viewAllButton} onPress={handleViewPopularCourses}>
                    <Text style={styles.viewAllText}>Xem tất cả</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={subjects}
                renderItem={renderCourseItem}
                keyExtractor={(item) => `course-${item}`}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
            <View style={styles.cardsContainer}>
                <FlatList
                    data={cardData}
                    renderItem={renderCardItem}
                    keyExtractor={(item) => item.id ? `card-${item.id}` : `card-${Math.random().toString(36).substr(2, 9)}`}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            <View style={styles.mentors_container}>
                <Text style={styles.title}>Giảng viên</Text>
                <TouchableOpacity style={styles.viewAllButton} onPress={handleViewAllMentor}>
                    <Text style={styles.viewAllText}>Xem tất cả</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={mentors}
                renderItem={renderMentorItem}
                keyExtractor={(item, index) => `mentor-${item.id}-${index}`}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.viewMentor}
            />


            <FollowTeacherCourse userID={userID} />

        </ScrollView>
    );
};
export default HomeScreen;