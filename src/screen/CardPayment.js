import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import CardInfo from '../component/CardInfo';
import InputForm from '../component/InputForm';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/CardPaymentStyles';
const CardPayment = () => {
    const navigation = useNavigation(); 
    // chuyển trang
    const handleBackToHome = () => {
        navigation.navigate('Tabs'); 
    };
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [cvv, setCvv] = useState('');
    const [showCardNumber, setShowCardNumber] = useState(false);
    const [showCvv, setShowCvv] = useState(false);
    const [isStepOneComplete, setIsStepOneComplete] = useState(true);  // Step 1 
    const [isStepTwoComplete, setIsStepTwoComplete] = useState(false); // Step 2 is 
    const [isStepThreeComplete, setIsStepThreeComplete] = useState(false); // Step 3 


   
    const handleSubmit = () => {
        if (!isStepOneComplete) {
            setIsStepOneComplete(true);
        } else if (isStepOneComplete && !isStepTwoComplete) {
            setIsStepTwoComplete(true);
        } else if (isStepTwoComplete && !isStepThreeComplete) {
            setIsStepThreeComplete(true);
        }
    };

    // Determine image sources based on the current step
    const getStepImage = (stepNumber) => {
        if (stepNumber === 1) {
            return isStepOneComplete ? require('../design/image/icon_done.png') : require('../design/image/icon_nodone.png');
        } else if (stepNumber === 2) {
            return isStepTwoComplete ? require('../design/image/icon_done.png') : require('../design/image/icon_nodone.png');
        } else {
            return isStepThreeComplete ? require('../design/image/icon_done.png') : require('../design/image/icon_nodone.png');
        }
    };

    // Determine line color based on the current step
    const getLineColor = (stepNumber) => {
        if (stepNumber === 1) {
            return isStepOneComplete ? '#167F71' : '#D0D0D0';
        } else if (stepNumber === 2) {
            return isStepTwoComplete ? '#167F71' : '#D0D0D0';
        } else {
            return isStepThreeComplete ? '#167F71' : '#D0D0D0';
        }
    };

    // Determine button text based on the current step
    const getButtonText = () => {
        if (isStepThreeComplete) {
            return 'Hoàn tất';
        } else if (isStepTwoComplete) {
            return 'Thanh toán ngay';
        } else {
            return 'Thêm thẻ mới';
        }
    };

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                style={styles.keyboardAvoidingView}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.select({ ios: 0, android: 100 })}
            >
                <View style={styles.innerContainer}>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
                        {/* Header */}
                        <View style={styles.viewHeader}>
                            <TouchableOpacity onPress={handleBackToHome}>
                                <Image source={require('../design/image/ic_back.png')} />
                            </TouchableOpacity>
                            <Text style={styles.viewTextHeader}>Phương thức thanh toán</Text>
                        </View>

                        {/* Steps */}
                        <View style={styles.stepWrapper}>
                            <View style={styles.stepContainer}>
                                <View style={styles.step}>
                                    <Image
                                        source={getStepImage(1)}
                                        style={styles.icon}
                                    />
                                    <Text style={styles.stepText}>Chi tiết</Text>
                                </View>

                                <View
                                    style={[styles.line, { backgroundColor: getLineColor(1), bottom: 10 }]}
                                />
                                <View style={styles.step}>
                                    <Image
                                        source={getStepImage(2)}
                                        style={styles.icon}
                                    />
                                    <Text style={styles.stepText}>Thanh toán</Text>
                                </View>

                                <View
                                    style={[styles.line, { backgroundColor: getLineColor(2), bottom: 10 }]}
                                />
                                <View style={styles.step}>
                                    <Image
                                        source={getStepImage(3)}
                                        style={styles.icon}
                                    />
                                    <Text style={styles.stepText}>Xác nhận</Text>
                                </View>
                            </View>
                        </View>

                        {/* Conditional Rendering */}
                        {isStepOneComplete && !isStepTwoComplete && (
                            <>
                                <CardInfo
                                    cardNumber={cardNumber}
                                    expirationDate={expirationDate}
                                    cardHolder={cardHolder}
                                    showCardNumber={showCardNumber}
                                />
                                <InputForm
                                    cardNumber={cardNumber}
                                    setCardNumber={setCardNumber}
                                    expirationDate={expirationDate}
                                    setExpirationDate={setExpirationDate}
                                    cardHolder={cardHolder}
                                    setCardHolder={setCardHolder}
                                    cvv={cvv}
                                    setCvv={setCvv}
                                    showCardNumber={showCardNumber}
                                    setShowCardNumber={setShowCardNumber}
                                    showCvv={showCvv}
                                    setShowCvv={setShowCvv}
                                />
                            </>
                        )}

                        {isStepOneComplete && isStepTwoComplete && !isStepThreeComplete && (
                            <>
                                <CardInfo
                                    cardNumber={cardNumber}
                                    expirationDate={expirationDate}
                                    cardHolder={cardHolder}
                                    showCardNumber={showCardNumber}
                                />
                                <Text style={styles.stepTwoText}>Thông tin thẻ đã được cập nhật!</Text>
                            </>
                        )}

                        {isStepTwoComplete && isStepThreeComplete && (
                            <View style={styles.finalStep}>
                                <Image
                                    source={require('../design/image/icon_done.png')}
                                    style={styles.finalIcon}
                                />
                                <Text style={styles.finalText}>Hoàn tất</Text>
                                <Text style={styles.finalMessage}>Bạn đã thêm thẻ thành công!</Text>
                            </View>
                        )}
                    </ScrollView>

                    {/* Button */}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.buttonText}>
                            {getButtonText()}
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};


export default CardPayment;
