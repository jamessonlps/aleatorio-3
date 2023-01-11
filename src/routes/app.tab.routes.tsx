import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Home } from "../screens/Home";
import { MyCars } from "../screens/MyCars";
import { AppStackRoutes } from "./app.stack.routes";


export type RootTabParamList = {
  HomeStack: undefined;
  Profile: undefined;
  MyCars: undefined;
}

export type AppTabNavigatorRoutesProps = NativeStackNavigationProp<RootTabParamList>;


const { Navigator, Screen } = createBottomTabNavigator<RootTabParamList>();

export function AppTabRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
        name="HomeStack"
        component={AppStackRoutes}
      />
      <Screen
        name="Profile"
        component={Home}
      />
      <Screen
        name="MyCars"
        component={MyCars}
      />

    </Navigator>
  );
}