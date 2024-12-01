import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        padding: 20,
        justifyContent: 'space-between', 
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
    },
    txtHeader: {
        color: "#0D0D0D",
        fontFamily: "Mulish-ExtraBold",
        fontSize: 20,
        paddingLeft: 20,
    },
    imgBack: {
        width: 30,
        height: 20,
    },
    imgContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    img: {
        width: 160,
        height: 160,
    },
    form: {
        marginTop: 20,
    },
    label: {
        fontFamily: 'Mulish-ExtraBold',
        color: "#0D0D0D",
        marginVertical: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 10,
        height: 50,
        marginBottom: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
    },
    inputIcon: {
        width: 30,
        height: 30,
        padding: 2,
        marginRight: 10,
    },
    eyeIcon: {
        width: 25,
        height: 25,
    },
    errorText: {
        color: "#FF0000",
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 10,
    },
    line: {
        borderBottomColor: '#CCCCCC',
        borderBottomWidth: 1,
        marginVertical: 20,
    },
    btnLogin: {
        borderRadius: 20,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    txtLogin: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: "Mulish-ExtraBold",
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalImage: {
        width: 150,
        height: 150,
    },
    modalText1: {
        fontSize: 20,
        fontFamily: 'Mulish-ExtraBold',
        marginVertical: 10,
              color :"#202244"
    },
    modalText: {
        textAlign: 'center',
        marginBottom: 15,
        fontSize: 18,
        color :"#202244"
    },
    modalButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    modalButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});

export default styles;
