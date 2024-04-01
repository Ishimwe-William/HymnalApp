import React, { useContext } from 'react';
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from 'react-native';
import { ThemeContext } from "./ThemeContext";
import Icon from 'react-native-vector-icons/FontAwesome';
import {DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";
import {Image, View} from "react-native";

export const NavOptions = () => {
    const navigation = useNavigation();

    const { isDarkMode } = useContext(ThemeContext);
    const styles = isDarkMode ? darkModeStyles : lightModeStyles;

    return {
        headerTintColor: styles.headerTintColor.color,
        headerStyle: {
            ...styles.headerContainer,
        },
        headerRight: () => null,
        headerLeft: () => (
            <Icon
                name={'arrow-left'}
                size={20}
                color={styles.headerIcon.color}
                onPress={() => navigation.goBack() }
                style={{ paddingLeft: 15 }}
            />
        )
    };
};


export const darkModeStyles = StyleSheet.create({
    container: {
        backgroundColor: '#313435',
    },
    headerContainer: {
        backgroundColor: '#000',
    },
    drawerContainer: {
        backgroundColor: '#204855',
    },
    text: {
        color: '#fff',
    },
    headerText: {
        color: '#fff',
    },
    drawerText: {
        color: '#fff',
    },
    textInput: {
        color: '#313435',
        borderColor:'#000',
        backgroundColor:'#fff'
    },
    headerTintColor: {
        color: 'white',
    },
    icon: {
        color: '#fff',
    },
    headerIcon: {
        color: '#fff',
    },
    list: {
        borderBottomColor: '#000',
    },
});

export const lightModeStyles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    headerContainer: {
        backgroundColor: '#3E8188',
    },
    drawerContainer: {
        backgroundColor: '#3E8188',
    },
    text: {
        color: '#000',
    },
    drawerText: {
        color: '#fff',
    },
    textInput: {
        color: '#000',
        borderColor:'#000',
    },
    headerText: {
        color: '#fff',
    },
    headerTintColor: {
        color: 'black',
    },
    icon: {
        color: '#000', // Change to desired color for light mode
    },
    headerIcon: {
        color: '#fff', // Change to desired color for light mode
    },
    list: {
        borderBottomColor: '#3E8188',
    },
});

