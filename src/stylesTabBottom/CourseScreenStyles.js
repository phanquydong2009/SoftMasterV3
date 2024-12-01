import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:15,
    backgroundColor: '#F5F9FF',
  },
  viewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent :'flex-start',
    marginVertical: 10,
  },
  viewTextHeader: {
    marginLeft: 15,
    color: '#202244',
    fontSize: 20,
    fontFamily: 'Mulish-ExtraBold',  
  },
  viewInput: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    height: 55,
  },
  input: {
    flex: 1,
    paddingLeft: 10,
  },
  searchIcon: {
    width: 38,
    height: 38,
  },
  viewDonePending: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    borderRadius: 24,
    paddingVertical: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
  },
  flatListContainer: {
    flex: 1,
  },
  viewFlatlist: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#FFF',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    position: 'relative',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 15,
  },
  completeIcon: {
    position: 'absolute',
    top: -10,
    right: 10,
    width: 35,
    height: 35,
  },
  content: {
    flex: 1,
  },
  title: {
    color: '#FF6B00',
    fontSize:15,
    fontFamily: 'Mulish-ExtraBold',
    fontStyle: 'normal',
    lineHeight: 20,
  },
  description: {
    color: '#202244',
    fontSize: 16,
    fontFamily: 'Mulish',
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 16,
    marginVertical: 5,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },


  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:  5,
  },
  progressBarBackground: {
    flex: 1,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E5E8EF',
    marginRight: 30,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,

  },
  progressText: {
    color: '#202244',
    fontSize: 15,
    fontWeight: 'bold',
    marginRight  :10
  },
  certificateButton: {
    flexDirection :"row",
    alignItems :"center",
    justifyContent :"flex-end",
    borderRadius: 20,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  certificateButtonText: {
    color: '#167F71',
    fontSize: 14,
    fontWeight: 'bold',
  fontStyle :"italic"
  },
});

export default styles;