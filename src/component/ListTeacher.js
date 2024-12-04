// ListTeacher.js

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import axios from 'axios';
import BASE_URL from '../component/apiConfig';
import styles from '../styles/HomeScreenStyles';
import { useNavigation } from '@react-navigation/native';

const ListTeacher = ({ userID }) => {
    const [mentors, setMentors] = useState([]);
    const navigation = useNavigation();

    // Fetch data for mentors
    const fetchMentors = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/teacher/getLockedTeachers`);
            const mentorData = response.data.map(mentor => ({
                _id: mentor._id?.toString() || '',
                avatar: mentor.avatar ? { uri: mentor.avatar } : require('../design/image/noprofile.png'),
                name: mentor.name || 'Tên chưa xác định',
            }));
            setMentors(mentorData);
        } catch (error) {
            console.error('Lỗi lấy dữ liệu mentors:', error);
        }
    };

    useEffect(() => {
        fetchMentors();
    }, []);

    // Render mentor item
    const renderMentorItem = ({ item }) => (
        <TouchableOpacity
            style={styles.mentorCard}
            onPress={() => handleMentorPress(item)}
        >
            <Image source={item.avatar} style={styles.mentorAvatar} />
            <Text style={styles.mentorName}>{item.name}</Text>
        </TouchableOpacity>
    );

    // Navigate to ProfileMentor screen
    const handleMentorPress = (mentor) => {
        navigation.navigate('ProfileMentor', { _id: mentor._id, userID });
    };

    return (


        <FlatList
            data={mentors}
            renderItem={renderMentorItem}
            keyExtractor={(item) => `mentor-${item._id}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.viewMentor}
        />

    );
};

export default ListTeacher;
