import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    emptyMessage: {
      textAlign: 'center',
      marginTop: 20,
      fontSize: 16,
      color: 'gray',
    },
    floatingButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: '#0961F5',
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
    floatingIcon: {
      width: 30,
      height: 30,
      tintColor: '#FFFFFF',
    },
    flatListContent: {
      paddingBottom: 50,
    },
    voteContent: {
      flex: 1,
      paddingVertical: 20,
  
    },
    voteRate: {
      fontFamily: 'Mulish-ExtraBold',
      fontSize: 16,
      color: '#202244',
    },
    user: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 5,
      marginHorizontal: 15,
    },
    viewrate: {
      flexDirection: 'row',
      width: 70,
      height: 30,
      borderRadius: 50,
      borderColor: '#4D81E5',
      borderWidth: 2,
      backgroundColor: '#E8F1FF',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    nameUser: {
      fontFamily: 'Mulish-ExtraBold',
      fontSize: 20,
      color: 'black',
      width: '70%',
    },
    voteComment: {
      fontFamily: 'Mulish-ExtraBold',
      fontSize: 16,
      color: '#545454',
      marginVertical: 10,
    },
    voteInfo: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    voteLove: {
      fontFamily: 'Mulish-Bold',
      fontSize: 14,
      color: '#202244',
      marginRight: 10,
    },
    voteDay: {
      fontFamily: 'Mulish-Bold',
      fontSize: 14,
      color: 'black',
    },
  
    btnrate_container: {
      flexDirection: 'row',
    },
    rate_container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
  
    },
    list: {
      marginTop: 10,
      width: '100%',
    },
    detailItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 7,
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
      fontFamily: 'Mulish-Bold',
      fontSize: 13,
      color: '#FF6B00',
      marginBottom: 5,
    },
    detailNameLesson: {
      fontFamily: 'Mulish-ExtraBold',
      fontSize: 16,
      color: '#202244',
      marginBottom: 5,
      width: '90%',
    },
    detailQuiz: {
      fontFamily: 'Mulish-ExtraBold',
      fontSize: 17,
      color: '#0961F5',
      marginBottom: 5,
    },
    detailRate: {
      fontFamily: 'Mulish-ExtraBold',
      fontSize: 16,
      color: '#202244',
      marginBottom: 5,
      marginLeft: 10,
    },
    detailStudent: {
      fontFamily: 'Mulish-ExtraBold',
      fontSize: 16,
      color: '#202244',
      marginBottom: 5,
      marginLeft: 10,
    },
    txtCourses: {
      color: '#FFFFFF',
      fontFamily: 'Mulish-Bold',
      fontSize: 15,
    },
    txtVote: {
      color: '#000000',
      fontFamily: 'Mulish-Bold',
      fontSize: 15,
    },
    txt_follow: {
      color: '#202244',
      fontSize: 17,
      fontFamily: 'Mulish-Bold',
    },
    txt_mess: {
      color: '#FFFFFF',
      fontSize: 17,
      fontFamily: 'Mulish-Bold',
    },
  
    btn_follow: {
      width: 130,
      height: 50,
      backgroundColor: '#E8F1FF',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 30,
      borderColor: '#B4BDC4',
      borderWidth: 1,
    },
    btn_mess: {
      width: 130,
      height: 50,
      borderRadius: 30,
      backgroundColor: '#0961F5',
      paddingHorizontal: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    btnFollow_container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      paddingVertical: 10,
    },
    btn: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 48,
      borderRadius: 20,
    },
    btnActive: {
      backgroundColor: '#0961F5',
    },
    btnInactive: {
      backgroundColor: '#E8F1FF',
    },
    txtActive: {
      color: '#FFFFFF',
      fontFamily: 'Mulish-ExtraBold',
      fontSize: 16,
    },
    txtInactive: {
      color: '#000000',
      fontFamily: 'Mulish-ExtraBold',
      fontSize: 16,
    },
    btnBack: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    container: {
      flex: 1,
      padding: 15,
      flexDirection: 'column',
      backgroundColor: '#FFFFFF',
    },
    header: {
      backgroundColor: '#FFFFFF',
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 20,
    },
    body: {
      flex: 2,
      backgroundColor: '#E8F1FF',
      alignItems: 'center',
    },
    txtHeader: {
      color: '#0D0D0D',
      fontFamily: 'Mulish-ExtraBold',
      fontSize: 20,
      paddingLeft: 10,
    },
    imgBack: {
      width: 30,
      height: 20,
      marginRight: 10,
    },
    name_container: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    txtName: {
      color: '#202244',
      fontSize: 23,
      fontFamily: 'Mulish-ExtraBold',
    },
    txtCourse: {
      color: '#202244',
      fontSize: 15,
      fontFamily: 'Mulish-ExtraBold',
    },
    follow_container: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      marginVertical: 15,
    },
    column_item: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    bio: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 5,
    },
    txtbio: {
      color: '#black',
      fontSize: 13,
      fontFamily: 'Mulish-Bold',
    },
    item_numberFeedback: {
      color: '#202244',
      fontSize: 16,
      fontFamily: 'Mulish-ExtraBold',
    },
    item_numberCourse: {
      color: '#202244',
      fontSize: 16,
      fontFamily: 'Mulish-ExtraBold',
    },
    item_numberFL: {
      color: '#202244',
      fontSize: 16,
      fontFamily: 'Mulish-ExtraBold',
    },
    item_title: {
      color: '#202244',
      fontSize: 13,
      fontFamily: 'Mulish-ExtraBold',
    },
    avatarWrapper: {
      width: 130,
      height: 130,
      borderRadius: 65,
      borderWidth: 4,
      borderColor: '#1877F2',
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatarMentor: {
      width: 120,
      height: 120,
      borderRadius: 60,
    },
    avatarUser: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginHorizontal: 10,
    },
  });
  

export default styles;
