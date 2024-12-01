import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({

  ScrollViewChat: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    top: -10,
    borderRadius: 10
  },
  noMessagesText: {
    color: 'red',
    fontFamily: 'Mulish-Bold',
    textAlign: 'center',
    fontSize: 13,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'space-between',

  },
  input: {
    flex: 1,
    height: 42,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#202244',
    borderWidth: 1,
    borderColor: '#0E4CBF',
    marginHorizontal: 10

  },
  iconUpImage: {
    width: 38,
    height: 38,

  },

  iconSend: {
    width: 40,
    height: 40,

  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  txtHeaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txtHeader: {
    fontFamily: 'Mulish-Bold',
    fontSize: 21,
    color: '#202244',
  },
  searchContainer: {
    backgroundColor: '#FFFFFF',
    borderColor: '#0961F5',
    borderWidth: 1,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderRadius: 20,
    position: 'absolute',
    right: 40,
    opacity: 0,
  },
  searchContainerExpanded: {
    width: '77%',
    opacity: 1,
  },
  searchInput: {
    height: '100%',
    fontSize: 16,
    borderWidth: 0,
    flex: 1,
    paddingHorizontal: 5,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#F5F9FF',
  },
  rectangle: {
    marginBottom: 10,
    marginTop: -20,
    height: 32,

    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',

    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Mulish-Bold',
    color: '#202244',
  },
  chatContainer: {
    marginBottom: 15,
  },
  imageChat: {
    flexDirection: 'row',
  },
  chatBubble1: {
    backgroundColor: '#2795FF',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 5,
    maxWidth: '80%',
  },
  chatBubble2: {
    backgroundColor: '#B4BDC4',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 5,
    maxWidth: '80%',
  },
  messageText: {
    fontSize: 16,
    fontFamily: 'Mulish',
  },
  timeText: {
    fontSize: 12,
    marginTop: 3,
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 5,
  },
});
export default styles;