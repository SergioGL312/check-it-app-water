import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

// Routes
import { ROUTES } from '../constants/navigation.constants';

// Screens
import HomeScreen from '../screens/HomeScreen';
import HistoryScreen from '../screens/HistoryScreen';
import PredictionScreen from '../screens/PredictionScreen';
import WaterLeaksScreen from '../screens/WaterLeaksScreen';

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Inicio':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Historial de Consumo':
              iconName = focused ? 'stats-chart' : 'stats-chart-outline';
              break;
            case 'Predicción':
              iconName = focused ? 'analytics' : 'analytics-outline';
              break;
            case 'Fugas de Agua':
              iconName = focused ? 'water' : 'water-outline';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#5DCCFC',
        tabBarInactiveTintColor: '#000000',
        tabBarStyle: {
          paddingBottom: 10,
          height: 60,
          borderTopWidth: 0,
          elevation: 0,
        },
        headerShown: false
      })}
    >
      <Tab.Screen name={ROUTES.home} component={HomeScreen} />
      <Tab.Screen name={ROUTES.history} component={HistoryScreen} />
      <Tab.Screen name={ROUTES.prediction} component={PredictionScreen} />
      <Tab.Screen name={ROUTES.leaks} component={WaterLeaksScreen} />
    </Tab.Navigator>
  );
}
