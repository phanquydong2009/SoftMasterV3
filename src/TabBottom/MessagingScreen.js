import React, { useState, useEffect } from 'react';
import {
  FlatList,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';
import styles from '../stylesTabBottom/MessagingScreenStyles';
import BASE_URL from '../component/apiConfig';

const parseTime = (timeStr) => {
  const now = moment();
  const time = moment(timeStr, 'YYYY-MM-DD HH:mm:ss');
  const diffMinutes = now.diff(time, 'minutes');
  const diffHours = now.diff(time, 'hours');
  const diffDays = now.diff(time, 'days');

  if (diffMinutes < 60) {
    return `${diffMinutes} phút trước`;
  } else if (diffHours < 24) {
    return `${diffHours} giờ trước`;
  } else if (diffDays === 1) {
    return '1 ngày trước';
  } else if (diffDays > 1) {
    return `${diffDays} ngày trước`;
  }

  return time.format('YYYY-MM-DD');
};

const MessagingScreen = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [noConversationsMessage, setNoConversationsMessage] = useState(''); 
  const navigation = useNavigation();
  const route = useRoute();

  const { userID } = route.params || {};

  const fetchConversations = async () => {
    try {
      const response = await fetch(`${BASE_URL}/message/getConversationsForUser/${userID}`);
      const conversations = await response.json();

      // Ensure conversations is an array, even if empty or undefined
      const validConversations = Array.isArray(conversations) ? conversations : [];

      const getConversationDetails = async (conversation) => {
        const [teacher, messagesData] = await Promise.all([
          fetch(`${BASE_URL}/teacher/getTeacherByID/${conversation._id}`).then(res => res.json()),
          fetch(`${BASE_URL}/message/getMessages/${userID}/${conversation._id}`).then(res => res.json())
        ]);

        const { avatar } = teacher;
        const messages = messagesData.messages || [];
        const latestMessage = messages.sort((a, b) => b.timestamp - a.timestamp)[0] || {};

        const status = latestMessage.senderId === userID ? 'watch' : 'notwatch';

        const senderId = latestMessage.senderId || null;
        const receiverId = latestMessage.receiverId || null;

        return {
          ...conversation,
          nameUser: conversation.name || 'Unknown User',
          IdSender: conversation._id,
          avatarSender: avatar || 'default-avatar-url',
          content: latestMessage.content || '',
          time: latestMessage.timestamp ? moment(latestMessage.timestamp).format('YYYY-MM-DD HH:mm:ss') : '',
          numberOfMessages: messages.length,
          status: status,
          senderId,
          receiverId,
        };
      };

      // Update message when no conversations exist
      if (validConversations.length === 0) {
        setConversations([]);
        setFilteredData([]);
        setNoConversationsMessage('Hộp thư của bạn trống');
      } else {
        const updatedData = await Promise.all(validConversations.map(getConversationDetails));
        setConversations(updatedData);
        setFilteredData(updatedData);
        setNoConversationsMessage(''); // Reset message when there are conversations
      }
    } catch (error) {
      console.error(error);
      setFilteredData([]);
      setNoConversationsMessage('Không thể tải hộp thư');
    }
  };

  useEffect(() => {
    fetchConversations();
  }, [userID]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchConversations();
    setIsRefreshing(false);
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSearch = (text) => {
    setSearchTerm(text);
    const filtered = conversations.filter((item) =>
      item.nameUser.toLowerCase().includes(text.toLowerCase()) ||
      item.content.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const sortedData = [...filteredData].sort((a, b) => {
    const timeA = moment(a.time, 'YYYY-MM-DD HH:mm:ss').valueOf();
    const timeB = moment(b.time, 'YYYY-MM-DD HH:mm:ss').valueOf();
    return timeB - timeA;
  });

  // Handle item click
  const handleItemClick = (item) => {
    const { status, receiverId, senderId, nameUser, time } = item;

    // Cập nhật trạng thái trực tiếp trong dữ liệu
    if (status === 'notwatch') {
      item.status = 'watch'; // Thay đổi trạng thái cục bộ
    }

    // Chuẩn bị dữ liệu để truyền
    const data = {
      userID,
      receiverId,
      senderId,
      timestamp: time,
      senderName: nameUser,
      receiverName: nameUser,
    };

    // Log dữ liệu trước khi chuyển hướng
    console.log('Dữ liệu truyền đến BoxChat:', data);

    // Chuyển hướng đến màn hình BoxChat
    navigation.navigate('BoxChat', data);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleItemClick(item)}
    >
      <View style={styles.avatarContainer}>
        <Image
          source={item.avatarSender ? { uri: item.avatarSender } : require('../design/image/noprofile.png')}
          style={styles.avatar}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.nameUser}>{item.nameUser}</Text>
        <Text
          style={[
            styles.content,
            item.status === 'notwatch' ? styles.contentNotWatched : styles.contentWatched
          ]}
        >
          {item.content && item.content.length > 50
            ? `${item.content.substring(0, 50)}...`
            : item.content || ''}
        </Text>
      </View>
      <View style={styles.numberMessagesContainer}>
        {item.numberOfMessages > 0 && item.status === 'notwatch' ? (
          <>
            <Text style={styles.numberMessages}>{item.numberOfMessages}</Text>
            <Text style={styles.time}>{parseTime(item.time)}</Text>
          </>
        ) : (
          <Text style={styles.time}>{parseTime(item.time)}</Text>
        )}
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
            <Text style={styles.txtHeader}>Nhắn tin</Text>
          </View>
        )}
        {isSearchVisible && (
          <View style={[styles.searchContainer, styles.searchContainerExpanded]}>
            <TextInput
              style={styles.searchInput}
              placeholder="Tìm kiếm..."
              placeholderTextColor="#A0A4AB"
              value={searchTerm}
              onChangeText={handleSearch}
            />
          </View>
        )}
        <TouchableOpacity onPress={toggleSearch}>
          <Image source={require('../design/image/ic_search.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        {noConversationsMessage ? (
          <FlatList
            data={[]}
            renderItem={() => <Text style={styles.emptyInboxMessage}>{noConversationsMessage}</Text>}
            keyExtractor={() => 'no-conversations'}
            refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
          />
        ) : (
          <FlatList
            data={sortedData}
            renderItem={renderItem}
            keyExtractor={(item) => item.nameUser + item._id}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            onRefresh={handleRefresh}
            refreshing={isRefreshing}
            refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
          />
        )}
      </View>
    </View>
  );
};

export default MessagingScreen;
