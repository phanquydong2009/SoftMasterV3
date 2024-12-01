import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, FlatList, Dimensions, Modal, RefreshControl } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import YouTubeIframe from 'react-native-youtube-iframe';
import styles from '../styles/DetailLessonStyles';
import BASE_URL from '../component/apiConfig';

const { width } = Dimensions.get('window');
const videoHeight = (width * 9) / 16;

const DetailLesson = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { _id, userID, courseID } = route.params || {};


  // Ghi log để kiểm tra giá trị của _id và userID
  useEffect(() => {
    console.log("Nhận được giá trị _id:", _id);
    console.log("Nhận được giá trị userID:", userID);
    console.log('courseID:', courseID);
  }, [route.params]);

  const [videoData, setVideoData] = useState([]);
  const [testData, setTestData] = useState([]);
  const [videoLink, setVideoLink] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeWatched, setTimeWatched] = useState(0);
  const [hasWatched, setHasWatched] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [completedTests, setCompletedTests] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  const timerRef = useRef(null);



  // Fetch dữ liệu video và bài kiểm tra khi có `_id`
  const fetchData = () => {
    setRefreshing(true);

    fetch(`${BASE_URL}/lessonVideo/getLessonVideoByLessonID/${_id}`)
      .then((response) => response.json())
      .then((json) => setVideoData(json))
      .catch((error) => console.error('Lỗi khi lấy dữ liệu video:', error));

    fetch(`${BASE_URL}/test/getTestByLessonID/${_id}`)
      .then((response) => response.json())
      .then((json) => {
        setTestData(json);
        json.forEach((test) => {
          fetch(`${BASE_URL}/score/scores/canTakeTest/${userID}/${test._id}`)
            .then((response) => response.json())
            .then((json) => {
              if (json.success || ['Người dùng chưa làm bài kiểm tra này.', 'Không thể kiểm tra trạng thái bài test.'].includes(json.message)) {
                setCompletedTests((prevState) => ({
                  ...prevState,
                  [test._id]: false,
                }));
              } else if (json.message === 'Bạn đã đạt 10 điểm. Bạn có thể qua bài kiểm tra tiếp theo.') {
                setCompletedTests((prevState) => ({
                  ...prevState,
                  [test._id]: true,
                }));
              } else {
                setErrorText(json.message || 'Có lỗi xảy ra, vui lòng thử lại sau.');
              }
            })
            .catch((error) => {
              console.error('Lỗi khi lấy trạng thái bài kiểm tra:', error);
              setErrorText('Lỗi hệ thống, vui lòng thử lại sau.');
            });
        });
      })
      .catch((error) => console.error('Lỗi khi lấy dữ liệu bài kiểm tra:', error))
      .finally(() => setRefreshing(false));
  };

  // Gọi hàm fetchData khi component được render lần đầu
  useEffect(() => {
    if (_id) {
      fetchData();
    }
  }, [_id, userID]);

  const handlePlayVideo = (videoUrl) => {
    const videoId = videoUrl.split('youtu.be/')[1]?.split('?')[0];
    setVideoLink(videoId);
    setIsPlaying(true);
    setTimeWatched(0);
    setHasWatched(false);
    timerRef.current = setInterval(() => {
      setTimeWatched((prevTime) => prevTime + 1);
    }, 1000);
  };

  const handleStopVideo = () => {
    setIsPlaying(false);
    clearInterval(timerRef.current);
  };

  const handleGoToQuiz = (testId) => {
    setErrorText('');
    if (!hasWatched) {
      setModalVisible(true);
      return;
    }

    fetch(`${BASE_URL}/score/scores/canTakeTest/${userID}/${testId}`)
      .then((response) => response.json())
      .then((json) => {
        if (json.success || ['Người dùng chưa làm bài kiểm tra này.', 'Không thể kiểm tra trạng thái bài test.'].includes(json.message)) {
          navigation.navigate('QuizzCourse', { testId, userID });
        } else if (json.message === 'Bạn đã đạt 10 điểm. Bạn có thể qua bài kiểm tra tiếp theo.') {
          setCompletedTests((prevState) => ({
            ...prevState,
            [testId]: true,
          }));
        } else {
          setErrorText(json.message || 'Có lỗi xảy ra, vui lòng thử lại sau.');
        }
      })
      .catch((error) => {
        console.error('Lỗi hệ thống:', error);
        setErrorText('Lỗi hệ thống, vui lòng thử lại sau.');
      });
  };

  const renderTestItem = ({ item, index }) => {
    const updatedAt = item.updatedAt.split('T')[0];
    const isTestCompleted = completedTests[item._id];
    return (
      <View style={styles.columnItem}>
        <View style={styles.courseSection}>
          <View style={styles.number_container}>
            <Text style={styles.number}>{String(index + 1).padStart(2, '0')}</Text>
          </View>
          <View style={styles.column_text}>
            <Text style={styles.sectionTitle}>{item.title}</Text>
            <Text style={styles.sectionDay}>{updatedAt}</Text>
          </View>
          <TouchableOpacity onPress={() => handleGoToQuiz(item._id)}>
            <Image
              source={isTestCompleted ? require('../design/image/complete_icon.png') : require('../design/image/ic_quiz.png')}
              style={styles.icon_quizz}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.separator} />
      </View>
    );
  };

  const renderVideoItem = ({ item, index }) => {
    const updatedAt = item.updatedAt.split('T')[0];

    return (
      <View style={styles.columnItem}>
        <View style={styles.courseSection}>
          <View style={styles.number_container}>
            <Text style={styles.number}>{String(index + 1).padStart(2, '0')}</Text>
          </View>
          <View style={styles.column_text}>
            <Text style={styles.sectionTitle}>{item.title}</Text>
            <Text style={styles.sectionDay}>{updatedAt}</Text>
          </View>
          <TouchableOpacity onPress={() => handlePlayVideo(item.video)}>
            <Image source={require('../design/image/icon_play.png')} style={styles.icon_quizz} />
          </TouchableOpacity>
        </View>
        <View style={styles.separator} />
      </View>
    );
  };

  useEffect(() => {
    if (timeWatched >= 10 && !hasWatched) {
      setHasWatched(true);
      clearInterval(timerRef.current);
    }
  }, [timeWatched, hasWatched]);

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const goBack = () => {
    navigation.goBack();
  };

  // kiểm tra các test đã hoàn thành hoàn toàn chưa
  const areAllTestsCompleted = testData.every((test) => completedTests[test._id] === true);

  // Khi nút "Học bài tiếp theo" được bấm, chuyển qua màn MyCourseDetail với lessonIdDone
  const handleNextLesson = () => {
    if (areAllTestsCompleted) {
      // Lấy _id và userID từ route.params
      const { _id, userID } = route.params;

      // Gán _id thành courseID 
      const testIdDone = _id;
     

      // Log giá trị truyền đi
      console.log(`Thông tin truyền đi: testIdDone = ${testIdDone}, userID = ${userID}, courseID = ${courseID}`);

      // Điều hướng đến MyCourseDetail với courseID và userID
      navigation.navigate('MyCourseDetail', { testIdDone, userID ,courseID});
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}>
          <Image source={require('../design/image/ic_back.png')} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Video & Bài Quizz</Text>
      </View>

      {/* <View style={styles.searchContainer}>
        <TextInput style={styles.input} placeholder="Tìm kiếm..." />
        <TouchableOpacity>
          <Image source={require('../design/image/ic_search.png')} style={styles.searchIcon} />
        </TouchableOpacity>
      </View> */}

      {isPlaying && videoLink ? (
        <View style={{ flex: 1 }}>
          <YouTubeIframe
            height={videoHeight}
            videoId={videoLink}
            play={true}
            onChangeState={(event) => {
              if (event === 'paused' || event === 'ended') {
                handleStopVideo();
              }
            }}
          />
          <Text
            style={[
              styles.timerText,
              timeWatched < 10 ? styles.timerRedText : styles.timerGreenText
            ]}
          >
            {timeWatched < 10
              ? `Xem thêm ${10 - timeWatched} giây để mở khóa bài kiểm tra.`
              : 'Bạn đã xem đủ 10 giây !'}
          </Text>
          {timeWatched >= 10 && (
            <TouchableOpacity
              style={styles.quizButton}
              onPress={() => {
                handleStopVideo();
              }}
            >
              <Text style={styles.quizButtonText}>Làm bài quizz ngay !</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <>
          {videoData.length === 0 && testData.length === 0 ? (
            <Text style={styles.noLessons}>Bài học chưa được cập nhật từ giáo viên.</Text>
          ) : (
            <>
              <Text style={styles.sectionHeader}>Phần Video Bài Học</Text>
              {videoData.length === 0 ? (
                <Text style={styles.noLessons}>Chưa có video bài giảng! Đợi cập nhật từ giảng viên.</Text>
              ) : (
                <View style={[styles.container_list]}>
                  <FlatList
                    data={videoData}
                    renderItem={renderVideoItem}
                    keyExtractor={(item) => item._id.toString()}
                    ListEmptyComponent={<Text>Chưa có video nào.</Text>}
                    refreshControl={
                      <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
                    }
                  />
                </View>
              )}
              <Text style={styles.sectionHeader}>Phần Bài Kiểm Tra</Text>
              {testData.length === 0 ? (
                <Text style={styles.noLessons}>Chưa có bài kiểm tra nào! Đợi cập nhật từ giảng viên.</Text>
              ) : (
                <View style={[styles.container_list]}>
                  <FlatList
                    data={testData}
                    renderItem={renderTestItem}
                    keyExtractor={(item) => item._id.toString()}
                    ListEmptyComponent={<Text>Chưa có bài kiểm tra nào.</Text>}
                  />
                </View>
              )}
            </>
          )}
        </>
      )}
      <Text style={[styles.txtError, { display: errorText ? 'flex' : 'none' }]}>{errorText}</Text>


      {/* // nút hoàn thành bài test */}
      <View style={styles.btnBottom}>
        <TouchableOpacity
          style={[
            styles.btnNextLesson,
            !areAllTestsCompleted && { opacity: 0.5 },
          ]}
          disabled={!areAllTestsCompleted}
          onPress={handleNextLesson}
        >
          <Text style={styles.txtNext}>Học bài tiếp theo</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image
              source={require('../design/image/failPayment.png')}
              style={styles.modalImage}
            />
            <Text style={styles.modalTitle}>Chưa đủ điều kiện làm bài !</Text>
            <Text style={styles.modalMessage}>
              Bạn phải xem video bài học đủ thời gian !
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Đã hiểu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>

  );
};

export default DetailLesson;