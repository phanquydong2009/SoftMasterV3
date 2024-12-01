import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    // Style cho popup
    popupOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu nền tối mờ
    },
    popupContainer: {
      width: 300,
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
      elevation: 5, // Đổ bóng
    },
    popupImage: {
      width: 100,
      height: 100,
      marginBottom: 10,
    },
    popupTitle: {
      fontSize: 18,
      fontFamily: 'Mulish-ExtraBold',
      marginBottom: 5,
    },
    popupMessage: {
      fontSize: 14,
      fontFamily: 'Mulish-Bold',
      textAlign: 'center',
      marginBottom: 15,
    },
    popupButton: {
      backgroundColor: '#007bff',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    popupButtonText: {
      color: 'white',
      fontSize: 16,
    },
    
      txtButton: {
        fontFamily: 'Mulish-ExtraBold',
        color: '#FFFFFF',
        fontSize: 19,
        flex: 1,
        textAlign: 'center',
        marginLeft: 50,
      },
      button: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        backgroundColor: "#0961F5",
        width: '100%',
        height: 60,
        borderRadius: 30,
        marginTop: 50,
        paddingHorizontal: 15,
      },
      continueIcon: {
        width: 50,
        height: 50,
      },
      inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        height: 60,
        borderRadius: 15,
        marginTop: 15,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
      },
      textInput: {
        flex: 1,
        fontSize: 15,
        fontFamily: 'Mulish-Bold',
        color: '#505050',
      },
      icon: {
        width: 32,
        height: 32,
        marginHorizontal: 10,
      },
      body: {
        flexDirection: 'column',
        alignItems: 'center',
      },
      avatar_container: {
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
      circleBorder: {
        borderRadius: 70,
        borderWidth: 4,
        borderColor: '#167F71',
        justifyContent: 'center',
        alignItems: 'center',
      },
      avatar: {
        width: 110,
        height: 110,
        borderRadius: 60,
      },
      overlayImage: {
        position: 'absolute',
        bottom: -8,
      },
      txtTitle: {
        fontSize: 23,
        fontFamily: 'Mulish-ExtraBold',
        color: '#202244',
        paddingLeft: 20,
      },
      header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      container: {
        flex: 1,
        backgroundColor: '#F5F9FF',
        padding: 20,
      },
      modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContainer: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        padding: 20,
      },
      option: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
      },
      optionIcon: {
        width: 30,
        height: 30,
        marginRight: 15,
      },
      optionText: {
        fontSize: 18,
        fontFamily: 'Mulish-Bold',
      },
      footer: {
        marginTop: 20,
      },
    });

export default styles;
