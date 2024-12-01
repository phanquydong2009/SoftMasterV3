import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/SelectPaymentStyles';
const SelectPayment = () => {
  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      {/* View Header */}
      <View style={styles.viewHeader}>
        <TouchableOpacity onPress={handleGoBack}>
          <Image source={require('../design/image/ic_back.png')} />
        </TouchableOpacity>
        <Text style={styles.viewTextHeader}>Phương thức thanh toán</Text>
      </View>
      {/* Content */}
      <View style={styles.contentContainer}>
        <Text style={styles.contentText}>Chọn phương thức thanh toán</Text>
      </View>
      {/* Chọn phương thức thanh toán */}
      <View style={styles.paymentContainer}>
        <TouchableOpacity style={styles.paymentButton}>
          <Image
            source={require('../design/image/icon_visa.png')}
            style={styles.paymentImage}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.paymentButton}>
          <Image
            source={require('../design/image/icon_paypal.png')}
            style={styles.paymentImage}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.paymentButton}>
          <Image
            source={require('../design/image/icon_momo.png')}
            style={styles.paymentImage}
          />
        </TouchableOpacity>
      </View>
      {/* Bank trực tiêps */}
      <View style={styles.contentContainer2}>
        <Text style={styles.contentText2}>Chuyển khoản trực tiếp</Text>
      </View>
      {/* Qr CODE */}
      <View style={styles.qrCodeContainer}>
        <View style={styles.qrInfo}>
          <Image source={require('../design/image/qr.png')} style={styles.qrImage} />
          <Text style={styles.qrText}>SoftMaster SoftWare</Text>
        </View>
        <View style={styles.accountInfo}>
          <Text style={styles.infoLabel}>Số tài khoản</Text>
          <Text style={styles.infoValue}>99999999</Text>
        </View>
        <View style={styles.contentInfo}>
          <Text style={styles.infoLabel}>Nội dung CK</Text>
          <Text style={styles.infoValue}>customerID</Text>
        </View>
        <View style={styles.paymentInfo}>
          <View style={styles.paymentRow}>
            <Text style={styles.infoLabel1}>Tổng thanh toán</Text>
            <Text style={styles.totalAmount}>689.000 VNĐ</Text>
          </View>
          <Text style={styles.period}>3 Tháng</Text>
        </View>
      </View>
      {/* Button Tiếp Tục Thanh Toán */}
      <View style={styles.containerButton}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Xác nhận thanh toán</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SelectPayment;


