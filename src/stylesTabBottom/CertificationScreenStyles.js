import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f9ff',
  },
  container2: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    maxWidth: 400,
    borderBottomColor: '#E8F1FF',
    borderBottomWidth: 1,
  },
  imageContainer: {
    backgroundColor: '#ffd580',
    borderRadius: 8,
    marginRight: 16,
  },
  image: {
    width: 92,
    height: 92,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontFamily: "Mulish-ExtraBold",
    color: '#333333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    fontFamily: "Mulish-Bold",
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#3a8686',
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});


export default styles;