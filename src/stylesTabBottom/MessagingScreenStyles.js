import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
 
  
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
    fontFamily: 'Mulish-ExtraBold',
    fontSize: 25,
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
  body: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginVertical: 5,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#F5F9FF',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,

  },
  avatarContainer: {
    marginRight: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  contentContainer: {
    flex: 1,
    paddingLeft: 5

  },
  nameUser: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#202244',
    marginTop: -12
  },
  content: {
    fontSize: 14,
    color: '#000000',
    width: 200
  },
  contentNotWatched: {
    fontWeight: 'bold', // Style cho trạng thái 'notwatch'
  },
  contentWatched: {
    fontWeight: 'normal', // Style cho trạng thái 'watch'
  },
  numberMessagesContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
  },
  numberMessages: {
    backgroundColor: '#0961F5',
    color: '#FFFFFF',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 14,
    fontWeight: 'bold',
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  time: {
    fontSize: 12,
    color: '#A0A4AB',
    marginTop: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#E8F1FF',
    marginVertical: 20,
  },

});

export default styles;