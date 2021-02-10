import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppContainer from './src/navigations/AppNavigation';
import * as Font from 'expo-font';
import { Ionicons, AntDesign, Entypo, Octicons, FontAwesome, MaterialCommunityIcons, MaterialIcons   } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import { AuthContext } from './src/contexts/AuthContext';
import { useAuth } from './src/hooks/useAuth';
export default function App() {
  const { auth, state } = useAuth();
  const [isLoadingComplete, setIsLoadingComplete ] = useState(false)
  useEffect(() => {
    native_base();
  })

  

  async function native_base() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...FontAwesome.font,
      ...Ionicons.font,
      ...AntDesign.font,
      ...Entypo.font,
      ...Octicons.font,
      ...MaterialCommunityIcons.font,
      ...MaterialIcons.font
    })
    setIsLoadingComplete(true)
  }

  if (!isLoadingComplete) {
    return <AppLoading />;
  }

  return (
    <AuthContext.Provider value={auth}>
      <AppContainer />
     </AuthContext.Provider>
  );

}
