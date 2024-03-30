import {Text, View} from "react-native";
import {DrawerActions, useNavigation} from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import {useLayoutEffect} from "react";

export const SettingsScreen = () => {
    const navigation = useNavigation();

    function handleSearch() {
        console.log("Searching!")
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Preferences",
            headerRight: () => (
                <Icon
                    name={"search"}
                    size={25}
                    color={"black"}
                    onPress={() => handleSearch()}
                    style={{marginRight: 10}}
                />
            ),
            headerLeft: () => (
                <Icon
                    name={"menu"}
                    size={32}
                    color={"black"}
                    onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
                    style={{marginLeft: 10}}
                />
            )
        })
    })

    return (
        <View>
            <Text>Preferences</Text>
        </View>
    )
}
