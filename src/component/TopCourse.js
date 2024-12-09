import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, Image, Text, View, RefreshControl } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import BASE_URL from '../component/apiConfig';
import styles from '../styles/HomeScreenStyles';

const TopCourse = ({ userID }) => {
    const [cardData, setCardData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation();

    // Gọi API dữ liệu khóa học
    const fetchCourses = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/payment/top-selling-courses`);
            const courses = response.data.map(item => item.courseDetails);
            setCardData(courses);
        } catch (error) {
            console.error('Lỗi lấy dữ liệu khóa học:', error);
        }
    };

    // Hàm thực hiện làm mới
    const onRefresh = async () => {
        setRefreshing(true);
        await fetchCourses();
        setRefreshing(false);
    };

    useEffect(() => {
        fetchCourses(); // Lấy dữ liệu khóa học khi component được render
    }, []);

    // Hàm tách riêng để điều hướng
    const handleItemPress = (courseId) => {
        navigation.navigate('Detail', {
            courseId,
            userID,
        });
    };

    // Khóa học tiêu biểu item
    const renderCardItem = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => handleItemPress(item._id)}>
            {/* Hiển thị ảnh */}
            <Image source={{ uri: item.img }} style={styles.cardImage} />

            <View style={styles.bookmark}>
                {/* Hiển thị tên khóa học */}
                <Text style={styles.cardInstructor} numberOfLines={1} ellipsizeMode="tail">
                    {item.name}
                </Text>
                <TouchableOpacity onPress={() => console.log('Bookmark toggled')}>
                    <Image
                        source={require('../design/image/ic_bookmark.png')}
                        style={styles.ic_bookmark}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.containerText}>
                {/* Hiển thị giá khóa học */}
                <Text style={styles.cardInfo}>
                    Giá khóa học: {item.price.toLocaleString('vi-VN')} VND
                </Text>

                {/* Hiển thị mô tả khóa học */}
                <Text numberOfLines={4} ellipsizeMode="tail" style={styles.describe}>
                    {item.describe}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={cardData}
            renderItem={renderCardItem}
            keyExtractor={(item) => item._id || `card-${Math.random().toString(36).substr(2, 9)}`} // Sử dụng _id làm key
            horizontal
            showsHorizontalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
        />
    );
};

export default TopCourse;
