import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    containerButton: {
      flex: 1,
      justifyContent: 'flex-end',
    },
  
    buttonContainer: {
      marginBottom: 10,
    },
  
    button: {
      backgroundColor: '#0961F5',
      borderRadius: 16,
      height: 56,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.16,
      shadowRadius: 4,
      elevation: 4,
    },
  
    buttonText: {
      color: '#F9FAFB',
      fontSize: 16,
      fontFamily: 'Mulish-ExtraBold',
      textAlign: 'center',
      lineHeight: 24,
    },
    qrCodeContainer: {
      marginTop: 53,
    },
    qrInfo: {
      alignItems: 'center',
      marginBottom: 24,
    },
    qrImage: {
      width: 150,
      height: 150,
    },
    qrText: {
      fontSize: 20,
      fontFamily: 'Mulish-ExtraBold',
      color: '#0961F5',
      marginTop: 12,
    },
    accountInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    contentInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    paymentInfo: {
      marginBottom: 16,
    },
    paymentRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    infoLabel1: {
      fontSize: 16,
      fontFamily: 'Mulish-ExtraBold',
      color: '#0B1875',
    },
    infoLabel: {
      fontSize: 18,
      fontFamily: 'Mulish-ExtraBold',
      color: '#0961F5',
    },
    infoValue: {
      fontSize: 18,
      fontFamily: 'Mulish-ExtraBold',
      color: '#0961F5',
    },
    totalAmount: {
      fontSize: 20,
      fontFamily: 'Mulish-ExtraBold',
      color: '#0B1875',
      textAlign: 'right',
    },
    period: {
      fontSize: 14,
      fontFamily: 'Mulish-ExtraBold',
      color: '#13248D',
      textAlign: 'right',
  
      right: 30,
    },
    contentContainer2: {
      marginTop: 37,
    },
    contentText2: {
      fontSize: 20,
      fontFamily: 'Mulish-ExtraBold',
      color: '#0B1875',
      lineHeight: 26,
    },
    contentContainer: {
      marginTop: 28,
    },
    contentText: {
      fontSize: 20,
      fontFamily: 'Mulish-ExtraBold',
      color: '#0B1875',
      lineHeight: 26,
    },
    paymentContainer: {
      marginTop: 23,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    paymentButton: {
      borderRadius: 10,
      borderWidth: 1,
      borderColor: 'rgba(37, 37, 28, 0.30)',
      width: 96,
      height: 60,
      flexShrink: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    viewHeader: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    viewTextHeader: {
      color: '#191B28',
      fontSize: 20,
      fontFamily: 'Mulish-ExtraBold',
      textAlign: 'center',
      flex: 1,
    },
    container: {
      flex: 1,
     padding : 25,
      backgroundColor: '#FFFFFF',
    },
  });
export default styles;