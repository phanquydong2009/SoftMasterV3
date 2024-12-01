
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
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
    textAlign: 'center', // Nếu muốn căn giữa lỗi
    color: 'red',
    fontSize: 14,
  },

  // styels popup 

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  modalTitle: {
    fontSize: 18,
    width: '100%',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    width: '100%',
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    marginVertical: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#f44336',
  },


  //
  timerText: {
    fontSize: 16,
    color: 'black',
  },
  timerRedText: {
    fontSize: 16,
    color: 'red',
  },
  timerGreenText: {
    fontSize: 16,
    color: 'green',
  },
  quizButtonText: {
    fontSize: 16,
    color: 'blue',
    fontWeight: 'bold',
  },


  // ẩn icon 
  dimmedIcon: {
    opacity: 0.5, // Dims the icon by reducing opacity
  },


  container_list: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    overflow: 'hidden',
  },
  sectionHeader: {
    fontFamily: 'Mulish-ExtraBold',
    fontSize: 18,
    color: "#202244",
    marginVertical: 10,
    paddingLeft: 15,
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

  // search
  // searchContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   borderWidth: 1,
  //   borderColor: '#ccc',
  //   borderRadius: 15,
  //   paddingHorizontal: 10,
  //   backgroundColor: '#FFF',
  //   height: 55,
  //   marginVertical: 10
  // },
  // input: {
  //   flex: 1,
  //   paddingLeft: 10,
  // },
  // searchIcon: {
  //   width: 38,
  //   height: 38,
  // },
  icon_quizz: {
    height: 40,
    width: 40,
    marginLeft: 20,
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
    marginLeft: 20
  },
  columnItem: {
    flexDirection: "column",
  },
  courseSection: {
    padding: 15,
    borderRadius: 16,
    marginBottom: 1,
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
    fontSize: 16,
    marginTop: 20,
  },
});
export default styles;