import {StatusBar} from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {MyDrawer} from "./src/drawer/drawer";

export default function App() {
    return (
        <NavigationContainer>
            <MyDrawer/>
            <StatusBar
                backgroundColor={'black'} style={'light'}/>
        </NavigationContainer>
    );
}

