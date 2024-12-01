import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
      backgroundColor: '#F5F9FF',
      flex: 1,
      padding : 15,
    },
    listContent: {
      backgroundColor: 'white',
      borderRadius: 8,
      overflow: 'hidden',
      margin: 16,
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0',
      marginHorizontal: 16,
      backgroundColor: 'white',
    },
    firstItem: {
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
    },
    lastItem: {
      borderBottomWidth: 0,
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
    },
    avatarContainer: {
      marginRight: 16,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: 'black',
      borderWidth: 2,
      borderColor: '#E8F1FF',
    },
    infoContainer: {
      flex: 1,
    },
    name: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#202244',
    },
    phone: {
      fontSize: 14,
      color: '#202244',
      fontWeight: 'medium',
    },
    button: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 16,
      backgroundColor: '#E8F1FF',
      width: 80,
      height: 32,
      justifyContent: 'center',
      alignItems: 'center',
    },
    activeButton: {
      backgroundColor: '#3b82f6',
    },
    buttonText: {
      fontSize: 14,
      color: '#202244',
      fontWeight: 'bold',
    },
    activeButtonText: {
      color: 'white',
    },
    footerContainer: {
      padding: 16,
    },
    footerTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#202244',
      marginBottom: 10,
    },
    iconContainer: {
      flexDirection: 'row',
      justifyContent:'start',
     
    },
    iconButton: {
      backgroundColor: '#E8F1FF',
      width: 50,
      height: 50,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 10
    },
    iconImage: {
      width: 30,
      height: 39,
    },
  });
  
export default styles;