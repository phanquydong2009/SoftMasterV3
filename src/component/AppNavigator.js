import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screen/SplashScreen';
import WelcomeScreen from '../screen/WelcomeScreen';
import SignUpOrSignIn from '../screen/SignUpOrSignIn';
import SignUpScreen from '../screen/SignUpScreen';
import SignInScreen from '../screen/SignInScreen';
import OtpScreen from '../screen/OtpScreen';
import TabNavigator from '../component/TabNavigator';
import AllCategory from '../screen/AllCategory';
import AllMentor from '../screen/AllMentor';
import AllCourse from '../screen/AllCourse';
import ProfileMentor from '../screen/ProfileMentor';
import ReviewScreen from '../screen/ReviewScreen';
import SearchScreen from '../screen/SearchScreen';
import MessagingScreen from '../TabBottom/MessagingScreen';
import TermsPolicy from '../screen/TermsPolicy';
import SecurityScreen from '../screen/SecurityScreen';
import ShareFriend from '../screen/ShareFriend';
import LanguageScreen from '../screen/LanguageScreen';
import Notifications from '../screen/SettingNotifications';
import CertScreen from '../screen/CertScreen';
import MyCourseDetail from '../screen/MyCourseDetail';
import UpgradePremium from '../screen/UpgradePremium';
import SelectPayment from '../screen/SelectPayment';
import CardPayment from '../screen/CardPayment';
import ForgotPassword from '../screen/ForgotPassword';
import PasswordNew from '../screen/PasswordNew';
import EditProfile from '../screen/EditProfile';
import QuizzCourse from '../screen/QuizzCourse';
import OtpForgetPassWord from '../screen/OtpForgetPassword';
import DetailScreen from '../screen/DetailScreen';
import VNPayPaymentScreen from '../screen/VNPayPaymentScreen';
import ReviewCourseScreen from '../screen/ReviewCourseScreen';
import DetailLesson from '../screen/DetailLesson';
import BoxChat from '../screen/BoxChat';
import NotificationScreen from '../screen/NotificationScreen';
import UpdatePassword from '../screen/UpdatePassword';
import CertificationScreen from '../TabBottom/CertificationScreen';
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          transitionSpec: {
            open: {
              animation: 'timing',
              config: {
                duration: 300,
              },
            },
            close: {
              animation: 'timing',
              config: {
                duration: 300,
              },
            },
          },
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="SignUpOrSignIn" component={SignUpOrSignIn} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="Otp" component={OtpScreen} />

        {/* Tabs để không có animation */}
        <Stack.Screen
          name="Tabs"
          component={TabNavigator}
          options={{
            gestureEnabled: false,
          }}
        />

        <Stack.Screen name="AllCategory" component={AllCategory} />
        <Stack.Screen name="AllMentor" component={AllMentor} />
        <Stack.Screen name="AllCourse" component={AllCourse} options={{
          gestureEnabled: false,
        }} />
        <Stack.Screen name="ProfileMentor" component={ProfileMentor} />
        <Stack.Screen name="ReviewScreen" component={ReviewScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Mess" component={MessagingScreen} />
        <Stack.Screen name="TermsPolicy" component={TermsPolicy} />
        <Stack.Screen name="Security" component={SecurityScreen} />
        <Stack.Screen name="ShareFriend" component={ShareFriend} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="Language" component={LanguageScreen} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="Cert" component={CertScreen} />
        <Stack.Screen name="MyCourseDetail" component={MyCourseDetail} />
        <Stack.Screen name="Premium" component={UpgradePremium} />
        <Stack.Screen name="SelectPayment" component={SelectPayment} />
        <Stack.Screen name="CardPayment" component={CardPayment} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="PasswordNew" component={PasswordNew} />
        <Stack.Screen name="QuizzCourse" component={QuizzCourse} />
        <Stack.Screen name="OtpForgetPassWord" component={OtpForgetPassWord} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="CoursePayment" component={VNPayPaymentScreen} />
        <Stack.Screen name="ReviewCourse" component={ReviewCourseScreen} />
        <Stack.Screen name="DetailLesson" component={DetailLesson} />
        <Stack.Screen name="BoxChat" component={BoxChat} />
        <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
        <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
        <Stack.Screen name="CertificationScreen" component={CertificationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
