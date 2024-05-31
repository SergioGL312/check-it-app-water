import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { Circle } from 'react-native-progress';

const backgroundImage = require('../../assets/fondo1.png');
const gifImage = require('../../assets/Animation - water.gif');

const HomeScreen = () => {
  const targetWater = 100;
  const currentWater = 90;

  const [buttonState, setButtonState] = useState({
    text: 'Encender',
    backgroundColor: '#69FF3A',
  });


  
    const handlePress = () => {
      setButtonState((prevState) => ({
        text: prevState.text === 'Apagar' ? 'Encender' : 'Apagar',
        backgroundColor: prevState.backgroundColor === '#69FF3A' ? '#FF6347' : '#69FF3A',
      }));
    };

  return (
    <View style={styles.maincontainer}>
      <Text style={styles.greeting}>Hola,</Text>
      <Text style={styles.name}>Jesús GS</Text>
      <ImageBackground source={backgroundImage} style={styles.waterContainer} imageStyle={styles.backgroundImage}>
        <Text style={styles.time}>11:00 AM</Text>
        <Text style={styles.waterAmount}>Tinaco (*Capacidad*)</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Más</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2}>
            <Text style={styles.buttonText}>Cambiar</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <View style={styles.circleAndTargetContainer}>
        <View style={styles.circleContainer}>
          <ImageBackground source={gifImage} style={styles.gifBackground}>
            <Circle
              size={150}
              progress={currentWater / targetWater}
              showsText={false}
              color="#ADE5FC"
              thickness={12}
              borderColor='#F3F7FB'
            />
            <Text style={styles.circleText}>{`${currentWater}%`}</Text>
          </ImageBackground>
        </View>
      </View>
      
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={[styles.dashboardButton, { backgroundColor: buttonState.backgroundColor }]}
          onPress={handlePress}
        >
          <Text style={styles.buttonText}>{buttonState.text}</Text>
        </TouchableOpacity>
      </View>
      
      </View>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#EDF2FC',
  },
  buttonWrapper: {
    width: '100%',
    alignItems: 'center',
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
    borderRadius: 18,
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
  button2: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 25,
    marginHorizontal: 23,
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
    fontSize: 18,
    color: "#6A808F",
    marginBottom: 10,
  },
  circleAndTargetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    alignSelf: 'center',
    width: '100%',
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gifBackground: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: {
    color: '#FFFFFF',
    position: 'absolute',
    top: '60%',
    fontWeight: 'bold',
  },
  progressMessage: {
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
  dashboardButton: {
    backgroundColor: '#69FF3A',
    padding: 10,
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default HomeScreen;
