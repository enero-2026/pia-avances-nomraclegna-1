import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PantryScreen from './screens/PantryScreen';
import ChefScreen from './screens/ChefScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: '#1e293b', borderTopColor: '#334155' },
          tabBarActiveTintColor: '#bef264',
          tabBarInactiveTintColor: '#94a3b8',
        }}
      >
        <Tab.Screen
          name="Despensa"
          component={PantryScreen}
          options={{ tabBarIconStyle: { display: 'none' }, tabBarLabelPosition: 'beside-icon' }}
        />
        <Tab.Screen
          name="Chef IA"
          component={ChefScreen}
          options={{ tabBarIconStyle: { display: 'none' }, tabBarLabelPosition: 'beside-icon' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}