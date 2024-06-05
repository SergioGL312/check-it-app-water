import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { GlobalContext } from '../wrappers/GlobalState';

const screenWidth = Dimensions.get('window').width;

const AnalysisScreen = () => {
  const { state } = useContext(GlobalContext);
  const { targetWater } = state;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>🌟 Por Hoy</Text>
        <View style={styles.cardContainer}>
          <View style={styles.cardFullWidth}>
            <Text style={styles.title}>Consumo Semanal</Text>
            <BarChart
              data={{
                labels: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
                datasets: [
                  {
                    // data: [90, 50, 80, 100, 83, 75, 44]
                    data: [100, 86, 15, 0, 0, 0, 0]
                  }
                ]
              }}
              width={screenWidth * 0.9}
              height={220}
              yAxisSuffix=" L"
              yAxisInterval={1}
              chartConfig={{
                backgroundColor: "#0000FF",
                backgroundGradientFrom: "#1E90FF",
                backgroundGradientTo: "#87CEFA",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16
                },
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                propsForLabels: {
                  fontSize: 12,
                },
                barPercentage: 0.7,
              }}
              verticalLabelRotation={0}
              fromZero={true}
              showBarTops={true}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
              yLabelsOffset={20}
              max={targetWater}
            />
          </View>
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.cardFullWidth}>
            <Text style={styles.title}>Consumo Mensual</Text>
            <LineChart
              data={{
                labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul"],
                datasets: [
                  {
                    data: [0, 0, 0, 80, 99, 13, 0]
                  },
                  {
                    data: new Array(7).fill(targetWater),
                    withDots: false,
                  }
                ]
              }}
              width={screenWidth * 0.9}
              height={220}
              yAxisLabel=""
              chartConfig={{
                backgroundColor: "#0000FF",
                backgroundGradientFrom: "#1E90FF",
                backgroundGradientTo: "#87CEFA",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16
                },
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}
              withHorizontalLines={true}
            />
          </View>
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
    // textAlign: 'center'
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
});

export default AnalysisScreen;
