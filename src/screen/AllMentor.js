import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import BASE_URL from '../component/apiConfig';
import styles from '../styles/AllMentorStyles';

const AllMentor = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userID } = route.params || {};
  const [mentors, setMentors] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/teacher/getLockedTeachers`);
        const sortedMentors = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setMentors(sortedMentors);
        setFilteredMentors(sortedMentors);
      } catch (error) {
        console.error('Error fetching mentors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);


  const handleBack = () => {
    navigation.goBack();
  };

  const handleViewProfileMentor = (mentor) => {
    console.log('Mentor ID:', mentor._id);
    console.log('User ID:', userID);
    navigation.navigate('ProfileMentor', { _id: mentor._id, userID });
  };

  const renderItem = ({ item }) => {
    const avatarUri = item.avatar ? { uri: item.avatar } : require('../design/image/noprofile.png');

    return (
      <TouchableOpacity style={styles.itemContainer} onPress={() => handleViewProfileMentor(item)}>
        {/* Display avatar */}
        <Image source={avatarUri} style={styles.itemImage} />
        <View style={styles.textContainer}>
          {/* Display name and major */}
          <Text style={styles.nameMentor}>{item.name}</Text>
          <Text style={styles.nameCategory}>{item.major}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleSearch = (text) => {
    setSearchKeyword(text);

    const filteredData = mentors.filter((mentor) =>
      mentor.name.toLowerCase().includes(text.toLowerCase()) ||
      mentor.major.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredMentors(filteredData);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Image source={require("../design/image/ic_back.png")} style={styles.imgBack} />
        </TouchableOpacity>
        <Text style={styles.txtHeader}>Tất cả giảng viên</Text>
      </View>
      <View style={styles.searchContainer}>
        <Image source={require('../design/image/ic_search.png')} style={styles.searchIcon} />
        <TextInput
          style={styles.textInput}
          placeholder="Tìm kiếm"
          placeholderTextColor="#545454"
          value={searchKeyword}
          onChangeText={handleSearch}
        />
      </View>
      <FlatList
        data={filteredMentors}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id ? String(item.id) : String(index)}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default AllMentor;
