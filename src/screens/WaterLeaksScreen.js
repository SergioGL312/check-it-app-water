import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MonthNavigator = ({ month, onNext, onPrevious, canGoNext, canGoPrevious }) => {
  return (
    <View style={styles.navigatorContainer}>
      <TouchableOpacity onPress={onPrevious} disabled={!canGoPrevious}>
        <Ionicons name="arrow-back" size={24} color={!canGoPrevious ? '#ccc' : '#555'} />
      </TouchableOpacity>
      <Text style={styles.monthText}>{month}</Text>
      <TouchableOpacity onPress={onNext} disabled={!canGoNext}>
        <Ionicons name="arrow-forward" size={24} color={!canGoNext ? '#ccc' : '#555'} />
      </TouchableOpacity>
    </View>
  );
};

const WaterLeaksScreen = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(4);
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const totalDaysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Datos de las fechas con anomalías
  const anomalies = [
    { date: '2024-04-29', consumption: 205, anomaly: -1 },
    { date: '2024-04-30', consumption: 210, anomaly: -1 },
    { date: '2024-05-01', consumption: 51, anomaly: -1 },
    { date: '2024-05-18', consumption: 53, anomaly: -1 },
    { date: '2024-05-22', consumption: 51, anomaly: -1 }
  ];

  const canGoNext = currentMonthIndex < months.length - 1;
  const canGoPrevious = currentMonthIndex > 0;

  const generateDaysOfMonth = (totalDays) => {
    const days = [];
    const currentMonth = currentMonthIndex + 1;
    const currentYear = 2024;

    const anomalyDates = new Set(anomalies.map(anomaly => anomaly.date));

    for (let i = 1; i <= totalDays; i++) {
      const dateString = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
      const isAnomaly = anomalyDates.has(dateString);

      days.push(
        <TouchableOpacity
          key={i}
          style={[
            styles.dayButton,
            selectedDate === i ? styles.selectedDay : null,
            isAnomaly ? styles.anomalyDay : styles.normalDay
          ]}
          onPress={() => setSelectedDate(i)}
        >
          <Text style={[styles.dayText, isAnomaly ? styles.anomalyText : styles.normalText]}>{i}</Text>
        </TouchableOpacity>
      );
    }
    return days;
  };

  const goToNextMonth = () => {
    if (canGoNext) {
      setCurrentMonthIndex((prevIndex) => prevIndex + 1);
    }
  };

  const goToPreviousMonth = () => {
    if (canGoPrevious) {
      setCurrentMonthIndex((prevIndex) => prevIndex - 1);
    }
  };

  // Filtrar las anomalías del mes actual
  const currentMonth = currentMonthIndex + 1;
  const currentYear = 2024;
  const currentMonthAnomalies = anomalies.filter(anomaly =>
    new Date(anomaly.date).getMonth() + 1 === currentMonth &&
    new Date(anomaly.date).getFullYear() === currentYear
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.headerText}>🔍     Detección de anomalías</Text>

        <View style={styles.centeredContent}>
          <MonthNavigator
            month={months[currentMonthIndex]}
            onNext={goToNextMonth}
            onPrevious={goToPreviousMonth}
            canGoNext={canGoNext}
            canGoPrevious={canGoPrevious}
          />
          <View style={styles.calendarContainer}>
            {generateDaysOfMonth(totalDaysInMonth[currentMonthIndex])}
          </View>
        </View>
        {currentMonthAnomalies.length === 0 ? (
          <View style={styles.noAnomalyContainer}>
            <Text style={styles.noAnomalyText}>No hay anomalías en este mes.</Text>
          </View>
        ) : (
          currentMonthAnomalies.map((anomaly, index) => (
            <View key={index} style={styles.anomalyCard}>
              <View style={styles.anomalyInfoContainer}>
                <Text style={styles.infoCartText}>Fecha:</Text>
                <Text style={styles.anomalyCardText}>{anomaly.date}</Text>
              </View>
              <View style={styles.anomalyInfoContainer}>
                <Text style={styles.infoCartText}>Consumo:</Text>
                <Text style={styles.anomalyCardText}>{anomaly.consumption}</Text>
              </View>
            </View>
          ))
        )}
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
  centeredContent: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    padding: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 25,
    color: '#333',
  },
  navigatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  monthText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#555',
    marginHorizontal: 10,
  },
  calendarContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  dayButton: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectedDay: {
    backgroundColor: '#64b5f6',
  },
  anomalyDay: {
    backgroundColor: '#E74C3C',
  },
  normalDay: {
    backgroundColor: '#f0f0f0',
  },
  normalText: {
    color: '#333',
  },
  dayText: {
    fontSize: 18,
    color: '#333',
  },
  anomalyText: {
    color: 'white',
  },
  anomaliesContainer: {
    marginTop: 20,
    width: '90%',
  },
  anomalyCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginVertical: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ced4da',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  anomalyInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  infoCartText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  anomalyCardText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'right',
  },
  noAnomalyContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  noAnomalyText: {
    fontSize: 16,
    color: '#555',
  },
});

export default WaterLeaksScreen;