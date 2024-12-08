import React, { useState, useEffect } from 'react';
import {
  FlatList,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import BASE_URL from '../component/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotificationScreen = ({ route }) => {
  const { userID } = route.params; // Lấy userID từ params khi chuyển đến màn hình này
  const navigation = useNavigation(); 
  const [isSearchVisible, setIsSearchVisible] = useState(false); // Trạng thái hiển thị thanh tìm kiếm
  const [searchTerm, setSearchTerm] = useState(''); // Lưu trữ giá trị tìm kiếm
  const [notifications, setNotifications] = useState([]); // Lưu trữ tất cả thông báo
  const [filteredNotifications, setFilteredNotifications] = useState([]); // Lưu trữ thông báo đã lọc theo từ khoá tìm kiếm
  const [loading, setLoading] = useState(true); // Trạng thái loading khi đang gọi API
  const [selectedNotification, setSelectedNotification] = useState(null); // Thông báo được chọn để hiển thị chi tiết

  // Hàm gọi API lấy thông báo
  const fetchNotifications = async () => {
    setLoading(true); // Đặt loading là true khi bắt đầu gọi API
    try {
      const response = await fetch(`${BASE_URL}/enrollCourse/notifications/${userID}`);
      const data = await response.json();
      if (data.notifications) {
        setNotifications(data.notifications); // Lưu thông báo vào state notifications
        setFilteredNotifications(data.notifications); // Đặt filteredNotifications khi có dữ liệu
  
        // Kiểm tra trạng thái đã xem từ AsyncStorage và cập nhật thông báo
        const storedNotifications = await AsyncStorage.getItem('notifications');
        if (storedNotifications) {
          const readNotifications = JSON.parse(storedNotifications);
          const updatedNotifications = data.notifications.map(notification => {
            const isRead = readNotifications.some(item => item.id === notification.id);
            return { ...notification, read: isRead }; // Đánh dấu thông báo là đã đọc nếu có trong AsyncStorage
          });
          setNotifications(updatedNotifications); // Cập nhật lại danh sách thông báo
          setFilteredNotifications(updatedNotifications); // Cập nhật lại danh sách thông báo đã lọc
        }
      }
    } catch (error) {
      console.error('Lỗi khi gọi API:', error); // In lỗi nếu có sự cố khi gọi API
    } finally {
      setLoading(false); // Đặt loading là false sau khi gọi API xong
    }
  };
  

  // Gọi API khi component mount
  useEffect(() => {
    fetchNotifications();
  }, []);

  // Toggle hiển thị thanh tìm kiếm
  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  // Hàm thay đổi giá trị tìm kiếm và lọc thông báo theo từ khoá
  const handleSearch = (text) => {
    setSearchTerm(text); // Cập nhật giá trị tìm kiếm
    if (text) {
      const filtered = notifications.filter((item) =>
        item.message.toLowerCase().includes(text.toLowerCase()) // Lọc thông báo có chứa từ khoá
      );
      setFilteredNotifications(filtered); // Cập nhật danh sách thông báo đã lọc
    } else {
      setFilteredNotifications(notifications); // Nếu không có từ khoá, hiển thị tất cả thông báo
    }
  };

  // Hàm quay lại màn hình trước
  const handleBack = () => {
    navigation.goBack(); // Dùng navigation để quay lại màn hình trước
  };

  // Hàm khi nhấn vào thông báo để mở chi tiết
  const handleNotificationClick = async (item) => {
    setSelectedNotification(item); // Lưu thông báo được chọn vào state
  
    // Đánh dấu thông báo là đã đọc và lưu vào AsyncStorage
    if (!item.read) {
      item.read = true;
      setNotifications([...notifications]); // Cập nhật lại danh sách thông báo
      setFilteredNotifications([...filteredNotifications]); // Cập nhật lại danh sách thông báo đã lọc
  
      // Lưu trạng thái đã đọc vào AsyncStorage
      try {
        const storedNotifications = await AsyncStorage.getItem('notifications');
        let notificationsData = storedNotifications ? JSON.parse(storedNotifications) : [];
        notificationsData.push(item); // Thêm thông báo đã đọc vào danh sách
        await AsyncStorage.setItem('notifications', JSON.stringify(notificationsData));
      } catch (error) {
        console.error('Lỗi khi lưu trạng thái thông báo:', error);
      }
    }
  };
  
  // Render item trong FlatList
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleNotificationClick(item)}>
      <View style={styles.itemContainer}>
        <Image source={require('../design/image/logoaapnobg.jpg')} style={styles.avatar} />
        <View style={styles.contentContainer}>
          <Text
            style={[
              styles.notificationMessage,
              item.read ? styles.readMessage : styles.unreadMessage
            ]}
          >
            {item.message} {/* Hiển thị thông báo */}
          </Text>
          <Text style={styles.notificationTimestamp}>
            {new Date(item.timestamp).toLocaleString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Image source={require('../design/image/ic_back.png')} />
        </TouchableOpacity>
        {!isSearchVisible && (
          <View style={styles.txtHeaderContainer}>
            <Text style={styles.txtHeader}>Thông báo</Text> 
          </View>
        )}
        {isSearchVisible && (
          <View style={[styles.searchContainer, styles.searchContainerExpanded]}>
            <TextInput
              style={styles.searchInput}
              placeholder="Tìm kiếm..."
              placeholderTextColor="#A0A4AB"
              value={searchTerm}
              onChangeText={handleSearch} // Lọc thông báo khi thay đổi từ khoá tìm kiếm
            />
          </View>
        )}
        <TouchableOpacity onPress={toggleSearch}>
          <Image source={require('../design/image/ic_search.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <FlatList
          data={filteredNotifications} // Sử dụng dữ liệu đã lọc từ state filteredNotifications
          renderItem={renderItem} // Hiển thị thông báo
          keyExtractor={(item) => item.id.toString()} 
          refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchNotifications} />} 
        />
      </View>

      {/* Popup Modal */}
      {selectedNotification && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={!!selectedNotification} // Kiểm tra nếu có thông báo đã chọn thì hiển thị modal
          onRequestClose={() => setSelectedNotification(null)} // Đóng modal khi nhấn ngoài modal
        >
          <TouchableWithoutFeedback onPress={() => setSelectedNotification(null)}>
            <View style={styles.modalBackground}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Thông Báo</Text> 
                <Text style={styles.modalMessage}>{selectedNotification.message}</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setSelectedNotification(null)} // Đóng modal khi nhấn vào nút đóng
                >
                  <Text style={styles.closeButtonText}>Đóng</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  txtHeaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txtHeader: {
    fontFamily: 'Mulish-ExtraBold',
    fontSize: 25,
    color: '#202244', // Màu chữ của tiêu đề
  },
  searchContainer: {
    backgroundColor: '#FFFFFF',
    borderColor: '#0961F5',
    borderWidth: 1,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderRadius: 20,
    position: 'absolute',
    right: 40,
    opacity: 0,
  },
  searchContainerExpanded: {
    width: '77%',
    opacity: 1,
  },
  searchInput: {
    height: '100%',
    fontSize: 16,
    borderWidth: 0,
    flex: 1,
    paddingHorizontal: 5,
  },
  body: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginVertical: 5,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#F5F9FF',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2, // Đổ bóng cho mỗi item
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 20,
    marginRight: 20,
  },
  contentContainer: {
    flex: 1,
  },
  notificationMessage: {
    fontSize: 16,
    color: '#202244', // Màu chữ thông báo
    marginBottom: 5,
  },
  unreadMessage: {
    fontFamily: 'Mulish-ExtraBold',
    fontWeight: 'bold',
    color: '#202244', // Màu chữ cho thông báo chưa đọc
  },
  readMessage: {
    fontFamily: 'Mulish',
    color: 'black', // Màu chữ cho thông báo đã đọc
  },
  notificationTimestamp: {
    fontSize: 12,
    color: '#A0A4AB',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#202244',
    marginBottom: 15,
  },
  modalMessage: {
    fontSize: 16,
    color: '#202244',
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#0961F5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default NotificationScreen;
