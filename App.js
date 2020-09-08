import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import { Navbar } from './src/Navbar'
import MyTabs from './src/navigation/appNavigator'


export default function App() {

  return (
    <NavigationContainer>
      <Navbar title="Твое месторасположение" />
      <MyTabs />
    </NavigationContainer>  
  )
}

