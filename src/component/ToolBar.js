import React from 'react';
import {StyleSheet, TouchableOpacity, View,Text, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
const ToolBar = ({...props}) => {
  const navigation = useNavigation();
  return <View style={styles.container}>
    
    <TouchableOpacity onPress={() => navigation.goBack()}>
       <Image source={require('../design/image/ic_back.png')} />
    </TouchableOpacity>
    <TouchableOpacity>
        <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
  </View>;
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
   paddingHorizontal : 15,
    backgroundColor:'transparent',
    flexDirection:'row',
    alignItems:'center',
    gap:20
  },
  title:{
    fontSize:21,
    color:'#202244',
    fontWeight:'bold'
  }
});
export default ToolBar;
