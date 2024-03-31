import Icon from 'react-native-vector-icons/Ionicons';
import {Text} from "react-native";
import {DrawerActions, useNavigation} from "@react-navigation/native";

export const navOptions = () => {
    const navigation = useNavigation();
    return {
        headerTintColor: 'black',
        headerStyle: {
            backgroundColor: 'lightgray'
        },
        headerRight: () => (
            <Icon
                name={"menu"}
                size={32}
                color={"black"}
                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer()) }
                style={{paddingRight:10}}
            />
        ),
        headerLeft: () => (
            <Text style={{color:"black", fontSize:20,paddingLeft:10}}>Logo</Text>
        )
    }
}
