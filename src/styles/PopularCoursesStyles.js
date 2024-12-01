import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    bookmark: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    flatListWrapper: {
        justifyContent: 'center',
    },

    courseItem: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    courseText: {
        fontFamily: "Mulish-Bold",
        fontSize: 15,
    },
    detailsWrapper: {
        marginTop: 10,
        marginBottom: 50

    },
    detailsContainer: {
        paddingVertical: 10,


    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E8E8E8',
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    detailImage: {
        width: 140,
        height: 140,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        marginRight: 15,
    },
    detailContent: {
        flex: 1,

    },
    detailNameCourse: {
        fontFamily: 'Mulish-ExtraBold',
        fontSize: 15,
        color: '#0961F5',
        marginBottom: 5,
        width: 150,
    },
    bookmarkIcon: {
        width: 30, height: 30,
    },
    detailDescription: {
        fontFamily: 'Mulish-Bold',
        fontSize: 12,
        color: '#202244',
        marginBottom: 5,
    },
    detailPrice: {
        fontFamily: 'Mulish-Bold',
        fontSize: 14,
        color: '#FF6B00',
        marginBottom: 5,
    },
    detailCreatedAt: {
        fontFamily: 'Mulish-Bold',
        fontSize: 12,
        color: '#202244',
    },
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: "#F5F9FF",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
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
});


export default styles;
