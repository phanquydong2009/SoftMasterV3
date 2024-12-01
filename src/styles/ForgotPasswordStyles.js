import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    txtHeader: {
        color: '#0D0D0D',
        fontFamily: 'Mulish-ExtraBold',
        fontSize: 20,
        paddingLeft: 20,
    },
    imgBack: {
        width: 30,
        height: 20,
    },
    imgContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
    },
    img: {
        width: 220,
        height: 220,
    },
    label: {
        fontFamily: 'Mulish-ExtraBold',
        color: '#0D0D0D',
        marginTop: 80,
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
    checkContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    txtSignIn: {
        marginLeft: 10,
        fontSize: 16,
        color: '#000000',
        fontFamily: 'Mulish-Bold',
    },
    txtSignUp: {
        marginLeft: 10,
        fontSize: 16,
        color: '#FF0000',
        fontFamily: 'Mulish-Bold',
    },
    line: {
        height: 1,
        backgroundColor: '#7E7E7E',
        width: '100%',
        marginVertical: 30,
    },
    error: {
        color: 'red',
        marginVertical: 5,
        fontFamily: 'Mulish-Bold',
        textAlign: 'center',
    },
    btnLogin: {
        backgroundColor: '#0961F5',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: 10,
        marginTop: 20,
    },
    txtLogin: {
        fontSize: 17,
        color: '#FFFFFF',
        fontFamily: 'Mulish-Bold',
    },
    orContainer: {
        alignItems: 'center',
        marginVertical: 10,
        marginTop: 20,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    lineOr: {
        height: 1,
        backgroundColor: '#4CAF50',
        width: '40%',
    },
    txtOr: {
        fontFamily: 'Mulish-Bold',
        paddingHorizontal: 15,
        color: '#000000',
    },
    socialButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderColor: '#000000',
        borderWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 3,
        borderRadius: 10,
    },
    facebookButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1877F2',
        paddingHorizontal: 20,
        paddingVertical: 3,
        borderRadius: 10,
    },
    socialIcon: {
        width: 25,
        height: 25,
        marginRight: 10,
    },
    socialTextFB: {
        fontFamily: 'Mulish-Bold',
        fontSize: 13,
        color: '#FFFFFF',
    },
    socialTextGG: {
        fontSize: 16,
        fontFamily: 'Mulish-Bold',
        color: '#191B28',
    },
});



export default styles;
