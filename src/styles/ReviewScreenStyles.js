import { StyleSheet } from 'react-native'; 
const styles = StyleSheet.create({



  
    ViewAll: {  
      paddingBottom: 20, 
      alignItems: 'center', 
    },
    btnViewAllReview: {
      width: '100%',
      borderRadius: 25,
      height: 55,
      backgroundColor: "#FFFFFF",
      borderWidth: 1,
      borderColor: '#99A1CE',
      justifyContent: "center",
      alignItems: "center",
    },
    txtViewAllReview: {
      color: '#0A0C2C',
      fontFamily: "Mulish-ExtraBold",
      fontSize: 20,
    },
    count_number: {
      width: 30,
      height: 30,
      backgroundColor: '#A3A4A9',
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 10,
    },
    count_numberText: {
      color: '#191B28',
      fontSize: 20,
      fontFamily: 'Mulish-ExtraBold',
    },
    count_txt: {
      color: '#191B28',
      fontFamily: 'Mulish-ExtraBold',
      fontSize: 16,
    },
    countReview: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginTop: 20,
    },
    input: {
      height: 120,
      width: '100%',
      backgroundColor: "#F0F0F0",
      borderRadius: 10,
      paddingHorizontal: 10,
      marginBottom: 20,
    },
    submitButton: {
      height: 50,
      backgroundColor: '#000000',
      borderRadius: 30,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    submitText: {
      color: '#FFFFFF',
      fontFamily: 'Mulish-ExtraBold',
      fontSize: 16,
    },
    star: {
      width: 40,
      height: 40,
      margin: 5,
    },
    txt_titleReview: {
      fontFamily: 'Mulish-ExtraBold',
      color: '#242424',
      fontSize: 16,
      marginBottom: 10,
    },
    rate_container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 15,
      marginBottom: 20,
    },
    formReview: {
      padding: 20,
      backgroundColor: '#F7F7F7',
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 10,
      borderRadius: 10,
    },
    container: {
      flex: 1,
      padding: 15,
      flexDirection: 'column',
      backgroundColor: '#FFFFFF',
    },
    header: {
      backgroundColor: '#FFFFFF',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems :"center",
      marginBottom: 20,
    },
    txtHeader: {
      color: "#0D0D0D",
      fontFamily: "Mulish-ExtraBold",
      fontSize: 20,
      paddingLeft: 20,
  },
    review_container: {
      marginVertical: 10,
      paddingHorizontal: 10,
    },
    reviewItem: {
      backgroundColor: '#F8F8F8',
      borderRadius: 20,
      padding: 10,
      marginBottom: 10,
      borderWidth : 1,
      borderColor :'#99A1CE',
      marginTop : 5
    },
    reviewText: {
      fontSize: 18,
      fontFamily: 'Mulish-Bold',
      color: '#808080',
    },
    reviewComment: {
      fontFamily: 'Mulish-Regular',
      fontSize: 16,
      color: '#242424',
      marginVertical: 20,
    },
    reviewTime: {
      fontSize: 15,
      color: '#808080',
      fontFamily: 'Mulish-Regular',
    },
    modal: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorModal: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      width: '90%',
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
      alignContent :"center"
    },
    modalTitle: {
      fontSize: 18,
      fontFamily: 'Mulish-ExtraBold',
      color: '#46B25C',
      marginVertical: 10,
    },
    modalMessage: {
      textAlign :"center",
      fontSize: 16,
      color: '#555',
      marginBottom: 20,
      fontFamily: 'Mulish-Bold',
    },
    modalButton: {
      backgroundColor: '#000000',
      borderRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    modalButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontFamily: 'Mulish-ExtraBold',
    },
  });
export default styles;