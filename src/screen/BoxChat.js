import React, { useState, useEffect, useRef } from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    TextInput,
    RefreshControl,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import styles from '../styles/BoxChatStyles';
import BASE_URL from '../component/apiConfig';

const BoxChat = () => {
    const route = useRoute(); // Dùng để lấy params
    const navigation = useNavigation();

    const { userID, receiverId, senderId, timestamp, senderName } = route.params || {};

    // State để lưu tin nhắn và nội dung nhập
    const [messages, setMessages] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false); // Trạng thái refresh
    const [messageContent, setMessageContent] = useState(''); // Nội dung nhập tin nhắn
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Hàm goBack để quay lại màn hình trước đó
    const goBack = () => {
        navigation.goBack();
    };

    // Hàm để lấy thông tin tin nhắn từ API
    const fetchMessages = async () => {
        try {
            const responses = await Promise.allSettled([
                axios.get(`${BASE_URL}/message/getMessages/${senderId}/${receiverId}`),
                axios.get(`${BASE_URL}/message/getMessages/${receiverId}/${senderId}`),
            ]);

            // Tìm API nào thành công đầu tiên
            const successfulResponse = responses.find(res => res.status === 'fulfilled');

            if (successfulResponse) {
                setMessages(successfulResponse.value.data.messages || []);
            } else {
                setMessages([]); // Nếu không có API nào thành công
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
            setMessages([]); // Đặt tin nhắn thành mảng rỗng nếu lỗi
        }
    };

       // Hàm gửi tin nhắn
       const sendMessage = async () => {
        if (!messageContent.trim()) return; // Kiểm tra nội dung tin nhắn
    
        // Nếu receiverId giống với userID, hoán đổi receiverId và userID
        const adjustedReceiverId = receiverId === userID ? senderId : receiverId;
    
        // Tạo tin nhắn tạm thời để hiển thị nhanh trên giao diện
        const tempMessage = {
            senderId: userID, // Gửi từ userID
            content: messageContent.trim(),
            timestamp: new Date().toISOString(),
        };
    
        // Cập nhật danh sách tin nhắn ngay lập tức trên giao diện
        setMessages((prevMessages) => [...prevMessages, tempMessage]);
    
        // Xóa nội dung nhập liệu trong ô
        setMessageContent('');
    
        try {
            // Gửi yêu cầu đến API để lưu tin nhắn
            const response = await axios.post(
                `${BASE_URL}/message/addMessage/${userID}/${adjustedReceiverId}`,
                {
                    content: messageContent.trim(),
                }
            );
    
            // Kiểm tra mã trạng thái thành công (200 hoặc 201)
            if (response.status === 200 || response.status === 201) {
                console.log('Message sent successfully:', response.data);
            } else {
                console.error('Unexpected response status:', response.status);
            }
        } catch (error) {
            console.error('Error sending message:', error.response?.data || error.message);
    
            // Nếu có lỗi, xóa tin nhắn tạm thời khỏi giao diện
            setMessages((prevMessages) =>
                prevMessages.filter((msg) => msg !== tempMessage)
            );
        }
    };
    



    // Gọi API khi component mount
    useEffect(() => {
        fetchMessages();
    }, [senderId, receiverId]);
    useEffect(() => {
        // Cuộn đến cuối khi danh sách tin nhắn thay đổi
        scrollViewRef.current?.scrollToEnd({ animated: true });
    }, [messages]);
    // Hàm để làm mới dữ liệu khi kéo xuống
    const handleRefresh = async () => {
        setIsRefreshing(true); // Hiển thị trạng thái refresh
        await fetchMessages(); // Gọi lại API để cập nhật dữ liệu
        setIsRefreshing(false); // Tắt trạng thái refresh
    };

    // Chuyển đổi timestamp thành định dạng dễ đọc
    const formatTimestamp = (timestamp) => {
        const messageDate = new Date(timestamp);
        const now = new Date();

        const differenceInMs = now - messageDate; // Khoảng cách thời gian tính bằng milliseconds
        const differenceInHours = differenceInMs / (1000 * 60 * 60); // Chuyển đổi sang giờ

        if (differenceInHours < 24) {
            // Dưới 24 giờ, hiển thị giờ
            return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else if (differenceInHours < 48) {
            // Từ 24 đến 48 giờ, hiển thị "1 ngày trước"
            return '1 ngày trước';
        } else {
            // Trên 48 giờ, hiển thị ngày tháng năm
            return messageDate.toLocaleDateString();
        }
    };

 


    const toggleSearch = () => {
        setIsSearchVisible(!isSearchVisible);
    };

    const handleSearch = (text) => {
        setSearchTerm(text);
    };

    // Tham chiếu cho ScrollView
    const scrollViewRef = useRef(null);
    return (
        <View style={styles.container}>
            {/* View Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={goBack}>
                    <Image source={require('../design/image/ic_back.png')} />
                </TouchableOpacity>
                {!isSearchVisible && (
                    <View style={styles.txtHeaderContainer}>
                        <Text style={styles.txtHeader}>{senderName}</Text>
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
            {/* Ô chữ nhật bọc viền và có nền */}
            <View style={styles.rectangle}>
                <Text style={styles.text}>Hoạt động {timestamp ? formatTimestamp(timestamp) : 'Hôm nay'}</Text>
            </View>
            <ScrollView
                ref={scrollViewRef}
                style={styles.ScrollViewChat}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={handleRefresh} // Gọi hàm làm mới
                    />
                }
            >

                {/* Lặp qua các tin nhắn */}
                {messages.length > 0 ? (
                    messages.map((message, index) => {
                        const isSender = message.senderId === userID;
                        const messageContainsSearchTerm =
                            searchTerm && message.content.toLowerCase().includes(searchTerm.toLowerCase());

                        return (
                            <View key={index} style={styles.chatContainer}>
                                {isSender ? (
                                    <View
                                        style={[
                                            styles.chatBubble2,
                                            { alignSelf: 'flex-end' },
                                            messageContainsSearchTerm && { backgroundColor: '#ffeb3b' },
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.messageText,
                                                { color: '#202244' },
                                                messageContainsSearchTerm && { fontWeight: 'bold' },
                                            ]}
                                        >
                                            {message.content}
                                        </Text>
                                        <Text style={[styles.timeText, { color: '#202244' }]}>
                                            {formatTimestamp(message.timestamp)}
                                        </Text>
                                    </View>
                                ) : (
                                    <View
                                        style={[
                                            styles.chatBubble1,
                                            { alignSelf: 'flex-start' },
                                            messageContainsSearchTerm && { backgroundColor: '#ffeb3b' },
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.messageText,
                                                { color: '#FFFFFF' },
                                                messageContainsSearchTerm && { fontWeight: 'bold' },
                                            ]}
                                        >
                                            {message.content}
                                        </Text>
                                        <Text style={[styles.timeText, { color: '#FFFFFF' }]}>
                                            {formatTimestamp(message.timestamp)}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        );
                    })
                ) : (
                    <Text style={styles.noMessagesText}>Không có tin nhắn</Text>
                )}
            </ScrollView>

            {/* Input Chat */}
            <View style={styles.inputContainer}>
                <TouchableOpacity>
                    <Image source={require('../design/image/upanh.png')} style={styles.iconUpImage} />
                </TouchableOpacity>
                <TextInput
                    placeholder="Nhập nội dung tin nhắn"
                    style={styles.input}
                    value={messageContent}
                    onChangeText={(text) => setMessageContent(text)} // Cập nhật nội dung nhập
                />

                <TouchableOpacity onPress={sendMessage}>
                    <Image source={require('../design/image/ic_send.png')} style={styles.iconSend} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default BoxChat;
