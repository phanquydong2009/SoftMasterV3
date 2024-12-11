import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Text, View, Image, RefreshControl } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from '../styles/HomeScreenStyles';
import FollowTeacherCourse from '../component/FollowTeacherCourse';
import TopCourse from '../component/TopCourse';
import ListTeacher from '../component/ListTeacher';
import Slider from '../component/Slider';
import Notification from '../component/Notification';

const HomeScreen = () => {
    const [refreshing, setRefreshing] = useState(false);

    const navigation = useNavigation();
    const route = useRoute();
    const { name, userID } = route.params || {};

    // Handle pull-to-refresh
    const onRefresh = async () => {
        setRefreshing(true);
        // Add any necessary refresh logic here
        setRefreshing(false);
    };

    const handleViewAllMentor = () => {
        navigation.navigate('AllMentor', { userID });
    };

    const handleViewPopularCourses = () => {
        navigation.navigate('AllCourse', { userID });
    };

    const handleSearch = () => {
        navigation.navigate('Search', { userID });
    };

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
