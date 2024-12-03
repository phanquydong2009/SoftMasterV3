import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import BASE_URL from '../component/apiConfig';
import CustomAlert from '../component/CustomAlert';
import styles from '../styles/QuizzCourseStyles';

const QuizzCourse = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [scoreType, setScoreType] = useState('');
  const [questions, setQuestions] = useState([]);
  const [answerCheck, setAnswerCheck] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true); // State to track voice status
  const navigation = useNavigation();
  const route = useRoute();

  // Lấy testId từ tham số route
  const { testId, userID } = route.params;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/question/getRandomQuestions/${testId}`);

        const formattedQuestions = response.data.map((item) => ({
          questionID: item.questionID,
          title: item.title,
          options: shuffleArray(item.options.map(option => ({
            text: option.text,
            isCorrect: option.isCorrect,
          }))),
        }));
        setQuestions(formattedQuestions);
      } catch (error) {
        console.error('Lỗi khi lấy câu hỏi:', error);
      }
    };

    fetchQuestions();
  }, [testId]);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handlePress = (value) => {
    setSelectedOption(value);
    setErrorMessage('');
  };

  const handleContinue = () => {
    // Kiểm tra nếu không chọn câu trả lời
    if (!selectedOption) {
      setErrorMessage('Vui lòng chọn câu trả lời');
      return;
    }

    const correctOption = questions[currentQuestionIndex].options.find(
      (option) => option.isCorrect
    );

    // Kiểm tra đáp án
    if (selectedOption === correctOption.text) {
      setScore(score + 1);
      setAnswerCheck([...answerCheck, true]);
    } else {
      setAnswerCheck([...answerCheck, false]);
    }

    setTimeout(() => {
      // Chuyển sang câu hỏi tiếp theo
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
        setErrorMessage(''); // Reset thông báo lỗi
      } else {
        // Tính loại điểm
        const averageScore = (score / questions.length) * 10;
        let scoreType;

        // Phân loại điểm với mô tả chi tiết hơn
        if (averageScore >= 0 && averageScore < 5) {
          scoreType = 'Hạng đạt yếu - Cần cố gắng nhiều hơn để đạt được kết quả tốt hơn.';
        } else if (averageScore >= 5 && averageScore < 7) {
          scoreType = 'Hạng đạt trung bình - Đã đạt yêu cầu nhưng cần cải thiện thêm.';
        } else if (averageScore >= 7 && averageScore < 8) {
          scoreType = 'Hạng đạt khá - Thành tích tốt, hãy tiếp tục phát huy.';
        } else if (averageScore >= 8 && averageScore <= 10) {
          scoreType = 'Hạng đạt giỏi - Xuất sắc! Bạn đã làm rất tốt.';
        }


        setScoreType(scoreType);
        setModalVisible(true);
      }
    }, 1000);
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      // Xác định câu hỏi trước đó
      const previousIndex = currentQuestionIndex - 1;

      // Kiểm tra câu trả lời trước đó
      const wasCorrect = answerCheck[previousIndex];

      // Nếu đúng thì trừ điểm
      if (wasCorrect) {
        setScore(score - 1);
      }

      // Xóa trạng thái câu trả lời của câu hỏi trước
      const updatedAnswerCheck = [...answerCheck];
      updatedAnswerCheck.pop();
      setAnswerCheck(updatedAnswerCheck);

      // Quay lại câu hỏi trước
      setCurrentQuestionIndex(previousIndex);
      setSelectedOption(null); // Xóa lựa chọn hiện tại
      setErrorMessage(''); // Xóa thông báo lỗi
    }
  };

  // Function to toggle the voice state
  const toggleVoice = () => {
    setIsVoiceEnabled(!isVoiceEnabled);
  };

  if (questions.length === 0) return <Text>Đang tải...</Text>;

  const { title, options } = questions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.viewHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../design/image/ic_back.png')} />
        </TouchableOpacity>
        <Text style={styles.txtHeader}>Câu hỏi bài tập</Text>
        {/* Voice toggle */}

        <TouchableOpacity onPress={toggleVoice}>
          <Image
            source={isVoiceEnabled ? require('../design/image/ic_voice.png') : require('../design/image/ic_novoice.png')}
            style={styles.voiceIcon}
          />
        </TouchableOpacity>

      </View>

      {/* Quizz */}
      <View style={styles.viewQuizz}>
        <View style={styles.lessonNumberContainer}>
          <Text style={styles.lessonNumber}>{currentQuestionIndex + 1}</Text>
        </View>
        <Text style={styles.txtTitle}>{title}</Text>
      </View>


      {/* Quizz Ask */}
      <View style={styles.viewQuizzAsk}>
        {options.map((option, index) => (
         <TouchableOpacity
         onPress={() => handlePress(option.text)}
         key={`${option.text}-${index}`}
         style={[
           styles.innerContainer,
           {
             borderColor:
               selectedOption === option.text
                 ? '#000000' // Border khi câu trả lời được chọn
                 : answerCheck[currentQuestionIndex] !== undefined
                 ? !option.isCorrect && selectedOption === option.text
                   ? '#EC2222' // Border màu đỏ khi câu trả lời sai
                   : '#e5e5e5' // Border mặc định
                 : 'transparent', // Không có border khi chưa trả lời
             borderWidth: 1,
           },
         ]}
       >
         <Image
           source={
             selectedOption === option.text
               ? require('../design/image/icon_oval2.png')
               : require('../design/image/icon_oval1.png')
           }
           style={styles.image}
         />
         <Text style={styles.text}>{option.text}</Text>
       </TouchableOpacity>
       
        ))}


        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      </View>


      {/* Custom Modal */}
      <CustomAlert
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        score={score}
        scoreType={scoreType}
        userID={userID}
        testId={testId}
      />

      {/* Continue Button */}
      <View style={styles.containerButtonBottom}>
        <TouchableOpacity
          onPress={handlePrev}
          style={styles.continueButtonPrev}
        >
          <Image
            source={require('../design/image/prev_quizz.png')}
            style={styles.continueButtonImage}
          />
          <Text style={styles.continueButtonText}>Câu trước</Text>

        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleContinue}
          style={styles.continueButtonNext}
        >
          <Text style={styles.continueButtonText}>Tiếp theo</Text>
          <Image
            source={require('../design/image/next_quizz.png')}
            style={styles.continueButtonImage}
          />
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default QuizzCourse;
