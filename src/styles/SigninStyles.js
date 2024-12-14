import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F9FF",
        paddingTop: 20,
        paddingHorizontal: 20,
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
        marginTop: 20,
    },
    img: {
        width: 320,
        height: 160,
    },
    form: {
        marginTop: 20,
    },
    label: {
        fontFamily: 'Mulish-ExtraBold',
        color: '#0D0D0D',
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
        color: '#FF0000',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 10,
        fontFamily: 'Mulish-Bold',
    },
    checkContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    switchText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#000000',
        fontFamily: 'Mulish-Bold',
    },
    line: {
        height: 1,
        backgroundColor: '#7E7E7E',
        width: '100%',
        marginVertical: 20,
    },
    forgotPasswordText: {
        color: '#FF0000',
        fontSize: 16,
        fontFamily: 'Mulish-Bold',
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
        marginVertical: 10,
        
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius:10,
        padding: 10,
        flex: 1,
        marginHorizontal: 5,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'black'
    },
    facebookButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4267B2',
        borderRadius: 10,
        padding: 10,
        flex: 1,
        marginHorizontal: 5,
        justifyContent: 'center',
    },
    socialIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    socialTextGG: {
        color: 'black',
        fontFamily: 'Mulish-Bold',
        fontSize: 16,
    },
    socialTextFB: {
        color: '#FFFFFF',
        fontFamily: 'Mulish-Bold',
        fontSize: 16,
    },
});

export default styles;
