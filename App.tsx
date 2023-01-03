import "react-native-gesture-handler";
import React from 'react';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components/native';
import {
  useFonts,
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold
} from "@expo-google-fonts/archivo"
import {
  Inter_400Regular,
  Inter_500Medium
} from "@expo-google-fonts/inter"


import theme from './src/styles/theme';
import { Routes } from "./src/routes";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold,
    Inter_400Regular,
    Inter_500Medium
  });

  if (!fontsLoaded) {
    <AppLoading />
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

