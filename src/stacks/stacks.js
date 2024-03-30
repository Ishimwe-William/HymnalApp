import { createStackNavigator } from '@react-navigation/stack';
import {SettingsScreen} from "../screens/SettingsScreen";
import {HymnScreen} from "../screens/HymnScreen";
import {navOptions} from "../utils/options";
import {useNavigation} from "@react-navigation/native";

const Stack=createStackNavigator();

export const MyStack=()=> {
    const navigation = useNavigation();
    return (
        <Stack.Navigator screenOptions={()=>navOptions(navigation)}>
            <Stack.Screen name="HymnStack" component={HymnScreen}/>
            {/*<Stack.Screen name="SettingsStack" component={SettingsScreen} />*/}
        </Stack.Navigator>
    );
}

export const MySettingsStack=()=> {
    const navigation = useNavigation();
    return (
        <Stack.Navigator screenOptions={()=>navOptions(navigation)}>
            {/*<Stack.Screen name="HymnStack" component={HymnScreen}/>*/}
            <Stack.Screen name="SettingsStack" component={SettingsScreen} />
        </Stack.Navigator>
    );
}
