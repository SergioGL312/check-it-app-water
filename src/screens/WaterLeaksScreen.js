// screens/SettingsScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/Animation - 1717208193512.json')}
        autoPlay
        loop
        style={{ width: 200, height: 200 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default SettingsScreen;
