
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
//text error
errorTextContainer: {
  marginTop: 10, 
  alignItems: 'center',
  marginBottom : 70
},
errorText: {
  color: '#0961F5',
  fontSize:20,
  textAlign: 'center',
  fontFamily:'Mulish-Bold'
},
  // modal 
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalImage: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
// button tiếp theo
btnBottom: {
  position: 'absolute',
  bottom:20,
  width: '100%',
  alignItems: 'center', 
  justifyContent: 'center', 
  paddingLeft : 40
},
btnNextLesson: {
  backgroundColor: '#007BFF',
  borderRadius: 30,
  height: 50,
  width: '90%', 
  alignItems: 'center',
  justifyContent: 'center',
},
txtNext: {
  color: '#fff',
  fontSize: 16,
  fontFamily: 'Mulish-Bold',
},
txtError: {
  textAlign: 'center', 
  color: 'red',
  fontSize: 14,
},
//
  noDataContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  noDataText: {
    fontSize: 16,
    fontFamily: 'Mulish-ExtraBold',
    color: 'red',
    textAlign: 'center',
  },
    container_list: {
      backgroundColor: "#FFFFFF",
      marginTop: 20,
      borderRadius: 20,
    },
    number: {
      fontFamily: 'Mulish-ExtraBold',
      fontSize: 20,
      color: "#202244"
    },
    number_container: {
      width: 50,
      height: 50,
      borderRadius: 30,
      borderWidth: 2,
      borderColor: '#E8F1FF',
      backgroundColor: "#F5F9FF",
      justifyContent: "center",
      alignItems: "center"
    },
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#F5F9FF',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerTitle: {
      marginLeft: 15,
      color: '#202244',
      fontSize: 21,
      fontWeight: '700',
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 15,
      paddingHorizontal: 10,
      backgroundColor: '#FFF',
      height: 55,
      marginVertical: 10
    },
    input: {
      flex: 1,
      paddingLeft: 10,
    },
    searchIcon: {
      width: 38,
      height: 38,
    },
    icon_quizz: {
      height: 40,
      width: 40,
    },
    sectionDay: {
      fontFamily: 'Mulish-Bold',
      fontSize: 13,
      color: "#545454",
      marginTop: 10
    },
    sectionTitle: {
      fontFamily: 'Mulish-ExtraBold',
      fontSize: 17,
      color: "#202244"
    },
    column_text: {
      flexDirection: 'column',
      justifyContent: "space-between",
      width: 200,
      marginLeft : 40
    },
    columnItem: {
      flexDirection: "column"
    },
    courseSection: {
      padding: 15,
      borderRadius: 16,
      marginBottom: 12,
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center"
    },
    separator: {
      height: 1,
      backgroundColor: '#E0E0E0',
      width: '100%',
    },
    noLessons: {
      textAlign: 'center',
      color: '#545454',
    },
  });

export default styles;
