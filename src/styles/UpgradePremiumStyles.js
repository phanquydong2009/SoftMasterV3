import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    buttonContainer: {
      marginTop: 110,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom : 20
    },
    button: {
      backgroundColor: '#0961F5',
      borderRadius: 16,
  
     
   width : '100%',
      height: 55,
      alignItems: 'center',
      justifyContent: 'center',
     
      elevation: 4,
    },
    buttonText: {
      color: '#F9FAFB',
      fontSize: 16,
      fontFamily: 'Mulish',
      fontWeight: '700',
      textAlign: 'center',
      lineHeight: 24,
    },
    premiumContainer: {
      marginTop: 88,
    },
    premiumRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical :15
    },
    premiumOption: {
      flex: 1,
      marginHorizontal: 8,
      padding: 16,
      borderRadius: 32,
      borderWidth: 1,
      borderColor: '#A3A4A9',
      width: 175,
      height: 150,
      flexShrink: 0,
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
    },
    imageWrapper: {
      position: 'absolute',
      top: -25,
      right: 10,
    },
    premiumImage: {
      width: 50,
      height: 50,
    },
    premiumText: {
      fontSize: 28,
      fontWeight: '700',
      fontFamily: 'Mulish',
      color: '#1F36AF',
      marginBottom: 8,
      textAlign: 'center',
    },
    priceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    priceText: {
      fontSize: 18,
      fontWeight: '600',
      fontFamily: 'Mulish',
      color: '#1F36AF',
      textAlign: 'center',
      justifyContent: 'center', 
      alignItems: 'center', 
    },
    currencyText: {
      marginLeft: 5,
      fontSize: 18,
      fontFamily:'Mulish-Bold',
      color: '#1F36AF',
      textAlign: 'center',
    },
    content: {
      marginTop: 32,
    },
    contentText: {
      fontSize: 20,
      color: '#000',
      fontFamily:'Mulish-Bold',
      textAlign: 'center',
    },
    viewHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent :"center"
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
     padding : 20,
      backgroundColor: '#FFFFFF',
    },
  });
  
export default styles;