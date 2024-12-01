import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Mulish } from 'expo-font';

const CardInfo = ({ cardNumber, expirationDate, cardHolder, showCardNumber }) => {
    return (
        <ImageBackground
            source={require('../design/image/icon_card.png')} // Replace with your background image path
            style={styles.infoCard}
            imageStyle={{ borderRadius: 12 }} // Optional: add border radius to the background image
        >
            <Text style={styles.cardNumber}>
                {showCardNumber ? cardNumber : '**** **** **** ' + cardNumber.slice(-4)}
            </Text>
            <View style={styles.expirationContainer}>
                <View>
                    <Text style={styles.expirationText}>VAILD</Text>
                    <Text style={styles.expirationText}>THRU</Text>
                </View>
                <Text style={styles.expirationDate}>{expirationDate}</Text>
            </View>
            <Text style={styles.cardHolder}>{cardHolder.toUpperCase()}</Text>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    infoCard: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        borderRadius: 12,
        overflow: 'hidden',
        marginTop: 20
    },
    cardNumber: {
        fontFamily: 'Mulish-ExtraBold',
        fontSize: 24,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    expirationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    expirationText: {
        color: '#FFFFFF',
        fontFamily: 'Mulish-Bold',
        marginRight: 8,
    },
    expirationDate: {
        fontSize: 18,
        fontFamily: 'Mulish-ExtraBold',
        color: '#FFFFFF',
    },
    cardHolder: {
        fontSize: 18,
        fontFamily: 'Mulish-ExtraBold',
        color: '#FFFFFF',
        marginTop: 16,
    },
});

export default CardInfo;
