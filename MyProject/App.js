import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SplashScreen from './screens/SplashScreen';
import Auth from './screens/Auth';
import Home from './screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={({ route }) => {
      let iconName;
      if (route.name === 'Home') {
        iconName = 'home-outline';
      }
      return {
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={iconName} size={size} color={color} />
        ),
        tabBarActiveTintColor: '#0061FF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      };
    }}>
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  )
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Simulate a 3-second loading time
  }, []);

  if (isLoading) {
    return (
        <SplashScreen />
    );
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Auth' screenOptions={{headerShown: false}}>
          <Stack.Screen 
            name="Auth" 
            component={Auth} 
          />
          <Stack.Screen 
            name="MainTabs" 
            component={MainTabs}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
