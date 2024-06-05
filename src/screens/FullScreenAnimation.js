import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import { ROUTES } from '../constants/navigation.constants';

const FullScreenAnimation = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate(ROUTES.main);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/Animation - 1717547720813.json')}
        autoPlay
        loop
        resizeMode="cover"
        style={styles.animation}
      />
      <Text style={styles.text}>CHECK-IT APP</Text>
      <Text style={styles.subtitle}>El poder del agua en tus manos.</Text>
    </View>
  );
};

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  animation: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: height,
  },
  text: {
    position: 'absolute',
    textAlign: 'center',
    fontSize: 38,
    fontWeight: 'bold',
    color: '#ffffff',
    bottom: height / 2 - 30,
  },
  subtitle: {
    position: 'absolute',
    textAlign: 'center',
    fontSize: 16,
    color: '#ffffff',
    bottom: height / 2 - 70,
  },
});

export default FullScreenAnimation;
