import React from 'react'
import {View,Text,StyleSheet} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Welcome, Home} from './src/screens'
import Login from './src/screens/Auth/Login'
import Signup from './src/screens/Auth/Signup'

const Stack = createNativeStackNavigator();
const App = () => {
  return(
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}} >
          <Stack.Screen name='Welcome' component={Welcome}/>
          <Stack.Screen name ='Home' component={Home}/>
          <Stack.Screen name ='Login' component={Login}/>
          <Stack.Screen name ='Signup' component={Signup}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
} 

export default App