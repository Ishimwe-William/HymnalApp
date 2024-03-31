import { createDrawerNavigator } from '@react-navigation/drawer';
import {MyPreferencesStack, MyStack} from "../stacks/stacks";

const Drawer = createDrawerNavigator();

export const MyDrawer=()=> {
    return (
        <Drawer.Navigator screenOptions={{headerShown: false}}>
            <Drawer.Screen name="Hymns" component={MyStack} />
            <Drawer.Screen name="Preferences" component={MyPreferencesStack} />
        </Drawer.Navigator>
    );
}
