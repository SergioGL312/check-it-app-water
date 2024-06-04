import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, TextInput, Alert } from 'react-native';
import LottieView from 'lottie-react-native';
import { Circle } from 'react-native-progress';
import { GlobalContext } from '../wrappers/GlobalState';

const backgroundImage = require('../../assets/fondo1.png');
const lottieAnimation = require('../../assets/Animation - 1717208193512.json');

const HomeScreen = () => {
  const { state, setState } = useContext(GlobalContext);
  const { targetWater, firstName, lastName, ip } = state;

  const [currentWater, setCurrentWater] = useState(0);
  const [buttonState, setButtonState] = useState({
    text: 'Encender',
    backgroundColor: '#69FF3A',
  });

  const [notifications, setNotifications] = useState([]);
  const [showNotificationBadge, setShowNotificationBadge] = useState(false);
  const [buttonPressTime, setButtonPressTime] = useState('11:00 AM');

  useEffect(() => {
    const fetchWaterLevel = async () => {
      try {
        const response = await fetch(`http://${ip}/waterLevel`);
        const data = await response.json();
        setCurrentWater(data.waterPercentage);
      } catch (error) {
        console.error('Error fetching water level:', error);
      }
    };

    // const interval = setInterval(fetchWaterLevel, 4000);

    fetchWaterLevel();

    // return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentWater >= 90) {
      const now = new Date();
      const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
      const newNotification = `Se llegó a 90% de agua y se apagó automáticamente a las ${time}`;
      setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
      setShowNotificationBadge(true);
      setButtonState({
        text: 'Encender',
        backgroundColor: '#69FF3A',
      });

      const sendRelayOffRequest = async () => {
        try {
          const response = await fetch(`http://${ip}/RELAY=OFF`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
        } catch (error) {
          console.error('Error sending relay off request:', error);
        }
      };

      sendRelayOffRequest();
    }
  }, [currentWater]);

  const handlePress = async () => {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    try {
      const response = await fetch(`http://${ip}/${buttonState.text === 'Encender' ? 'RELAY=ON' : 'RELAY=OFF'}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setButtonState((prevState) => ({
        text: prevState.text === 'Apagar' ? 'Encender' : 'Apagar',
        backgroundColor: prevState.backgroundColor === '#69FF3A' ? '#FF6347' : '#69FF3A',
      }));

      if (buttonState.text === 'Apagar') {
        setButtonPressTime(time);
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema con la petición');
    }
  };

  const handleNotificationPress = () => {
    Alert.alert('🚨 Notificaciones', notifications.join('\n\n'));
    setShowNotificationBadge(false);
  };

  const handleNamePress = () => {
    setIsEditingName(true);
  };

  const handleNameSubmit = () => {
    setIsEditingName(false);
  };

  return (
    <View style={styles.maincontainer}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.greeting}>Hola,</Text>
          <Text style={styles.name}>{firstName} {lastName}</Text>
        </View>
        <TouchableOpacity onPress={handleNotificationPress} style={styles.notificationContainer}>
          <Text style={styles.notificationIcon}>🔔</Text>
          {showNotificationBadge && <View style={styles.notificationBadge} />}
        </TouchableOpacity>
      </View>
      <ImageBackground source={backgroundImage} style={styles.waterContainer} imageStyle={styles.backgroundImage}>
        <Text style={styles.time}>{buttonPressTime}</Text>
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
          <View style={styles.gifBackground}>
            <LottieView
              source={lottieAnimation}
              autoPlay
              loop
              style={styles.lottieView}
            />
            <Circle
              size={150}
              progress={currentWater / 100} // targetWater
              showsText={false}
              color="#ADE5FC"
              thickness={12}
              borderColor='#F3F7FB'
              style={styles.circle}
            />
            <Text style={styles.circleText}>{`${currentWater}%`}</Text>
          </View>
        </View>

        <View style={styles.targetContainer}>
          <View style={styles.targetBackground}>
            <Text style={styles.targetText}>Capacidad</Text>
            <TextInput
              style={styles.targetAmount}
              value={targetWater.toString()}
              onChangeText={(text) => setState({ ...state, targetWater: parseInt(text) || 0})}
              keyboardType="numeric"
            />
            <Text>Litros</Text>
          </View>
        </View>
      </View>

      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={[styles.dashboardButton, { backgroundColor: buttonState.backgroundColor }]}
          onPress={handlePress}
          disabled={currentWater === 90}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerText: {
    marginRight: 10,
  },
  notificationContainer: {
    position: 'relative',
  },
  notificationIcon: {
    fontSize: 30,
    marginTop: 10,
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'red',
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
    marginTop: 30,
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
    marginRight: 20,
  },
  gifBackground: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieView: {
    position: 'absolute',
    width: 150,
    height: 150,
  },
  circle: {
    position: 'absolute',
  },
  circleText: {
    color: '#FFFFFF',
    position: 'absolute',
    top: '60%',
    fontWeight: 'bold',
  },
  targetContainer: {
    justifyContent: 'center',
    width: 120,
    marginLeft: 20,
  },
  targetBackground: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 10,
  },
  targetText: {
    fontSize: 16,
    marginBottom: 5,
  },
  targetAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
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
