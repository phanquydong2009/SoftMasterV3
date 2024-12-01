import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    category_container: {
      flexDirection: "row"
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
      width: 20,
      height: 20,
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
      flex: 1,
      alignItems: 'center',
      margin: 10,
      paddingVertical: 30
    },
    itemImage: {
      width: 100,
      height: 100,
      borderRadius: 10,
    },
    itemName: {
      fontFamily: 'Mulish-ExtraBold',
      marginTop: 5,
      fontSize: 18,
      color: 'rgba(32, 34, 68, 0.8)',
      textAlign: 'center',
    },
    row: {
      justifyContent: 'space-between',
    },
  });
  

export default styles;
