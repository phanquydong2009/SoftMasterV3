import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import AppNavigator from './src/component/AppNavigator';
import DetailLesson from './src/screen/DetailLesson';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <AppNavigator />
      {/* <DetailLesson></DetailLesson> */}
 
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
