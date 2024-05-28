import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

// Routes
import { ROUTES } from '../constants/navigation.constants';

// Screens
import HomeScreen from '../screens/HomeScreen';
import AnalysisScreen from '../screens/AnalysisScreen';
import AlarmScreen from '../screens/AlarmScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Analysis':
              iconName = focused ? 'stats-chart' : 'stats-chart-outline';
              break;
            case 'Alarm':
              iconName = focused ? 'alarm' : 'alarm-outline';
              break;
            case 'Settings':
              iconName = focused ? 'settings' : 'settings-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#5DCCFC', // tomato
        tabBarInactiveTintColor: '#000000', // gray
        tabBarStyle: {
          paddingBottom: 10,
          height: 60,
          borderTopWidth: 0, // Elimina la línea superior
          elevation: 0, // Elimina la sombra en Android
        },
        headerShown: false
      })}
    >
      <Tab.Screen name={ROUTES.home} component={HomeScreen} />
      <Tab.Screen name={ROUTES.analysis} component={AnalysisScreen} />
      <Tab.Screen name={ROUTES.alarm} component={AlarmScreen} />
      <Tab.Screen name={ROUTES.settings} component={SettingsScreen} />
      <Tab.Screen name={ROUTES.profile} component={ProfileScreen} />
    </Tab.Navigator>
  );
}
