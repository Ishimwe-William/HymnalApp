import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";

export const NavOptions = () => {
    const navigation = useNavigation();

    return {
        headerTintColor: 'black',
        headerStyle: {
            backgroundColor: 'lightgray'
        },
        headerRight: () => null,
        headerLeft: () => (
            <Icon
                name={"arrow-back"}
                size={25}
                color={"black"}
                onPress={() => navigation.goBack() }
                style={{paddingLeft:15}}
            />
        )
    };
};
