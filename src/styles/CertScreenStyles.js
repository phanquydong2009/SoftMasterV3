import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    containerIDCert: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    container: {
      flex: 1,
      backgroundColor: '#F5F9FF',
      padding: 15,
    },
    container_body: {
      padding: 20,
      backgroundColor: '#FFFFFF',
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 12, // Thêm border radius để UI đẹp hơn
      shadowColor: '#000', // Thêm shadow nếu cần
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3, // Chỉ dành cho Android
      marginVertical: 20, // Thêm khoảng cách giữa các thành phần
      position: 'relative', // Để đặt các lớp phủ ở vị trí tương đối
    },
    waveTopRight: {
      position: 'absolute',
      top:0, // Điều chỉnh vị trí trên/ dưới nếu cần
      right: -32,
      width: 200,
      height: 200,
      resizeMode: 'contain',
    },
    waveBottomLeft: {
      position: 'absolute',
      bottom: -1, // Điều chỉnh vị trí trên/ dưới nếu cần
      left: -43,
      width: 200,
      height: 200,
      resizeMode: 'contain',
    },
    txtTitle: {
      fontFamily: 'Mulish-ExtraBold',
      color: '#202244',
      fontSize: 20,
      textAlign: 'center',
      marginTop: 10,
    },
    txtSubtitle: {
      fontFamily: 'Mulish-Bold',
      color: '#202244',
      fontSize: 15,
      textAlign: 'center',
      marginTop: 5,
    },
    txtName: {
      fontFamily: 'Mulish-ExtraBold',
      color: '#202244',
      fontSize: 18,
      textAlign: 'center',
      marginVertical: 10,
    },
    txtNameTeacher: {
      fontFamily: 'GreatVibes-Regular',
      color: '#202244',
      fontSize: 30,
      textAlign: 'center',
    },
    txtNameTeacherSignature: {
      fontFamily: 'Sacramento-Regular',
      color: '#202244',
      fontSize: 30,
      textAlign: 'center',
    },
    txtNameCourse: {
      fontFamily: 'Mulish-ExtraBold',
      color: '#202244',
      fontSize: 18,
      textAlign: 'center',
      marginVertical: 10,
    },
    button: {
      width: '100%',
      height: 50,
      backgroundColor: '#0961F5',
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      flexDirection: 'row',
      marginVertical: 30,
    },
    buttonImage: {
      width: 30,
      height: 30,
      marginRight: 20,
    },
    buttonTitle: {
      color: 'white',
      fontSize: 18,
      fontFamily: 'Mulish-Bold',
      flex: 1,
      textAlign: 'center',
    },
    certImage: {
      width: 90, height: 90
    },
  });
  


export default styles;
