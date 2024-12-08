import React, { useState, useEffect } from 'react';
import { ScrollView, FlatList, TouchableOpacity, Text, View, Image, RefreshControl } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import BASE_URL from '../component/apiConfig';
import styles from '../styles/HomeScreenStyles';
import FollowTeacherCourse from '../component/FollowTeacherCourse';
import TopCourse from '../component/TopCourse';
import ListTeacher from '../component/ListTeacher';
import Slider from '../component/Slider';
import Notification from '../component/Notification';

const HomeScreen = () => {
    const [selectedCourse, setSelectedCourse] = useState('Tất cả');
    const [subjects, setSubjects] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const navigation = useNavigation();
    const route = useRoute();
    const { name, userID } = route.params || {};

    // Fetch subjects
    const fetchSubjects = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/subject/getAll`);
            setSubjects(response.data.map(subject => subject.name));
        } catch (error) {
            console.error('Error fetching subjects:', error);
        }
    };

    // Handle pull-to-refresh
    const onRefresh = async () => {
        setRefreshing(true);
        await fetchSubjects();
        setRefreshing(false);
    };

    useEffect(() => {
        fetchSubjects();
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

    // Render course items in FlatList
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

    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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

                {/* Notifications */}
                <Notification userID={userID} refreshing={refreshing} onRefresh={onRefresh} />


            </View>
            {/* Search Button */}
            <View style={styles.searchContainer}>
                <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
                    <Image source={require('../design/image/ic_search.png')} style={styles.searchIcon} />
                    <Text style={styles.textInput}>Tìm kiếm</Text>
                </TouchableOpacity>
            </View>
            {/* Slider */}
            <Slider />

            {/* Subject List */}
            <FlatList
                data={subjects}
                renderItem={renderCourseItem}
                keyExtractor={(item) => `course-${item}`}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.ListSuject}
            />

            {/* Popular Courses */}
            <View style={styles.popularCourses}>
                <Text style={styles.title}>Khóa học</Text>
                <TouchableOpacity style={styles.viewAllButton} onPress={handleViewPopularCourses}>
                    <Text style={styles.viewAllText}>Xem tất cả</Text>
                </TouchableOpacity>
            </View>
            <TopCourse userID={userID} refreshing={refreshing} onRefresh={onRefresh} />

            {/* Mentors */}
            <View style={styles.mentors_container}>
                <Text style={styles.title}>Giảng viên</Text>
                <TouchableOpacity style={styles.viewAllButton} onPress={handleViewAllMentor}>
                    <Text style={styles.viewAllText}>Xem tất cả</Text>
                </TouchableOpacity>
            </View>
            <ListTeacher userID={userID} refreshing={refreshing} onRefresh={onRefresh} />

            {/* Follow Teacher Courses */}
            <FollowTeacherCourse userID={userID} refreshing={refreshing} onRefresh={onRefresh} />
        </ScrollView>
    );
};

export default HomeScreen;
