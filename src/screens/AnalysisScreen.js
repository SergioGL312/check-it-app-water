// screens/AnalysisScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const AnalysisScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>For Today</Text>
        <View style={styles.cardContainer}>
          <View style={styles.cardFullWidth}>
            <Text style={styles.title}>Semanal</Text>
            <BarChart
              data={{
                labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                datasets: [
                  {
                    data: [2.1, 2.5, 2.2, 2.0, 2.3, 2.1, 2.4]
                  }
                ]
              }}
              width={screenWidth * 0.9}
              height={220}
              chartConfig={{
                backgroundColor: "#0000FF",
                backgroundGradientFrom: "#1E90FF",
                backgroundGradientTo: "#87CEFA",
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16
                }
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}
            />
            {/* <Text style={styles.data}>2.1 liters</Text> */}
          </View>
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.cardFullWidth}>
            <Text style={styles.title}>Mensual</Text>
            <LineChart
              data={{
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                datasets: [
                  {
                    data: [20, 45, 28, 80, 99, 43, 55]
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
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16
                }
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}
            />
            {/* <Text style={styles.data}>2628 Steps Completed</Text> */}
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10,
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
  data: {
    fontSize: 22,
    color: '#007AFF',
    fontWeight: 'bold',
  },
});

export default AnalysisScreen;
