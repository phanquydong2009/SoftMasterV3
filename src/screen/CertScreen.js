import React, { useEffect, useState, useRef } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ToolBar from '../component/ToolBar';
import styles from '../styles/CertScreenStyles';
import BASE_URL from '../component/apiConfig';
import RNFS from 'react-native-fs';
import ViewShot from 'react-native-view-shot'; // Thư viện chụp ảnh giao diện
import Toast from 'react-native-toast-message'; // Thêm import Toast

const CertScreen = ({ route }) => {
  const { certificateID, nameCourse, teacherID, updatedAt, userName } = route.params;
  const [teacherName, setTeacherName] = useState('');
  const certViewRef = useRef(); // Khởi tạo ref để trỏ đến phần BodyCert

  useEffect(() => {
    const fetchTeacherName = async () => {
      try {
        const response = await fetch(`${BASE_URL}/teacher/getTeacherByID/${teacherID}`);
        const data = await response.json();
        setTeacherName(data.name);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu giảng viên:', error);
      }
    };

    fetchTeacherName();
  }, [teacherID]);

  const formattedDate = updatedAt.split('T')[0].split('-').reverse().join('-');

  return (
    <SafeAreaView style={styles.container}>
      <ToolBar title={'Chứng chỉ'} />
      {/* Sử dụng ref cho ViewShot */}
      <ForwardedViewShot ref={certViewRef} style={styles.saveImg} options={{ format: 'jpg', quality: 0.9 }}>
        <BodyCert 
          certificateID={certificateID}  
          userName={userName}
          nameCourse={nameCourse} 
          teacherName={teacherName}
          updatedAt={formattedDate}  
        />
      </ForwardedViewShot>
      <ButtonDownload certViewRef={certViewRef} />
      <Toast ref={(ref) => Toast.setRef(ref)} /> 
    </SafeAreaView>
  );
};

// Wrap ViewShot component with forwardRef
const ForwardedViewShot = React.forwardRef((props, ref) => (
  <ViewShot {...props} ref={ref} />
));

const ButtonDownload = ({ certViewRef }) => {
  const handleDownload = async () => {
    try {
      // Chụp ảnh toàn bộ BodyCert
      const uri = await certViewRef.current.capture(); // capture() sẽ chụp ảnh giao diện
      const downloadDest = `${RNFS.ExternalDirectoryPath}/certificate.jpg`; // Đường dẫn lưu ảnh vào bộ nhớ

      // Di chuyển ảnh vừa chụp đến thư mục tải về
      await RNFS.moveFile(uri, downloadDest);

      // Hiển thị thông báo thành công
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Thành công',
        text2: 'Chứng chỉ đã được tải xuống!',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 30,
      });
    } catch (error) {
      console.error('Lỗi khi tải chứng chỉ:', error);
      // Hiển thị thông báo lỗi
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Lỗi',
        text2: 'Không thể tải chứng chỉ!',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 30,
      });
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleDownload}>
      <Text style={styles.buttonTitle}>Tải xuống chứng chỉ</Text>
      <Image
        source={require('../design/image/Circle.png')}
        style={styles.buttonImage}
      />
    </TouchableOpacity>
  );
};

const BodyCert = ({ certificateID, userName, nameCourse, teacherName, updatedAt }) => {
  return (
    <View style={styles.container_body}>
      <Image source={require('../design/image/waveTopRight.png')} style={styles.waveTopRight} />
      <Image source={require('../design/image/waveBottomLeft.png')} style={styles.waveBottomLeft} />
      <Image source={require('../design/image/doneCert.jpg')} style={styles.certImage} />
      <Text style={styles.txtTitle}>Giấy chứng nhận hoàn thành khóa học</Text>
      <Text style={styles.txtSubtitle}>Điều này chứng minh rằng</Text>
      <Text style={styles.txtName}>{userName}</Text>
      <Text style={styles.txtSubtitle}>Đã hoàn thành xuất sắc Khóa học</Text>
      <Text style={styles.txtNameCourse}>{nameCourse}</Text>
      <Text style={styles.txtSubtitle}>Ban hành vào ngày {updatedAt}</Text>
      <Text style={styles.txtSubtitle}>Bởi giảng viên</Text>
      <Text style={styles.txtNameTeacher}>{teacherName}</Text>
      <View style={styles.containerIDCert}>
        <Text style={styles.txtSubtitle}>ID : </Text>
        <Text style={styles.txtID}>{certificateID}</Text>  
      </View>
    </View>
  );
};

export default CertScreen;
