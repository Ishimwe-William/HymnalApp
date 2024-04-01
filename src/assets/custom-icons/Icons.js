import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { DrawerActions } from '@react-navigation/native';

const MenuIcon = ({ size = 25, color = 'black', style }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            style={style}
        >
            <Text
                style={{
                    fontFamily: 'normal', // Replace 'YourMenuIconFontFamily' with your custom icon font family
                    fontSize: size,
                    color: color,
                }}
            >
                {'\u2630'} {/* Unicode for the menu icon */}
            </Text>
        </TouchableOpacity>
    );
};

const BackIcon = ({ size = 25, color = 'black', style }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={style}
        >
            <Text
                style={{
                    fontFamily: 'normal', // Replace 'YourBackIconFontFamily' with your custom icon font family
                    fontSize: size,
                    color: color,
                }}
            >
                {'\u21E6'} {/* Unicode for the left arrow */}
            </Text>
        </TouchableOpacity>
    );
};

export { MenuIcon, BackIcon };
