import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  // chức năng 
  voiceIcon : {
    width : 40,
    height : 40
  },
  errorText: {
    color: '#EC2222',
    marginTop: 10,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F9FF',
  },
  txtHeader: {
    justifyContent :'flex-start',
    marginRight : 100,
    color: '#202244',
    fontSize: 21,
    fontWeight: '700',
  },
  modalContainer: {
    width: 300,
    height: 360,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    flexShrink: 0,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalImage: {
    width: 90,
    height:90,
    marginBottom: 3,
  },
  modalHeaderText: {
    fontFamily: 'Jost',
    fontSize: 24,
    fontWeight: '600',
    color: '#202244',
    textAlign: 'center',
    marginBottom: 8,
  },
  modalSubText: {
    fontFamily: 'Mulish',
    fontSize: 14,
    fontWeight: '700',
    color: '#545454',
    textAlign: 'center',
    marginBottom: 10,
    width: 301,
    height: 22,
  },
  modalText: {
  
    color: '#EC2222',
    fontFamily: 'Mulish',
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalFooterText: {
    color: '#167F71',
    fontFamily: 'Mulish',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 24,
  },
  image: {
    width: 26,
    height: 26,
    marginRight: 20,
  },

  viewQuizzAsk: {
    top : 10,
    flex: 1,
  
    justifyContent: 'center',
  },
  innerContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',

  },
  text: {
    color: 'black',
    fontFamily: 'Mulish',
    fontSize: 16,
    fontWeight: '700',
    width: '90%',

  },
  viewQuizz: {
    marginTop: 30,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 15,
    height: 120,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  lessonNumber: {
    fontFamily: 'Mulish',
    fontSize: 30,
    fontWeight: '800',
    color: '#000000',
  },
  lessonNumberContainer: {
    marginRight: 10,
    backgroundColor: '#e5e5e5',
    width: 50, height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  txtTitle: {
    fontFamily: 'Mulish-Bold',
    fontSize: 20,
    color: '#202244',
    textAlign: 'center',
    flex: 1,
  },
  viewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent :'space-between'

  },
  containerButtonBottom: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  continueButtonPrev: {
    backgroundColor: '#0961F5',
    height: 60,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  marginRight  : 10
  },

  continueButtonNext: {
    backgroundColor: '#0961F5',
    height: 60,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
 marginLeft : 10

  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',

  },
  continueButtonImage: {
    width: 30,
    height: 30,
  },
  continueButtonDone: {
    backgroundColor: '#3D9CE6',
  padding : 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  continueButtonTextDone: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 10,
  },
});

export default styles;


