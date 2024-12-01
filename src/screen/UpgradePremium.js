import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/UpgradePremiumStyles';
const UpgradePremium = () => {
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
        <Text style={styles.viewTextHeader}>Nâng cấp Premium</Text>
      </View>
      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.contentText}>
          Bộ dành cho mọi cá nhân và người mới bắt đầu muốn bắt đầu với một
          phương pháp học tập mới.
        </Text>
      </View>
      {/* Gói Premium */}
      <View style={styles.premiumContainer}>
        <View style={styles.premiumRow}>
          <TouchableOpacity style={styles.premiumOption}>
            <Text style={styles.premiumText}>30 Ngày</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.priceText}>249.000</Text>
              <Text style={styles.currencyText}>VND</Text>
            </View>
            <View style={styles.imageWrapper}>
              <Image
                source={require('../design/image/icon_pre1.png')}
                style={styles.premiumImage}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.premiumOption}>
            <Text style={styles.premiumText}>3 Tháng</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.priceText}>689.000</Text>
              <Text style={styles.currencyText}>VND</Text>
            </View>
            <View style={styles.imageWrapper}>
              <Image
                source={require('../design/image/icon_pre2.png')}
                style={styles.premiumImage}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.premiumRow}>
          <TouchableOpacity style={styles.premiumOption}>
            <Text style={styles.premiumText}>1 Năm</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.priceText}>1.290.000 VND</Text>
            </View>
            <View style={styles.imageWrapper}>
              <Image
                source={require('../design/image/icon_pre3.png')}
                style={styles.premiumImage}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {/* Button Tiếp Tục */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SelectPayment')}>
          <Text style={styles.buttonText}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UpgradePremium;
