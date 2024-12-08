import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import AppNavigator from './src/component/AppNavigator';


function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
       <AppNavigator />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
