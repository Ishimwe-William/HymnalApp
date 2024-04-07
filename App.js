import React from 'react';
import {StatusBar} from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native';
import {MyDrawer} from './src/drawer/drawer';
import {ThemeProvider} from "./src/utils/ThemeContext";
import AddHymnScreen from "./src/db-schema/AddHymnForm";

export default function App() {

    return (
        <ThemeProvider>
            {/*<AddHymnScreen/>*/}
            <NavigationContainer>
                <MyDrawer />
                <StatusBar backgroundColor={'black'} style={'light'} />
            </NavigationContainer>
        </ThemeProvider>
    );
}
