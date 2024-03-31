import React, {useContext, useLayoutEffect} from 'react';
import {Text, View, Switch, StyleSheet} from 'react-native';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {ThemeContext} from '../utils/ThemeContext';

export const PreferencesScreen = () => {
    const navigation = useNavigation();
    const {isDarkMode, toggleTheme} = useContext(ThemeContext);

    const styles = isDarkMode ? darkModeStyles : lightModeStyles;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'Preferences',
            headerLeft: () => (
                <Icon
                    name={'menu'}
                    size={25}
                    color={'black'}
                    style={{paddingLeft: 20}}
                    onPress={() => {
                        navigation.dispatch(DrawerActions.toggleDrawer());
                    }}
                />
            ),
            headerRight: () => (
                <View style={{paddingRight: 20}}>
                    {/* You can include any component or icon here */}
                </View>
            ),
        });
    }, [navigation]); // Include navigation in the dependency array

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Preferences</Text>
            <Text style={styles.text}>Dark Mode</Text>
            <Switch value={isDarkMode} onValueChange={toggleTheme}/>
        </View>
    );
};

export const lightModeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white', // Light mode background color
    },
    text: {
        color: '#000',
    },
});

export const darkModeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212', // Dark mode background color
    },
    text: {
        color: '#fff',
    },
});
