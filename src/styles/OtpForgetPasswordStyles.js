import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        padding: 20,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
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
    body: {
        justifyContent: "center",
        alignItems: 'center',
        marginTop: 30,
    },
    image: {
        marginTop: 20,
        marginBottom: 10,
    },
    txt_body: {
        fontSize: 18,
        color: "#0D0D0D",
        fontFamily: "Mulish-ExtraBold",
        textAlign: 'center',
        marginBottom: 30,
    },
    input_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    input_number: {
        width: 50,
        height: 70,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
        fontSize: 30,
        color: '#000',
        fontFamily: 'Mulish-ExtraBold',
        backgroundColor: "#FFFFFF",
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    errorMessage: {
        color: '#D32F2F',
        fontFamily: 'Mulish-ExtraBold',
        fontSize: 15,
        marginBottom: 10,
    },
    buttonContainer: {
        justifyContent: 'flex-end',
        paddingTop:180, 
    },
    confirmButton: {
        height: 46,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 10,
    },
    confirmButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'Mulish-Bold',
    },
});



export default styles;
