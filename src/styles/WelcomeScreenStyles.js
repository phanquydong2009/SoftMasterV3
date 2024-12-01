import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    marginTop: 70,
  },
  text_container: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt_header: {
    fontSize: 20,
    color: '#191B28',
    fontFamily: "Mulish-ExtraBold",
    alignItems: "center",
    textAlign: "center"
  },
  txt: {
    marginTop: 40,
    fontSize: 16,
    color: '#191B28',
    fontFamily: "Mulish-Regular",
    textAlign: 'center',
  },
  dot_container: {
    flexDirection: 'row',
    marginTop: 80,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#979797',
    marginHorizontal: 5,
  },
  dot_active: {
    backgroundColor: '#41484F',
  },
  btn_container: {
    marginTop: 50,
    width: '100%'
  },
  btn: {
    backgroundColor: "#0961F5",
    width: '100%',
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  txtbtn: {
    color: "#F9FAFB",
    fontFamily: "Mulish-ExtraBold",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    marginTop: 20
  },
  txtFooter1: {
    color: "#0A0C2C",
    fontFamily: "Mulish-Regular",
    fontSize: 16
  },
  txtFooter2: {
    color: "#3E63F4",
    fontFamily: "Mulish-ExtraBold",
    fontSize: 16
  }
});

export default styles;
