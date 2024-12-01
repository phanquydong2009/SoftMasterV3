import { Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator, Keyboard } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import BASE_URL from '../component/apiConfig';
import styles from '../styles/EditProfileStyles';




const EditProfile = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userID } = route.params;
  const [gender, setGender] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [successPopupVisible, setSuccessPopupVisible] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [birthday, setBirthday] = useState('');
  const [loading, setLoading] = useState(false);

  // Hàm gọi API để lấy thông tin người dùng
  const fetchUserData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/user/getUserByID/${userID}`);
      const data = await response.json();

      if (response.ok) {
        setName(data.name || '');
        setPhone(data.phone || '');
        setAvatar(data.avatar ? data.avatar : require('../design/image/noprofile.png'));
        setGender(data.gender || '');

        // Xử lý ngày sinh
        if (data.birthday) {
          const formattedBirthday = data.birthday.split('T')[0];
          setBirthday(formattedBirthday);
        } else {
          setBirthday('');
        }
      } else {
        Alert.alert('Lỗi', 'Không thể lấy thông tin người dùng.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi lấy thông tin người dùng.');
    } finally {
      setLoading(false); // End loading
    }
  };

  // Hàm gọi API để cập nhật thông tin người dùng
  const updateUserData = async () => {
    if (!name || !phone || !birthday) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin.');
      return;
    }

    setLoading(true); // Start loading
    try {
      const response = await fetch(`${BASE_URL}/user/update/${userID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phone,
          avatar,
          birthday,
          gender,
        }),
      });

      if (response.ok) {
        setSuccessPopupVisible(true);
      } else {
        Alert.alert('Lỗi', 'Ngày sinh và giới tinh là bắt buộc!');
      }
    } catch (error) {
      console.error(error);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userID]);

  const handleSelectGender = (selectedGender) => {
    setGender(selectedGender);
    setModalVisible(false);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const closeSuccessPopup = () => {
    setSuccessPopupVisible(false);
    navigation.goBack();
  };


  // upload ảnh 
  const uploadImageToImgBB = async (imageUri) => {
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'avatar.jpg',
    });

    try {
      const response = await fetch('https://api.imgbb.com/1/upload?expiration=600&key=4254690dda1ab4a773856d7de73bfd86', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setAvatar(data.data.url);
        console.log('Thành công', 'Ảnh đã được tải lên thành công.');
      } else {
        console.log('Lỗi', 'Không thể tải ảnh lên.');
      }
    } catch (error) {
      console.error(error);
      console.log('Lỗi', 'Đã xảy ra lỗi khi tải ảnh lên.');
    }
  };

  const chooseImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('Người dùng đã hủy chọn ảnh');
      } else if (response.errorCode) {
        console.log('Lỗi chọn ảnh:', response.errorMessage);
      } else {
        const imageUri = response.assets[0].uri;
        uploadImageToImgBB(imageUri); 
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <Image source={require('../design/image/ic_back.png')} />
        </TouchableOpacity>
        <Text style={styles.txtTitle}>Chỉnh sửa hồ sơ</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <TouchableOpacity onPress={Keyboard.dismiss}>
            <View style={styles.avatar_container}>
              <View style={styles.circleBorder}>
                <Image
                  source={avatar && typeof avatar === 'string' ? { uri: avatar } : require('../design/image/noprofile.png')}
                  style={styles.avatar}
                />
              </View>
              <TouchableOpacity>
                <Image source={require('../design/image/square.png')} style={styles.overlayImage} />
              </TouchableOpacity>
            </View>

            <View style={styles.body}>
              <View style={styles.inputContainer}>
                <Image source={require('../design/image/ic_name.png')} style={styles.icon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Họ tên"
                  placeholderTextColor="#505050"
                  value={name}
                  onChangeText={setName}
                />
              </View>

              <View style={styles.inputContainer}>
                <Image source={require('../design/image/ic_name.png')} style={styles.icon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Số điện thoại"
                  placeholderTextColor="#505050"
                  value={phone}
                  onChangeText={setPhone}
                />
              </View>

              <View style={styles.inputContainer}>
                <Image source={require('../design/image/ic_profile.png')} style={styles.icon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Upload ảnh đại diện"
                  placeholderTextColor="#505050"
                  value={avatar}
                  onFocus={chooseImage}
                />
              </View>

              <View style={styles.inputContainer}>
                <Image source={require('../design/image/ic_birthday.png')} style={styles.icon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="YYYY/MM/DD"
                  placeholderTextColor="#505050"
                  value={birthday}
                  onChangeText={setBirthday}
                />
              </View>

              <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.inputContainer}>
                <Image
                  source={gender ? (gender === 'Nam' ? require('../design/image/men.png') : require('../design/image/woman.png')) : require('../design/image/ic-sex.png')}
                  style={styles.icon}
                />
                <Text style={styles.textInput}>{gender || "Giới tính"}</Text>
              </TouchableOpacity>

              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
              >
                <TouchableOpacity style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
                  <View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.option} onPress={() => handleSelectGender('Nam')}>
                      <Image source={require('../design/image/men.png')} style={styles.optionIcon} />
                      <Text style={styles.optionText}>Nam</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.option} onPress={() => handleSelectGender('Nữ')}>
                      <Image source={require('../design/image/woman.png')} style={styles.optionIcon} />
                      <Text style={styles.optionText}>Nữ</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </Modal>

              <TouchableOpacity style={styles.inputContainer}>
                <Image source={require('../design/image/ic_name.png')} style={styles.icon} />
                <Text style={styles.textInput}>Đổi mật khẩu</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.footer}>
              <TouchableOpacity style={styles.button} onPress={updateUserData}>
                <Text style={styles.txtButton}>Cập nhật</Text>
                <Image source={require('../design/image/icon_continue.png')} style={styles.continueIcon} />
              </TouchableOpacity>
            </View>

            <Modal
              animationType="slide"
              transparent={true}
              visible={successPopupVisible}
              onRequestClose={closeSuccessPopup}
            >
              <View style={styles.popupOverlay}>
                <View style={styles.popupContainer}>
                  <Image source={require('../design/image/sss.jpg')} style={styles.popupImage} />
                  <Text style={styles.popupTitle}>Cập nhật thành công!</Text>
                  <Text style={styles.popupMessage}>Thông tin của bạn đã được cập nhật mới.</Text>
                  <TouchableOpacity style={styles.popupButton} onPress={closeSuccessPopup}>
                    <Text style={styles.popupButtonText}>OK</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};
export default EditProfile;


