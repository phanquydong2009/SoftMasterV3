import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
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
  imgContainer: {
    alignItems: 'center',
    justifyContent: 'center',


  },
  img: {
    width: 140,
    height: 140,
  },
  // form: {
  //   marginTop: 20,
  // },
  label: {
    fontFamily: 'Mulish-ExtraBold',
    color: '14',
    color: '#0D0D0D',
    marginVertical: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    height: 50,

  },
  emailInput: {
    backgroundColor: 'rgba(151, 151, 151, 0.1)',
  },
  passwordInput: {
    backgroundColor: 'rgba(151, 151, 151, 0.1)',
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  inputIcon: {
    width: 30,
    height: 30,
    padding: 2,
    marginRight: 10,
  },
  eyeIcon: {
    width: 25,
    height: 25,
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: '#FF0000',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'Mulish-Bold',
  },


  btnLogin: {
    backgroundColor: '#0961F5',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 10,
    marginTop: 20,
  },
  txtLogin: {
    fontSize: 17,
    color: '#FFFFFF',
    fontFamily: 'Mulish-Bold',
  },

  // socialButtonsContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-around',
  //   marginTop: 30,
  //   marginBottom: 20
  // },
  // googleButton: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   backgroundColor: '#FFFFFF',
  //   borderColor: '#000000',
  //   borderWidth: 1,
  //   paddingHorizontal: 20,
  //   paddingVertical: 3,
  //   borderRadius: 10,
  // },
  // facebookButton: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   backgroundColor: '#1877F2',
  //   paddingHorizontal: 20,
  //   paddingVertical: 3,
  //   borderRadius: 10,
  // },
  // socialIcon: {
  //   width: 25,
  //   height: 25,
  //   marginRight: 10,
  // },
  // socialTextFB: {
  //   fontFamily: 'Mulish-Bold',
  //   fontSize: 13,
  //   color: '#FFFFFF',
  // },
  // socialTextGG: {
  //   fontSize: 16,
  //   fontFamily: 'Mulish-Bold',
  //   color: '#191B28',
  // },


});

export default styles;
