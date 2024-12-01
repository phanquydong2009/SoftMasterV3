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
    title: {
      fontSize: 20,
      color: '#202244',
      fontFamily: 'Mulish-ExtraBold',
      marginTop: 20,
      marginBottom: 10,
    },
    languageOption: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between', 
      marginBottom: 20,
      marginLeft : 20
    },
    checkBoxWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    checkBox: {
      width: 24,
      height: 24,
    },
    languageText: {
      fontSize: 15,
    
      color: '#202244',
      fontFamily: 'Mulish-Bold',
    },
  });
  
export default styles;
