import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

const InputForm = ({
    cardNumber, setCardNumber, expirationDate, setExpirationDate,
    cardHolder, setCardHolder, cvv, setCvv,
    showCardNumber, setShowCardNumber, showCvv, setShowCvv
}) => {
    return (
        <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Tên trên thẻ*</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={setCardHolder}
                    value={cardHolder}
                    placeholder="Nhập tên trên thẻ"
                />
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Số thẻ*</Text>
                <View style={styles.inputWithIcon}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={setCardNumber}
                        value={cardNumber}
                        secureTextEntry={!showCardNumber}
                        keyboardType="numeric"
                        placeholder="Nhập số thẻ"
                    />
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => setShowCardNumber(!showCardNumber)}
                    >
                        <Image
                            source={
                                showCardNumber
                                    ? require('../design/image/ic_eyeShow.png')
                                    : require('../design/image/ic_eyeHint.png')
                            }
                            style={styles.iconImage}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.expiryCVVContainer}>
                <View style={styles.expiryInput}>
                    <Text style={styles.inputLabel}>Ngày hết hạn*</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={setExpirationDate}
                        value={expirationDate}
                        placeholder="MM/YY"
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.cvvInput}>
                    <Text style={styles.inputLabel}>CVV*</Text>
                    <View style={styles.inputWithIcon}>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={setCvv}
                            value={cvv}
                            secureTextEntry={!showCvv}
                            keyboardType="numeric"
                            placeholder="CVV"
                        />
                        <TouchableOpacity
                            style={styles.iconButton}
                            onPress={() => setShowCvv(!showCvv)}
                        >
                            <Image
                                source={
                                    showCvv
                                        ? require('../design/image/ic_eyeShow.png')
                                        : require('../design/image/ic_eyeHint.png')
                                }
                                style={styles.iconImage}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        marginTop: 13,
    },
    inputGroup: {
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 16,
        fontFamily: 'Mulish-ExtraBold',
        color: '#202244',
        marginBottom: 8,
    },
    textInput: {
        borderColor: '#E0E0E0',
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 12,
        fontSize: 16,
        fontFamily: 'Mulish-Bold',
        color: '#000',
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 2,
        flex: 1,
    },
    iconButton: {
        position: 'absolute',
        right: 12,
        top: '50%',
        transform: [{ translateY: -12 }],
    },
    iconImage: {
        width: 24,
        height: 24,
    },
    inputWithIcon: {
        position: 'relative',
    },
    expiryCVVContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    expiryInput: {
        flex: 0.5,
        marginRight: 8,
    },
    cvvInput: {
        flex: 0.5,
    },
});

export default InputForm;
