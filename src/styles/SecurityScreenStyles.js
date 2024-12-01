import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 15,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
   
        backgroundColor: '#fff',
    },
    backButton: {
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backIcon: {
        width: 30,
        height: 20,
        tintColor: '#202244',
    },
    headerText: {
        fontSize: 21,
        color: '#202244',
        fontFamily: 'Mulish-ExtraBold',
        lineHeight: 24,
        marginLeft: 16,
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      
    },
    securityIcon: {
        width: '100%',
        height: 300,

    },
    textContainer: {
        marginTop: 20,
        width: '90%',
        alignItems: 'center',
    },
    securityText: {
        fontSize: 16,
     
        fontFamily: 'Mulish-Bold',
        color: '#202244',
        textAlign: 'center',
    },
    switchContainer: {
        padding:20,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        width: '90%',
    },
    switchText: {
        fontSize: 16,
       
        fontFamily: 'Mulish-Bold',
        color: '#202244',
        flex: 1,
    },
    outer: {
        width: 60,
        height: 30,
        backgroundColor: '#E8F1FF',
        borderRadius: 15,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 2,
        justifyContent: 'flex-start',
    },
    inner: {
        width: 26,
        height: 26,
        backgroundColor: 'white',
        borderRadius: 15,
        elevation: 8,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.15,
        shadowRadius: 2,
    },
    infoButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 15,
        width: '90%',
        padding: 15,
        marginTop: 20,
        elevation: 3,
        justifyContent: 'center',
    },
    passwordButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0961F5',
        borderRadius: 15,
        width: '90%',
        padding: 15,
        marginTop: 15,
        elevation: 3,
        justifyContent: 'center',
    },
    infoButtonText: {
        fontSize: 16,
    
        fontFamily: 'Mulish-Bold',
        color: '#000000',
    },
    passwordButtonText: {
        fontSize: 16,
       
        fontFamily: 'Mulish-Bold',
        color: '#ffffff',
        flex: 1,
        textAlign: 'center',
    },
    buttonIcon: {
        width: 30,
        height: 30,
        marginLeft: 10,
    },
});

 export default styles;