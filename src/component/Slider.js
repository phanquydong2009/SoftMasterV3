import React, { useRef, useState, useEffect } from 'react';
import { View, FlatList, Image, Dimensions } from 'react-native';
import styles from '../styles/HomeScreenStyles';

const { width } = Dimensions.get('window');

// Danh sách hình ảnh cho slider
const images = [
    require('../design/image/slide1.jpg'),
    require('../design/image/slide2.jpg'),
    require('../design/image/slide3.png'),
    require('../design/image/slide4.jpg'),
    require('../design/image/slide5.jpg'),
];

const Slider = () => {
    const [currentIndex, setCurrentIndex] = useState(0); // Index của hình ảnh slider hiện tại
    const flatListRef = useRef(null);
    const autoScrollTimeout = useRef(null);

    // Hàm tự động cuộn slider
    const startAutoScroll = () => {
        autoScrollTimeout.current = setTimeout(() => {
            const nextIndex = (currentIndex + 1) % images.length;
            setCurrentIndex(nextIndex);
            flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
        }, 2000);
    };

    // Dừng tự động cuộn khi component unmount
    const stopAutoScroll = () => {
        if (autoScrollTimeout.current) {
            clearTimeout(autoScrollTimeout.current);
        }
    };

    // Tự động bắt đầu cuộn khi component mount
    useEffect(() => {
        startAutoScroll();
        return stopAutoScroll;
    }, [currentIndex]);

    // Cập nhật index sau khi cuộn hoàn tất
    const handleMomentumScrollEnd = (event) => {
        const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
        setCurrentIndex(newIndex);
    };

    // Hàm render mỗi item trong slider
    const renderItem = ({ item }) => (
        <View style={styles.slide}>
            <Image source={item} style={styles.slideImage} />
        </View>
    );

    // Hàm xác định kích thước của dot trong slider
    const dotSize = (index) => (index === currentIndex ? { width: 18, height: 8 } : { width: 8, height: 8 });

    // Hàm xác định màu sắc của dot trong slider
    const dotColor = (index) => (index === currentIndex ? '#FAC840' : '#1A6EFC');

    return (
        <View style={styles.slide_container}>
            <FlatList
                ref={flatListRef}
                data={images}
                renderItem={renderItem}
                keyExtractor={(item, index) => `image-${index}`}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={handleMomentumScrollEnd}
                getItemLayout={(data, index) => ({ length: width, offset: width * index, index })}
            />
            <View style={styles.dotContainer}>
                {images.map((_, index) => (
                    <View
                        key={index}
                        style={[styles.dot, dotSize(index), { backgroundColor: dotColor(index) }]}
                    />
                ))}
            </View>
        </View>
    );
};

export default Slider;
