import React, { useContext, useState, useLayoutEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { DrawerActions, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { darkModeStyles, lightModeStyles } from "../utils/options";
import { ThemeContext } from "../utils/ThemeContext";

export const HymnDetailScreen = ({ route }) => {
    const { hymn } = route.params;
    const navigation = useNavigation();
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    // Conditionally apply styles based on the theme
    const { isDarkMode } = useContext(ThemeContext);
    const style = isDarkMode ? darkModeStyles : lightModeStyles;

    function handleMenu() {
        setIsMenuVisible(true);
    }

    function closeMenu() {
        setIsMenuVisible(false);
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                ...style.headerContainer,
            },
            headerTitle: () => (
                <Text style={[style.headerText, { fontSize: 20 }]}>Indirimbo </Text>
            ),
            headerLeft: () => (
                <TouchableOpacity
                    onPress={() => navigation.goBack()}>
                    <Icon name={'arrow-left'} size={20} color={style.headerIcon.color}
                          style={{ paddingLeft: 15 }} />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={handleMenu}>
                        <Icon name={'ellipsis-v'} size={20} color={style.headerIcon.color} style={{ paddingRight: 20 }} />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation]);


    return (
        <View style={styles.container}>
            <Text style={styles.hymnNumber}>{hymn.hymnNumber}</Text>
            <Text style={styles.title}>{hymn.title}</Text>
            {hymn.stanzas.map((stanza) => (
                <View key={stanza.id} style={styles.stanzaContainer}>
                    <Text style={styles.stanzaNumber}>{stanza.number}</Text>
                    <Text style={styles.stanzaText}>{stanza.text}</Text>
                    {/* Display refrain if stanza number matches any refrain number */}
                    {hymn.refrains.some(refrain => refrain.number === stanza.number) &&
                        hymn.refrains.map(refrain => {
                            if (refrain.number === stanza.number) {
                                return (
                                    <View key={refrain.id} style={styles.refrainContainer}>
                                        <Text style={styles.refrainNumber}>Refrain</Text>
                                        <Text style={styles.refrainText}>{refrain.text}</Text>
                                    </View>
                                );
                            }
                            return null;
                        })
                    }
                </View>
            ))}
            <Modal
                animationType="fade"
                transparent={true}
                visible={isMenuVisible}
                onRequestClose={closeMenu}
            >
                <TouchableWithoutFeedback onPress={closeMenu}>
                    <View style={style.modalContainer}>
                        <TouchableWithoutFeedback>
                            <View style={style.modalContent}>
                                <TouchableOpacity style={styles.menuItem} onPress={closeMenu}>
                                    <Text style={style.text}>Add to Favorites</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.menuItem} onPress={closeMenu}>
                                    <Text style={style.text}>Share</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    hymnNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    title: {
        fontSize: 16,
        marginBottom: 20,
    },
    stanzaContainer: {
        marginBottom: 30,
        alignItems: 'center',
    },
    stanzaNumber: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    stanzaText: {
        marginTop: 5,
        textAlign: 'center',
    },
    refrainContainer: {
        marginLeft: 20,
        marginTop: 10,
        alignItems: 'center',
    },
    refrainNumber: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    refrainText: {
        marginTop: 5,
        textAlign: 'center',
    },
    menuItem: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});
