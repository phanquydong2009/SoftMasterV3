import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import AppNavigator from './src/component/AppNavigator';
import Toast from 'react-native-toast-message';


function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      {/* Your Navigator */}
      <AppNavigator />

      {/* Toast component to show messages */}
      <Toast />
     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
