import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/ProfileMentorStyles';

const CourseOrFeedbackItem = ({ item, isCourses }) => {
  return (
    <View style={styles.detailItem}>
      {isCourses ? (
        <>
          <Image source={item.image || require('../design/image/noprofile.png')} style={styles.detailImage} />
          <View style={styles.detailContent}>
            <Text style={styles.detailNameCourse}>{item.nameCourse}</Text>
            <Text style={styles.detailNameLesson} numberOfLines={2} ellipsizeMode="tail">
              {item.nameLesson}
            </Text>
            <Text style={styles.detailQuiz}>{item.quiz}</Text>
            <View style={styles.rate_container}>

            </View>
          </View>
        </>
      ) : (
        // Kiểm tra nếu có đánh giá mới render phần đánh giá
        item.comment ? (
          <>
            <Image
              source={item.img ? item.img : require('../design/image/noprofile.png')}
              style={styles.avatarUser}
            />
            <View style={styles.voteContent}>
              <View style={styles.user}>
                <Text
                  style={styles.nameUser}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {item.name}
                </Text>
                <View style={styles.viewrate}>
                  <Text style={styles.voteRate}>⭐</Text>
                  <Text style={styles.voteRate}>{item.rating}</Text>
                </View>
              </View>
              <Text style={styles.voteComment}>{item.comment}</Text>
              <View style={styles.voteInfo}>
                <Text style={styles.voteLove}>❤️ {item.love}</Text>
                <Text style={styles.voteDay}>{item.createdAt}</Text>
                {/* <TouchableOpacity style={{ width: 35, height: 35, marginLeft: 100 }}>
                  <Image source={require('../design/image/ic_delete.png')} style={{ width: 30, height: 30 }} />

                </TouchableOpacity> */}
              </View>

            </View>
          </>
        ) : (
          // Nếu không có đánh giá, có thể hiển thị thông báo hoặc không làm gì cả
          <Text style={styles.emptyMessage}>Chưa có đánh giá nào</Text>
        )
      )}
    </View>
  );
};


export default CourseOrFeedbackItem;
