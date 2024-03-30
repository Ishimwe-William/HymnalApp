import {Text, View} from "react-native";
import {useLayoutEffect} from "react";
import Icon from "react-native-vector-icons/Ionicons";
import {DrawerActions, useNavigation} from "@react-navigation/native";

export const HymnScreen = () => {

    const navigation = useNavigation();

    function handleSearch() {
        console.log("Searching!")
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Indirimbo",
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
            <Text>Hymnals</Text>
        </View>
    )
}
