import React, { useContext, useLayoutEffect } from 'react';
import { Text, View, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../utils/ThemeContext';
import Icon from "react-native-vector-icons/FontAwesome";
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
                <TouchableOpacity
                    onPress={() => {
                        navigation.dispatch(DrawerActions.toggleDrawer());
                    }}
                    style={{ marginLeft: 15 }}
                >
                    <Icon name={'bars'} size={20} color={styles.headerIcon.color} />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View style={{ flexDirection: 'row', marginRight: 15 }}>
                    <Icon onPress={toggleTheme} name={isDarkMode ? 'moon-o' : 'sun-o'} size={20} color={styles.headerIcon.color} style={{ marginRight: 10 }} />
                </View>
            ),
        });
    }, [navigation, isDarkMode]);

    const handleToggleTheme = () => {
        toggleTheme();
        navigation.reset({
            index: 0,
            routes: [{ name: 'HymnScreen' }],
        });
    };

    return (
        <View style={styles.container}>
            <Text style={[styles.text, styles.title]}>Preferences</Text>
            <View style={styles.preferenceContainer}>
                <View style={styles.preferenceItem}>
                    <Text style={[styles.text, styles.preferenceLabel]}>Dark Mode</Text>
                    <Switch value={isDarkMode} onValueChange={handleToggleTheme} />
                </View>
            </View>
        </View>
    );
};
