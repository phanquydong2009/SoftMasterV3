
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

import HomeScreen from '../screen/HomeScreen';
import CertificationScreen from '../TabBottom/CertificationScreen';
import MessagingScreen from '../TabBottom/MessagingScreen';
import CourseScreen from '../TabBottom/CourseScreen';
import ProfileScreen from '../TabBottom/ProfileScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          let iconSize = 35;

          switch (route.name) {
            case 'Trang chủ':
              iconName = require('../design/image/ic_home.png');
              break;
            case 'Chứng chỉ':
              iconName = require('../design/image/ic_Certification.png');
              break;
            case 'Nhắn tin':
              iconName = require('../design/image/ic_mess.png');
              break;
            case 'Khóa học':
              iconName = require('../design/image/ic_Course.png');
              break;
            case 'Cá nhân':
              iconName = require('../design/image/ic_profile.png');
              break;
            default:
              iconName = require('../design/image/ic_home.png');
          }

          const AnimatedIcon = Animatable.createAnimatableComponent(Image);
          const animation = focused ? 'fadeInUp' : undefined;

          return (
            <View style={{ alignItems: 'center' }}>
              <AnimatedIcon
                animation={animation}
                duration={300}
                source={iconName}
                style={[
                  styles.icon,
                  {
                    width: iconSize,
                    height: iconSize,
                    tintColor: focused ? '#0961F5' : '#202244'
                  }
                ]}
              />
              {focused && (
                <Animatable.Text
                  animation="fadeInUp"
                  duration={300}
                  style={styles.tabLabel}
                >
                  {route.name}
                </Animatable.Text>
              )}
            </View>
          );
        },
        tabBarLabelStyle: {
          fontFamily: "Mulish-ExtraBold",
          fontSize: 14,
        },
        tabBarActiveTintColor: '#0961F5',
        tabBarInactiveTintColor: '#202244',
        tabBarStyle: {
          height: 65,
          backgroundColor: '#F5F9FF',
        },
        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Trang chủ" component={HomeScreen} />
      <Tab.Screen name="Chứng chỉ" component={CertificationScreen} />
      <Tab.Screen name="Nhắn tin" component={MessagingScreen} />
      <Tab.Screen name="Khóa học" component={CourseScreen} />
      <Tab.Screen name="Cá nhân" component={ProfileScreen} />
    </Tab.Navigator>
  );
};


const styles = StyleSheet.create({
  icon: {
    resizeMode: 'contain',
  },
  tabLabel: {
    fontFamily: "Mulish-ExtraBold",
    fontSize: 14,
    color: '#0961F5', // Màu của label khi tab được chọn
    textAlign: 'center',


  },
});

export default TabNavigator;
