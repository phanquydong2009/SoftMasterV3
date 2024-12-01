import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f9ff',
    },
    header: {
      alignItems: 'center',
      padding: 20,
    },
    boxContainer: {
      flex: 1,
      backgroundColor: '#fff',
      marginHorizontal: 20,
      borderRadius: 25,
    },
    profileImage: {
      width: 125,
      height: 125,
      borderRadius: 70,
      marginBottom: 10,
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#202244',
      marginTop: 20,
    },
    email: {
      fontSize: 14,
      color: '#545454',
    },
    item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
    },
    itemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemIcon: {
      width: 25,
      height: 25,
      marginRight: 10,
      borderRadius: 5,
    },
    itemTitle: {
      fontSize: 16,
      color: '#202244',
      fontWeight: 'bold',
    },
    itemRight: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemValue: {
      marginRight: 10,
      color: '#0961F5',
      fontWeight: 'bold',
      fontSize: 15,
    },
    updateImage: {
      width: 36,
      height: 36,
      borderRadius: 10,
      position: 'absolute',
      bottom: 10,
      right: 0,
    },
  });
  
export default styles;