import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { Circle } from 'react-native-progress';

const backgroundImage = require('../../assets/fondo1.png');
const gifImage = require('../../assets/Animation - water.gif');

const HomeScreen = () => {
  const targetWater = 2000;
  const currentWater = 1900;

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Good Morning,</Text>
      <Text style={styles.name}>Sergio GL</Text>
      <ImageBackground source={backgroundImage} style={styles.waterContainer} imageStyle={styles.backgroundImage}>
        <Text style={styles.time}>11:00 AM</Text>
        <Text style={styles.waterAmount}>200ml water (2 Glasses)</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Add Your Goal</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View style={styles.circleAndTargetContainer}>
        <View style={styles.circleContainer}>
          <ImageBackground source={gifImage} style={styles.gifBackground}>
            <Circle
              size={120}
              progress={currentWater / targetWater}
              showsText={false}
              color="#ADE5FC" // 4286f4
              thickness={10}
              borderColor='#F3F7FB'
            />
            <Text style={styles.circleText}>{`${currentWater}ml`}</Text>
          </ImageBackground>
        </View>
        <View style={styles.targetContainer}>
          <View style={styles.targetBackground}>
            <Text style={styles.targetText}>Target</Text>
            <Text style={styles.targetAmount}>{targetWater}ml</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.dashboardButton}>
        <Text style={styles.buttonText}>Go To Dashboard</Text>
      </TouchableOpacity>
      <Text style={styles.progressMessage}>You got 50% of today's goal. Keep focus on your health!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#EDF2FC', //  E7EEFB
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'normal',
    marginBottom: 5,
    color: "#6A808F",
    marginTop: 50,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  waterContainer: {
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  backgroundImage: {
    borderRadius: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 25,
  },
  buttonText: {
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  time: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  waterAmount: {
    fontSize: 15,
    color: "#6A808F",
    marginBottom: 10,
  },
  circleAndTargetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 40,
  },
  gifBackground: {
    width: 133,
    height: 133,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: {
    color: '#FFFFFF',
    position: 'absolute',
    top: '60%',
    fontWeight: 'bold',
  },
  targetContainer: {
    justifyContent: 'center',
    width: 120
  },
  targetBackground: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 10,
  },
  targetText: {
    fontSize: 16,
    marginBottom: 5, // Ajusta según sea necesario
  },
  targetAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5, // Ajusta según sea necesario
  },
  dashboardButton: {
    backgroundColor: '#4286f4',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  progressMessage: {
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default HomeScreen;
