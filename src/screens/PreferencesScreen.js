import React, { useContext, useLayoutEffect } from 'react';
import { Text, View, Switch, StyleSheet } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../utils/ThemeContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import { darkModeStyles, lightModeStyles } from "../utils/options";

export const PreferencesScreen = () => {
    const navigation = useNavigation();
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);

    const styles = isDarkMode ? darkModeStyles : lightModeStyles;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                ...styles.headerContainer,
            },
            headerTitle: () => (
                <Text style={[styles.headerText, { fontSize: 20 }]}>
                    Preferences
                </Text>
            ),
            headerLeft: () => (
                <Icon
                    name={'bars'}
                    size={20}
                    color={styles.headerIcon.color}
                    style={{ paddingLeft: 15 }}
                    onPress={() => {
                        navigation.dispatch(DrawerActions.toggleDrawer());
                    }}
                />
            ),
            headerRight: () => (
                <View style={{ paddingRight: 20 }}>
                    {/* You can include any component or icon here */}
                </View>
            ),
        });
    }, []);

    const handleToggleTheme = () => {
        // Toggle the theme
        toggleTheme();
        // Reload the entire app to apply the new theme
        navigation.reset({
            index: 0,
            routes: [{ name: 'HymnScreen' }], // Replace 'Root' with the name of your root navigator
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Preferences</Text>
            <Text style={styles.text}>Dark Mode</Text>
            <Switch value={isDarkMode} onValueChange={handleToggleTheme} />
        </View>
    );
};
