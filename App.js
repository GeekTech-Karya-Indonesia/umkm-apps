import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppContainer from './src/navigations/AppNavigation';
import * as Font from 'expo-font';
import { Ionicons, AntDesign, Entypo, Octicons, MaterialCommunityIcons  } from '@expo/vector-icons';
import { AppLoading } from 'expo';
export default function App() {
  const [isLoadingComplete, setIsLoadingComplete ] = useState(false)
  useEffect(() => {
    native_base();
  })

  

  async function native_base() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
      ...AntDesign.font,
      ...Entypo.font,
      ...Octicons.font,
      ...MaterialCommunityIcons .font
    })
    setIsLoadingComplete(true)
  }

  if (!isLoadingComplete) {
    return <AppLoading />;
  }

  return (
     <AppContainer />
  );

}
