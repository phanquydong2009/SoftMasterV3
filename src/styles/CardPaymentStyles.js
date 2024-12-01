import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F8F9',
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 20,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    viewHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    viewTextHeader: {
        fontSize: 20,
        fontFamily: 'Mulish-Bold',
        color: '#202244',
        marginLeft: 10,
    },
    stepWrapper: {
        marginBottom: 20,
    },
    stepContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    step: {
        alignItems: 'center',
    },
    icon: {
        width: 24,
        height: 24,
    },
    stepText: {
        fontSize: 14,
        fontFamily: 'Mulish-Bold',
        color: '#202244',
        marginTop: 8,
    },
    line: {
        height: 2,
        flex: 1,
    },
    button: {
        backgroundColor: '#167F71',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 20,
        marginBottom: 20,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'Mulish-Bold',
    },
    finalStep: {
        alignItems: 'center',
        marginVertical: 20,
    },
    finalIcon: {
        width: 40,
        height: 40,
        marginBottom: 10,
    },
    finalText: {
        fontSize: 18,
        fontFamily: 'Mulish-Bold',
        color: '#167F71',
    },
    finalMessage: {
        fontSize: 16,
        fontFamily: 'Mulish-Regular',
        color: '#202244',
        textAlign: 'center',
    },
    stepTwoText: {
        fontSize: 16,
        fontFamily: 'Mulish-Regular',
        color: '#202244',
        textAlign: 'center',
        marginVertical: 20,
    },
    keyboardAvoidingView: {
        flex: 1,
    },
});


export default styles;
