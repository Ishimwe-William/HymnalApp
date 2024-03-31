import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HymnScreen } from "../screens/HymnScreen";
import { NavOptions } from "../utils/options";
import { PreferencesScreen } from "../screens/PreferencesScreen";
import { HymnDetailScreen } from "../screens/HymnDetailScreen";

const Stack = createStackNavigator();

export const MyStack = () => {
    return (
        <Stack.Navigator screenOptions={NavOptions}>
            <Stack.Screen name="HymnScreen" component={HymnScreen} />
            <Stack.Screen name="HymnDetailScreen" component={HymnDetailScreen} />
        </Stack.Navigator>
    );
}

export const MyPreferencesStack = () => {
    return (
        <Stack.Navigator screenOptions={NavOptions}>
            <Stack.Screen name="PreferencesScreen" component={PreferencesScreen} />
        </Stack.Navigator>
    );
}
