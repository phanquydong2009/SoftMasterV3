import { StyleSheet } from 'react-native'; 

const styles = StyleSheet.create({

    noResultsText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#888',
    },
    txtView: {
        fontFamily: "Mulish-ExtraBold",
        fontSize: 16,
        color: '#0961F5'
    },
    title: {
        fontFamily: "Mulish-ExtraBold",
        fontSize: 16,
        color: '#202244'
    },
    viewAllHistory: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        marginVertical: 20,
    },
    viewAll: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 55,
        borderRadius: 15,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        marginTop: 20,
    },
    searchIcon: {
        width: 30,
        height: 30 ,
        marginLeft: 10,
    },
    textInput: {
        flex: 1,
        height: '100%',
        fontSize: 16,
        color: '#202244',
        fontFamily: 'Mulish-Bold',
        padding: 0,
    },
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: "#F5F9FF",
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
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 10,
       
    },
    itemName: {
        fontFamily: 'Mulish-Bold',
        fontSize: 15,
        color: '#A0A4AB',
    },
    deleteIconContainer: {
        padding: 10,
    },
    deleteIcon: {
        width: 20,
        height: 20,
    },

    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingBottom: 10,
    },
    itemImage: {
        width: 120,
        height: 70,
        marginRight: 15,
    },
    itemName: {
        fontSize: 17,
        color: "#000",
        fontWeight: 'bold',
    },
});

export default styles;