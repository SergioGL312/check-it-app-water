// screens/AlarmScreen.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { GlobalContext } from '../wrappers/GlobalState';

const screenWidth = Dimensions.get('window').width;

const GoalCard = ({ title, amount, icon }) => (
  <View style={styles.goalCard}>
    <Text style={styles.goalTitle}>{title}</Text>
    <Text style={styles.goalAmount}>{amount}</Text>
    <Text style={styles.goalIcon}>{icon}</Text>
  </View>
);

const getChartColors = (data) => {
  const average = data.reduce((sum, value) => sum + value, 0) / data.length;

  let backgroundColor = "#00FF00"; // Green
  let backgroundGradientFrom = "#00FF00";
  let backgroundGradientTo = "#00FF00";

  if (data.some(value => value > average)) {
    backgroundColor = "#FF0000"; // Red
    backgroundGradientFrom = "#FF4500"; // Orange red
    backgroundGradientTo = "#FF6347"; // Tomato
  } else if (data.some(value => value > average * 0.75)) {
    backgroundColor = "#FFA500"; // Orange
    backgroundGradientFrom = "#FFD700"; // Gold
    backgroundGradientTo = "#FFA500"; // Orange
  }

  return {
    backgroundColor,
    backgroundGradientFrom,
    backgroundGradientTo
  };
};

const AlarmScreen = () => {
  const weeklyData = [90, 50, 80, 100, 83, 75, 44];
  
  const { backgroundColor, backgroundGradientFrom, backgroundGradientTo } = getChartColors(weeklyData);

  const { state } = useContext(GlobalContext);
  const { targetWater } = state;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>🔮 Predicción de Consumo a Futuro</Text>
        <View style={styles.cardContainer}>
          <View style={styles.cardFullWidth}>
            <Text style={styles.title}>Semanal</Text>
            <BarChart
              data={{
                labels: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
                datasets: [
                  {
                    data: weeklyData
                  }
                ]
              }}
              width={screenWidth * 0.9}
              height={220}
              yAxisSuffix=" L"
              chartConfig={{
                backgroundColor,
                backgroundGradientFrom,
                backgroundGradientTo,
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16
                },
                barPercentage: 0.7,
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}
              max={targetWater}
            />
          </View>
        </View>
        
        <Text style={styles.goalHeader}>Consejos para evitar el consumo excesivo de agua</Text>
        <Text style={styles.goalSubHeader}>Aquí tienes algunos consejos para ahorrar agua.</Text>
        <View style={styles.goalsContainer}>
          <GoalCard title="Duchas más cortas" amount="Ahorre agua reduciendo el tiempo de ducha" icon="🚿" />
          <GoalCard title="Reparar las fugas" amount="Comprueba si hay fugas y repáralas" icon="🔧" />
          <GoalCard title="Cerrar el grifo" amount="No deje el grifo abierto mientras se cepilla los dientes" icon="🚰" />
          <GoalCard title="Cargas completas" amount="Pon el lavavajillas y la lavadora a plena carga" icon="🧺" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 25,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  cardFullWidth: {
    width: '100%',
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  goalHeader: {
    fontSize: 21,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
    textAlign: 'center',
  },
  goalSubHeader: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  goalsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  goalCard: {
    width: '45%',
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  goalAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007AFF',
    textAlign: 'center',
  },
  goalIcon: {
    fontSize: 24,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default AlarmScreen;
