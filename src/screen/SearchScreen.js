import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import BASE_URL from '../component/apiConfig';
import styles from '../styles/SearchScreenStyles';

const SearchScreen = () => {
    const navigation = useNavigation();
    const route = useRoute(); 
    const { userID } = route.params; 
    const [name, setName] = useState('');
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleBack = () => navigation.goBack();

    const fetchSearchCourses = async () => {
        if (!name.trim()) {
            setCourses([]);
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/course/search`, { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name }),
            });

            if (response.ok) {
                const data = await response.json();
                setCourses(data.length > 0 ? data : []);  
            } else {
                console.error('Network response was not ok', response.status);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(fetchSearchCourses, 500);
        return () => clearTimeout(timer);
    }, [name]);

    const handleCourseSelect = (courseId) => {
        // Log 
        console.log("CourseId truyền đi là: ", courseId);

        // truyền courseId and userId đến 'detail' screen
        navigation.navigate('Detail', { courseId, userID });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleCourseSelect(item._id)} style={styles.itemContainer}>
            <Image source={{ uri: item.img }} style={styles.itemImage} />
            <Text style={styles.itemName}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack}>
                    <Image source={require("../design/image/ic_back.png")} style={styles.imgBack} />
                </TouchableOpacity>
                <Text style={styles.txtHeader}>Tìm kiếm</Text>
            </View>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Tìm kiếm"
                    placeholderTextColor="#545454"
                    value={name}
                    onChangeText={setName}
                />
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                courses.length > 0 ? (
                    <FlatList
                        data={courses}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                ) : (
                    <Text style={styles.noResultsText}>Không tìm thấy kết quả</Text>
                )
            )}
        </View>
    );
};

export default SearchScreen;
