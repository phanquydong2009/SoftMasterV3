import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  action :{
    flexDirection:'row',
    justifyContent :"space-between",
    alignItems :"center",

  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  formReview: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  txt_titleReview: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  rate_container: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  star: {
    width: 40,
    height: 40,
    marginHorizontal: 5,
  },
  input: {
    width: '100%',
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButton: {
    color: 'red',
    marginTop: 10,
    fontWeight: 'bold',
  },



  countReview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  count_number: {
    width: 30,
    height: 30,
    backgroundColor: '#A3A4A9',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  count_numberText: {
    color: '#191B28',
    fontSize: 20,
    fontFamily: 'Mulish-ExtraBold',
  },
  count_txt: {
    color: '#191B28',
    fontFamily: 'Mulish-ExtraBold',
    fontSize: 16,
  },
  txtContent: {
    color: '#242424',
    fontSize: 15,
    fontFamily: 'Mulish-Regular',
    marginTop: 5,
  },
  txtTime: {
    color: '#808080',

    fontFamily: 'Mulish-Bold',
    marginTop: 5,
  },

  txtRate: {
    fontSize: 20, marginLeft : 10
  },
  txtUser: {
    color: 'black',
    fontSize: 17,
    fontFamily: 'Mulish-Bold',

    
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  itemReview: {
    width: '100%',
    
    borderRadius: 25,
    borderWidth: 1,
    marginTop: 10,
    borderColor: '#99A1CE',
    paddingVertical: 10,
    flexDirection: 'column',
    paddingHorizontal: 15,
  },
  ViewAll: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  // text lỗi 
  errorTxt: {
    fontSize: 15,
    textAlign: 'center',
    fontFamily: "Mulish-Regular",
    color :"red"
  },
  btnViewAllReview: {
    width: '100%',
    borderRadius: 25,
    height: 55,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#99A1CE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtViewAllReview: {
    color: '#0A0C2C',
    fontFamily: 'Mulish-ExtraBold',
    fontSize: 20,
  },
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20,
  },
  txtHeader: {
    color: '#0D0D0D',
    fontFamily: 'Mulish-ExtraBold',
    fontSize: 20,
    paddingLeft: 20,
  },
});

export default styles;
