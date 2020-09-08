import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import HistoryScreen from '../screens/HistoryScreen'
import MainScreen from '../screens/MainScreen'

const Tab = createBottomTabNavigator()


export default function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Главная страница" 
        component={MainScreen}
        options={{
          tabBarLabel: 'Главная страница',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="home" color="blue" size={20} />
          ),
        }}
      />
      <Tab.Screen 
        name="История запросов" 
        component={HistoryScreen} 
        options={{
          tabBarLabel: 'История запросов',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="history" color="blue" size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

