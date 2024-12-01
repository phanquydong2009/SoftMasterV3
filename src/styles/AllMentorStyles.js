import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
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
      height: 30,
      marginRight: 10,
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
      marginVertical: 10,
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#E8F1FF',
    },
    itemImage: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginRight: 15,
    },
    textContainer: {
      flex: 1,
    },
    nameMentor: {
      fontFamily: 'Mulish-ExtraBold',
      fontSize: 18,
      color: '#202244',
    },
    nameCategory: {
      fontFamily: 'Mulish-Bold',
      fontSize: 16,
      color: '#545454',
    },
  });
  

export default styles;
