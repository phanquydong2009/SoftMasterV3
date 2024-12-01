import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, Image, StyleSheet, RefreshControl } from 'react-native';
import BASE_URL from './apiConfig';

const FollowTeacherCourse = ({ userID }) => {
    const [followingData, setFollowingData] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        fetchFollowedTeachers();
    }, [userID]);

    const fetchFollowedTeachers = async () => {
        try {
            setIsRefreshing(true); 
            const response = await fetch(`${BASE_URL}/followTeacher/getFollowed-teachers/${userID}`);
            const data = await response.json();
    
            if (data && data.length > 0) {
                const coursePromises = data.map(async teacher => {
                    // Kiểm tra tính hợp lệ của teacher và teacher._id
                    if (teacher && teacher._id) {
                        const courseResponse = await fetch(`${BASE_URL}/course/getCourseByTeacherID/${teacher._id}`);
                        const courseData = await courseResponse.json();
    
                        if (courseData && courseData.length > 0) {
                            const course = courseData[0];
                            return {
                                id: teacher._id,
                                image: course.img || 'link-to-default-image.png',  
                                name: course.name || 'Tên khóa học',
                                price: course.price || '0',
                                teacher_name: teacher.name || 'Tên giáo viên',
                                description: course.description || '',
                                describe: course.describe || '',
                                createdAt: course.createdAt || '',
                            };
                        }
                    }
                });
    
                const courses = await Promise.all(coursePromises);
                const validCourses = courses.filter(course => course !== undefined);
                validCourses.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
                setFollowingData(validCourses);
            }
        } catch (error) {
            console.error('Error fetching followed teachers:', error);
        } finally {
            setIsRefreshing(false);
        }
    };

    const renderItemFollow = ({ item }) => (
        <View style={styles.followItemContainer}>
            <View style={styles.row1}>
                <Image source={{ uri: item.image }} style={styles.followItemImage} />
                <View style={styles.followItemTextContainer}>
                    <Text style={styles.followItemName}>{item.name}</Text>
                    <Text style={styles.followItemPrice}>{item.price.toLocaleString('vi-VN')} VND</Text>
                    <Text style={styles.followItemTeacher} numberOfLines={1} ellipsizeMode="tail">{item.teacher_name}</Text>
                </View>
            </View>

            <Text style={styles.followItemDescription} numberOfLines={1} ellipsizeMode="tail">
                {item.describe}
            </Text>
        </View>
    );

    return (
        <View style={styles.containerItemF}>
            <Text style={styles.title}>Đang theo dõi</Text>
            {/* Kiểm tra dữ liệu và thay thế FlatList nếu không có dữ liệu */}
            {followingData.length === 0 ? (
                <Text style={styles.noFollowText}>Hãy follow một giáo viên bạn yêu thích để xem nổi bật!</Text>
            ) : (
                <FlatList
                    data={followingData}
                    renderItem={renderItemFollow}
                    keyExtractor={item => item.id}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.flatListContent}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={fetchFollowedTeachers}
                        />
                    }
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
   
    title: {
        fontFamily: "Mulish-ExtraBold",
        fontSize: 18,
        color: "black",
       
    },
    containerItemF: {
        flex: 1,
        marginBottom : 10
    },
    noFollowText: {
        fontSize: 13,
        color: "red",
        textAlign: 'center',
        fontFamily: "Mulish-ExtraBold",
        marginBottom : 20
    },
    flatListContent: {
        paddingHorizontal: 10,
    },
    followItemContainer: {
        width: 250,
        marginRight: 15,
        marginVertical: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 10,
    },
    row1: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    followItemImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 10,
    },
    followItemTextContainer: {
        flex: 1,
    },
    followItemName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "black",
    },
    followItemPrice: {
        fontFamily: "Mulish-ExtraBold",
        color: "#0961F5",
    },
    followItemTeacher: {
        fontFamily: "Mulish-ExtraBold",
        color: "#0961F5",
    },
    followItemDescription: {
        fontSize: 12,
        marginTop: 5,
        fontFamily: "Mulish-ExtraBold",
        color: "black",
        textAlign: 'justify',
    },
});

export default FollowTeacherCourse;