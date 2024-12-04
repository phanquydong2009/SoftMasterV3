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

    // Lịch sử tìm kiếm tĩnh
    const [searchHistory, setSearchHistory] = useState([
        { id: '1', name: 'Kỹ' },
        { id: '2', name: 'test' },
        { id: '3', name: 'h' },
    ]);

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
                console.error('Phản hồi từ mạng không ổn', response.status);
            }
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(fetchSearchCourses, 500);
        return () => clearTimeout(timer);
    }, [name]);

    const handleCourseSelect = (courseId) => {
        console.log("CourseId truyền đi là: ", courseId);
        navigation.navigate('Detail', { courseId, userID });
    };

    const handleSearchHistorySelect = (item) => {
        setName(item.name); // Đặt tên lịch sử tìm kiếm đã chọn làm văn bản đầu vào
        setCourses([]); // Xóa kết quả tìm kiếm trước đó
    };

    const handleDeleteHistory = (id) => {
        const updatedHistory = searchHistory.filter(item => item.id !== id);
        setSearchHistory(updatedHistory); // Xóa item đã chọn khỏi lịch sử
    };

    const clearSearchHistory = () => {
        setSearchHistory([]); // Xóa toàn bộ lịch sử tìm kiếm
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleCourseSelect(item._id)} style={styles.itemContainer}>
            <Image source={{ uri: item.img }} style={styles.itemImage} />
            <Text style={styles.itemName}>{item.name}</Text>
        </TouchableOpacity>
    );

    const renderHistoryItem = ({ item }) => (
        <View style={styles.historyItemContainer}>
            <TouchableOpacity onPress={() => handleSearchHistorySelect(item)} style={styles.historyItemTextContainer}>
                <Text style={styles.historyItemText}>{item.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteHistory(item.id)} style={styles.deleteButton}>
                <Image source={require('../design/image/ic_clear.png')} style={styles.deleteIcon} />
            </TouchableOpacity>
        </View>
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

            {/* Hiển thị lịch sử tìm kiếm nếu không có kết quả tìm kiếm */}
            {name.trim() === '' && searchHistory.length > 0 && (
                <FlatList
                    data={searchHistory}
                    renderItem={renderHistoryItem}
                    keyExtractor={(item) => item.id}
                    style={styles.historyContainer}
                />
            )}

            {/* Hiển thị kết quả tìm kiếm hoặc thông báo không có kết quả */}
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
                    name.trim() !== '' && (
                        <Text style={styles.noResultsText}>Không tìm thấy kết quả</Text>
                    )
                )
            )}
        </View>
    );
};

export default SearchScreen;
