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
        paddingHorizontal: 16,
        paddingVertical: 12,
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
        fontWeight: '700',
        color: '#202244',
        fontFamily: 'Mulish',
        lineHeight: 24,
        marginLeft: 16,
        flex: 1,
    },
    notificationItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        marginTop: 20,
        marginBottom: 10,
    },
    notificationText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    outer: {
        width: 60,
        height: 30,
        backgroundColor: 'gray',
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
});



export default styles;
