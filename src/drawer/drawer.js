import {createDrawerNavigator} from '@react-navigation/drawer';
import {MyPreferencesStack, MyStack} from "../stacks/stacks";
import { darkModeStyles, lightModeStyles} from "../utils/options";
import {ThemeContext} from "../utils/ThemeContext";
import {useContext} from "react";
import {CustomDrawerContent} from "./CustomDrawer";

const Drawer = createDrawerNavigator();

export const MyDrawer = () => {
    const { isDarkMode } = useContext(ThemeContext);
    const styles = isDarkMode ? darkModeStyles : lightModeStyles;

    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown:false,
            }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen name="Indirimbo" component={MyStack} />
            <Drawer.Screen name="Preferences" component={MyPreferencesStack} />
        </Drawer.Navigator>
    );
}
