import React, {useContext, useState, useLayoutEffect} from 'react';
import {Text, View, TouchableOpacity, Modal, TouchableWithoutFeedback, ScrollView} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import {darkModeStyles, lightModeStyles} from "../utils/options";
import {ThemeContext} from "../utils/ThemeContext";

export const HymnDetailScreen = ({route}) => {
    const {hymn} = route.params;
    const navigation = useNavigation();
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [displayMusicSheet, setDisplayMusicSheet] = useState(false);
    const {isDarkMode} = useContext(ThemeContext);
    const styles = isDarkMode ? darkModeStyles : lightModeStyles;

    function handleMenu() {
        setIsMenuVisible(true);
    }

    function closeMenu() {
        setIsMenuVisible(false);
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                ...styles.headerContainer,
            },
            headerTitle: () => (
                <Text style={[styles.headerText, {fontSize: 20}]}>Indirimbo No. {hymn.number} </Text>
            ),
            headerLeft: () => (
                <TouchableOpacity
                    onPress={() => navigation.goBack()}>
                    <Icon name={'arrow-left'} size={20} color={styles.headerIcon.color}
                          style={{paddingLeft: 15}}/>
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={handleMenu}>
                        <Icon name={'ellipsis-v'} size={20} color={styles.headerIcon.color} style={{paddingRight: 20}}/>
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation]);


    return (
        <View style={styles.container1}>
            {!displayMusicSheet ? (
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Text selectable style={styles.title}>{hymn.title}</Text>
                    {hymn.stanzas.map((stanza) => (
                        <View key={stanza.id} style={styles.hymnBodyContainer}>
                            <Text style={styles.stanzaNumber}>{stanza.number}</Text>
                            <Text selectable style={styles.stanzaText}>{stanza.text}</Text>
                            {/* Display refrain if stanza number matches any refrain number */}
                            {hymn.refrains.some(refrain => refrain.number === stanza.number) &&
                                hymn.refrains.map(refrain => {
                                    if (refrain.number === stanza.number) {
                                        return (
                                            <View key={refrain.id}>
                                                <Text style={styles.refrainNumber}>Refrain:</Text>
                                                <Text selectable style={styles.refrainText}>{refrain.text}</Text>
                                            </View>
                                        );
                                    }
                                    return null;
                                })
                            }
                        </View>
                    ))}
                </ScrollView>
            ) : (
                <View style={styles.sheetContainer}>
                    <Text>Music Sheet goes here</Text>
                </View>
            )}
            <Modal
                animationType="fade"
                transparent={true}
                visible={isMenuVisible}
                onRequestClose={closeMenu}
            >
                <TouchableWithoutFeedback onPress={closeMenu}>
                    <View style={styles.modalContainer}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalContent}>
                                <TouchableOpacity style={styles.menuItem} onPress={closeMenu}>
                                    <Text style={styles.text}>Report Issue</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.menuItem} onPress={closeMenu}>
                                    <Text style={styles.text}>Share</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, {backgroundColor: styles.text}]}
                    onPress={() => setIsPlaying(!isPlaying)}
                >
                    <Icon
                        name={isPlaying ? 'pause' : 'play'}
                        size={20}
                        color={styles.text.color}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                                  onPress={() => setIsPlaying(false)}
                >
                    <Icon name="stop" size={20} color={styles.text.color}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Icon name="repeat" size={20} color={styles.text.color}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                                  onPress={() => setIsFavorite(!isFavorite)}
                >
                    <Icon
                        name={isFavorite ? "star" : "star-o"}
                        size={20}
                        color={styles.text.color}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setDisplayMusicSheet(!displayMusicSheet)}
                >
                    <Icon
                        name={displayMusicSheet ? 'file-text' : 'music'}
                        size={20}
                        color={styles.text.color}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};
