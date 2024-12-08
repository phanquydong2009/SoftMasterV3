import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  button: {
    marginBottom: 20,
    marginTop: 50,
  },
  txtBtn: {
    color: '#FFFFFF',
    fontFamily: 'Mulish-ExtraBold',
    fontSize: 16,
  },
  btn_container: {
    backgroundColor: '#0961F5',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 20,
  },
  line: {
    width: '90%',
    height: 2,
    backgroundColor: '#C5DAFB',
    marginHorizontal: 20,
  },
  describe: {
    height: 180,
    marginHorizontal: 10,
    marginTop: 10,
  },
  scrollDescribe: {
    paddingHorizontal: 10,
  },
  txt_describe: {
    color: '#202244',
    fontFamily: 'Mulish-ExtraBold',
    fontSize: 16,
    textAlign: 'justify',
  },
  txt_number: {
    color: '#202244',
    fontFamily: 'Mulish-ExtraBold',
    fontSize: 18,
  },
  title: {
    color: '#545454',
    fontFamily: 'Mulish-ExtraBold',
    fontSize: 17,
  },
  column: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  data_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 15,
  },
  txtInfo: {
    fontSize: 19,
    color: '#0961F5',
    fontFamily: 'Mulish-ExtraBold',
    marginVertical: 5,
  },
  infoCourse: {
    flexDirection: 'column',
    marginHorizontal: 20,
    marginTop: 10,
    justifyContent: 'flex-start',
  },
  nameTeacher: {
    fontSize: 19,
    color: '#202244',
    fontFamily: 'Mulish-Bold',
    marginHorizontal: 20,
  },
  avatarTeacher: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  infoTeacher: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: 20,
  },
  nameCourse: {
    fontSize: 20,
    color: '#202244',
    fontFamily: 'Mulish-ExtraBold',
    marginVertical: 10,
    textAlign: 'center',
  },
  imgBanner: {
    width: '100%',
    height: 180,
    borderRadius: 20,
  },
  banner: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  txtHeader: {
    color: '#0D0D0D',
    fontFamily: 'Mulish-ExtraBold',
    fontSize: 20,
    paddingLeft: 20,
  },
  imgBack: {
    width: 30,
    height: 20,
  },
  top: {
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#F5F9FF',
  },

 // Modal container style
modalContainer: {
  position: 'absolute',     
  top: '40%',               
  left: '10%',              
  right: '10%',
  backgroundColor: 'white',
  borderRadius: 10,
  padding: 20,
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1,
  width: '80%',             
},

// Modal background style (overlay)
modalOverlay: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  zIndex: 0,  
},

// Modal Button styles
btn_containerModel: {
  flexDirection: "row",
  justifyContent: "space-between",
  width: '100%',
},

modalTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 10,
  color: "blue",
},

modalMessage: {
  fontSize: 16,
  textAlign: 'center',
  marginBottom: 20,
  color: "black",
  fontFamily: 'Mulish-ExtraBold',
},

modalButton: {
  padding: 10,
  borderRadius: 5,
  width: '48%', 
  alignItems: 'center',
},

leftButton: {
  marginRight: '4%', 
},

rightButton: {
  marginLeft: '4%', 
},

modalButtonText: {
  color: 'red',
  fontWeight: 'bold',
  fontSize: 16,
},

});


export default styles;
