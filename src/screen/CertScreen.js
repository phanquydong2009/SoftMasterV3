import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ToolBar from '../component/ToolBar';
import styles from '../styles/CertScreenStyles';
const CertScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
    <ToolBar title={'Chứng chỉ'} />
      <BodyCert />
      <ButtonDownload />
    </SafeAreaView>
  );
};

const ButtonDownload = () => {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonTitle}>Tải xuống chứng chỉ</Text>
      <Image
        source={require('../design/image/Circle.png')}
        style={styles.buttonImage}
      />
    </TouchableOpacity>
  );
};

const BodyCert = () => {
  return (
    <View style={styles.container_body}>
      <Image source={require('../design/image/waveTopRight.png')} style={styles.waveTopRight} />
      <Image source={require('../design/image/waveBottomLeft.png')} style={styles.waveBottomLeft} />
      <Image source={require('../design/image/done_cert.png')} style={styles.certImage} />
      <Text style={styles.txtTitle}>Giấy chứng nhận hoàn thành khóa học</Text>
      <Text style={styles.txtSubtitle}>Điều này chứng minh rằng</Text>
      <Text style={styles.txtName}>Phan Quý Đông</Text>
      <Text style={styles.txtSubtitle}>Đã hoàn thành xuất sắc Chương trình đào tạo</Text>
      <Text style={styles.txtSubtitle}>Phát triển Web</Text>
      <Text style={styles.txtNameCourse}>Full Stack Web Development</Text>
      <Text style={styles.txtSubtitle}>Ban hành vào ngày 24 tháng 11 năm 2024</Text>
      <Text style={styles.txtNameTeacher}>Phan Quý Đông</Text>
      <Text style={styles.txtNameTeacherSignature}>Phan Quý Đông</Text>
      <View style={styles.containerIDCert}>
        <Text style={styles.txtSubtitle}>ID :</Text>
        <Text style={styles.txtSubtitle}>12314123</Text>
      </View>
    </View>
  );
};


export default CertScreen;
