import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../styles/LanguageScreenStyles';

const  LanguageScreen= ({ navigation }) => {
  const [isVietnamese, setIsVietnamese] = useState(true);

  const toggleLanguage = (language) => {
    if (language === 'vietnamese') {
      setIsVietnamese(true);
    } else {
      setIsVietnamese(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image
            source={require('../design/image/ic_back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Ngôn Ngữ</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.title}>Tất cả ngôn ngữ</Text>

        <View style={styles.languageOption}>
          <Text style={styles.languageText}>Tiếng Việt</Text>
          <TouchableOpacity onPress={() => toggleLanguage('vietnamese')} style={styles.checkBoxWrapper}>
            <Image
              source={isVietnamese ? require('../design/image/check_on.png') : require('../design/image/check_off.png')}
              style={styles.checkBox}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.languageOption}>
          <Text style={styles.languageText}>English</Text>
          <TouchableOpacity onPress={() => toggleLanguage('english')} style={styles.checkBoxWrapper}>
            <Image
              source={!isVietnamese ? require('../design/image/check_on.png') : require('../design/image/check_off.png')}
              style={styles.checkBox}
            />
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
};

export default LanguageScreen;

