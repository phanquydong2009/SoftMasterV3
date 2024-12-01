import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import BASE_URL from '../component/apiConfig';
import styles from '../styles/AllCategoryStyles';
const AllCategory = () => {
  const navigation = useNavigation();
  const [subjects, setSubjects] = useState([]);

  // Hàm gọi API để lấy dữ liệu từ API subject/getAll
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch(`${BASE_URL}/subject/getAll`);
        const data = await response.json();
        setSubjects(data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      {/* Sử dụng đúng thuộc tính `img` để hiển thị hình ảnh từ API */}
      {item.img ? (
        <Image source={{ uri: item.img }} style={styles.itemImage} />
      ) : (
        <Text>Image not available</Text>
      )}
      <Text style={styles.itemName}>{item.name}</Text>
    </View>
  );
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Image source={require("../design/image/ic_back.png")} style={styles.imgBack} />
        </TouchableOpacity>
        <Text style={styles.txtHeader}>Tất cả danh mục</Text>
      </View>
      <View style={styles.searchContainer}>
        <Image source={require('../design/image/ic_search.png')} style={styles.searchIcon} />
        <TextInput
          style={styles.textInput}
          placeholder="Tìm kiếm"
          placeholderTextColor="#545454"
        />
      </View>
      <FlatList
        data={subjects}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()} 
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

export default AllCategory;
