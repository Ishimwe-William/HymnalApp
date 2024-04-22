import React, {useContext} from 'react';
import {useNavigation} from "@react-navigation/native";
import {StyleSheet} from 'react-native';
import {ThemeContext} from "./ThemeContext";
import Icon from 'react-native-vector-icons/FontAwesome';

export const NavOptions = () => {
    const navigation = useNavigation();

    const {isDarkMode} = useContext(ThemeContext);
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
                onPress={() => navigation.goBack()}
                style={{paddingLeft: 15}}
            />
        )
    };
};


export const darkModeStyles = StyleSheet.create({
    container: {
        backgroundColor: '#313435',
        flex: 1,
    },
    headerContainer: {
        backgroundColor: '#000',
    },
    drawerContainer: {
        backgroundColor: '#204855',
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#204855',
        padding: 20,
        borderRadius: 10,
        borderColor: '#000'
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
        borderColor: '#000',
        backgroundColor: '#fff'
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
    preferenceContainer: {
        marginTop: 20,
    },
    preferenceItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        padding: 10,
    },
    preferenceLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    container1: {
        flex: 1,
        backgroundColor: '#313435',
        justifyContent: 'flex-start',
        padding: 10,
    },
    title: {
        fontSize: 22,
        padding: 10,
        color: '#fff',
        fontWeight: 'bold',
    },
    hymnBodyContainer: {
        padding: 10,
        alignItems: 'center',
    },
    stanzaNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    stanzaText: {
        fontWeight: '300',
        color: '#fff',
        fontSize: 20,
    },

    refrainNumber: {
        padding: 5,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    refrainText: {
        fontStyle: 'italic',
        fontWeight: '300',
        color: '#fff',
        fontSize: 18,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },
    button: {
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 5,
    },
    menuItem: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    scrollContent: {
        flexGrow: 1,
        alignItems: 'center',
        paddingBottom: 30,
    },
    sheetContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 30,
    }
});

export const lightModeStyles = StyleSheet.create({

    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    headerContainer: {
        backgroundColor: '#3E8188',
    },
    drawerContainer: {
        backgroundColor: '#3E8188',
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
    },
    text: {
        color: '#000',
    },
    drawerText: {
        color: '#fff',
    },
    textInput: {
        color: '#000',
        borderColor: '#000',
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
    preferenceContainer: {
        marginTop: 20,
    },
    preferenceItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        padding: 10,
    },
    preferenceLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    container1: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        padding: 10,
    },

    hymnBodyContainer: {
        padding: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        padding: 10,
        color: '#000',
        fontWeight: 'bold',
    },

    stanzaNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    stanzaText: {
        fontWeight: '300',
        color: '#000',
        fontSize: 20,
    },

    refrainNumber: {
        padding: 5,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    refrainText: {
        fontStyle: 'italic',
        fontWeight: '300',
        color: '#000',
        fontSize: 18,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },
    button: {
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 5,
    },
    menuItem: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    scrollContent: {
        flexGrow: 1,
        alignItems: 'center',
        paddingBottom: 30,
    },
    sheetContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 30,
    }
});
