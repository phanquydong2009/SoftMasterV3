// src/styles/SignUpOrSignInStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFF",
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  imgLogo: {
    width: 320,
    height: 320,
  },
  txt_container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginBottom: 80,
  },
  txt: {
    fontSize: 15,
    fontFamily: 'Mulish-ExtraBold',
    color: '#13248D',
    textAlign: 'center',
  },
  btn_container: {
    position: 'absolute',
    bottom: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },
  btnSignUp: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginRight: 20,
    height: 48,
    borderRadius: 13,
    elevation: 5, // Bóng đổ cho Android
  },
  btnSignIn: {
    backgroundColor: "#0961F5",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginLeft: 20,
    height: 48,
    borderRadius: 13,
    elevation: 5, // Bóng đổ cho Android
  },
  txtSignUp: {
    color: 'black',
    fontFamily: 'Mulish-ExtraBold',
  },
  txtSignIn: {
    color: 'white',
    fontFamily: 'Mulish-ExtraBold',
  },
});

export default styles;
