import React from 'react';
import { View, TouchableOpacity, Text, FlatList } from 'react-native';
import CourseOrFeedbackItem from './CourseOrFeedbackItem';
import styles from '../styles/ProfileMentorStyles'; 

const BodyProfileMentor = ({ isCourses, data, noCoursesMessage, handleButtonPress }) => {
    // Kiểm tra xem có khóa học hay đánh giá
    const hasItems = isCourses ? data.length > 0 : data.filter(item => item.comment).length > 0;
  
    return (
      <View style={styles.body}>
        <View style={styles.btnrate_container}>
          <TouchableOpacity
            onPress={() => handleButtonPress(true)}
            style={[styles.btn, isCourses && styles.btnActive]}>
            <Text style={[styles.txtActive, !isCourses && styles.txtInactive]}>
              Khóa học
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleButtonPress(false)}
            style={[styles.btn, !isCourses && styles.btnActive]}>
            <Text style={[styles.txtActive, isCourses && styles.txtInactive]}>
              Đánh giá
            </Text>
          </TouchableOpacity>
        </View>
  
        {/* Chỉ hiển thị FlatList khi có dữ liệu */}
        {hasItems ? (
          <FlatList
            data={data} 
            renderItem={({ item }) => <CourseOrFeedbackItem item={item} isCourses={isCourses} />}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.flatList}
            style={{ width: '99%', margin: 10 }}
            ListEmptyComponent={<Text style={styles.emptyMessage}>{noCoursesMessage}</Text>}
          />
        ) : (
          <Text style={styles.emptyMessage}>{noCoursesMessage}</Text>
        )}
      </View>
    );
};
  
export default BodyProfileMentor;
