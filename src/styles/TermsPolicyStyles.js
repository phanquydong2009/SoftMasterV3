import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
     padding : 15,
      backgroundColor: '#F5F9FF',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 5,
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
      fontStyle: 'normal',
      marginLeft: 16,
      flex: 1,
    },
    content: {
      paddingHorizontal: 15,
  
    },
    title: {
      fontSize: 20,
      fontWeight: '700',
      color: '#202244',
      fontFamily: 'Mulish',
      fontStyle: 'normal',
      marginTop: 20,
      marginBottom: 10,
    },
    text: {
      fontSize: 15,
      fontWeight: '700',
      color: '#545454',
      fontFamily: 'Mulish',
      fontStyle: 'normal',
      lineHeight: 23,
      flexShrink: 0,
    },
  });
export default styles;