import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    FollowTeacherCourse: {
        flexDirection: "column"
    },
    row1: {
        flexDirection: 'row'
    },
    containerItemFollow: {
        flexDirection: 'row'
    },
    followItemContainer: {
        flexDirection: 'column',
        padding: 10,
        marginHorizontal: 5,
        backgroundColor: '#E8F1FF',
        borderRadius: 10,
        width: 200,
    },
    followItemImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 10,
    },
    followItemTextContainer: {
        flex: 1,
    },
    followItemName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#202244',
    },
    followItemPrice: {
        fontSize: 12,
        color: '#2795FF',
    },
    followItemDescription: {
        fontSize: 12,
        color: '#545454',
    },

    // viewMentor: {
    //     marginVertical: 10,
    // },
    mentors_container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        paddingRight: 10,
    },
    mentorAvatar: {
        width: 70,
        height: 70,
        borderRadius: 20,
    },
    mentorName: {
        fontFamily: 'Mulish-Bold',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 5,
        color: '#202244',
    },
    mentorCard: {
        alignItems: 'center',
        marginVertical: 15,
        width: 100
    },
    ic_bookmark: {
        width: 30,
        height: 30,
    },
    bookmark: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 20,
    },
    cardsContainer: {
        flexDirection: 'row',
        paddingVertical: 10,
    },
    card: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        overflow: 'hidden',
        marginRight: 10,
        width: 290,
        height: 250,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,

    },
    cardImage: {
        width: 290,
        height: '60%',
        borderRadius: 10,
    },

    cardInstructor: {
        fontFamily: 'Mulish-ExtraBold',
        fontSize: 18,
        color: '#202244',
        marginBottom: 5,

    },
    describe: {
        fontFamily: 'Mulish-Bold',
        fontSize: 12,
        color: '#202244',
        marginBottom: 3,
    },
    cardInfo: {
        fontFamily: 'Mulish-ExtraBold',
        fontSize: 12,
        color: '#FF6B00',
        marginBottom: 3,
    },
    containerText: {
        marginHorizontal: 20
    },
    popularCourses: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        paddingRight: 10,
        marginBottom: 10,
        marginTop: 30,
    },
    title: {
        fontFamily: "Mulish-ExtraBold",
        fontSize: 18,
        color: "black",
    },
    viewAllText: {
        fontFamily: "Mulish-ExtraBold",
        fontSize: 15,
        color: "#0961F5",
        paddingRight: 20,
    },
    viewAllButton: {
        flexDirection: "row",
        alignItems: 'center',
    },

    courseItem: {
        marginHorizontal: 5,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    courseText: {
        fontFamily: 'Mulish-Bold',
        fontSize: 16,
    },
    container: {
        flex: 1,
        paddingLeft: 20,
        paddingVertical: 15,
        backgroundColor: "#F5F9FF",
    },
    header: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
    },
    header1: {
        flexDirection: "column",
        flex: 3,
    },
    header2: {
        flexDirection: "column",
        flex: 1,
        marginHorizontal: 20,
        alignItems: "flex-end",
    },
    btn_noti: {
        width: 40,
        height: 40,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: '#167F71',
        justifyContent: "center",
        alignItems: "center",
    },
    img_btn_noti: {
        width: 30,
        height: 30,
    },
    welcome_container: {
        flexDirection: "row",
    },
    txtHi: {
        fontFamily: 'Mulish-Bold',
        color: "#202244",
        fontSize: 18,
    },
    txtName: {
        fontFamily: 'Mulish-Bold',
        color: "#202244",
        fontSize: 19,
    },
    txtFind: {
        fontFamily: 'Mulish-Bold',
        color: "rgba(84, 84, 84, 0.8)",
        fontSize: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '94%',
        height: 60,
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
        width: 25,
        height: 25,
        marginRight: 3,
    },
    textInput: {
        flex: 1,
        height: '100%',
        fontSize: 16,
        color: '#202244',
        fontFamily: 'Mulish-Bold',
        padding: 0,
    },
    slide_container: {
        width: '94%',
        height: 200,
        marginTop: 20,
        position: 'relative',
    },
    slide: {
        width: width,
        borderRadius: 20,
        overflow: 'hidden',
    },
    slideImage: {
        width: '89%',
        height: '100%',
        borderRadius: 20,
    },
    dotContainer: {
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',
        flexDirection: 'row',
    },
    dot: {
        borderRadius: 4,
        marginHorizontal: 4,
    },
// styles search 
searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 50,
    marginTop: 20,
    marginRight: 20,
    // Shadow for Android
    elevation: 5,
},

    searchButton: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-start',
    },
    searchIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    textInput: {
        color: '#545454',
        fontSize: 16,
        fontFamily: 'Arial', // Chọn font phù hợp
    },
});


export default styles;
