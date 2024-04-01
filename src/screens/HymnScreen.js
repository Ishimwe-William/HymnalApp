import React, {useState, useLayoutEffect, useContext} from 'react';
import {Text, View, FlatList, TouchableOpacity, TextInput} from 'react-native';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {DummyHymns} from '../dummy/Dummy';
import {ThemeContext} from "../utils/ThemeContext";
import {darkModeStyles, lightModeStyles} from "../utils/options";

export const HymnScreen = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [filteredHymns, setFilteredHymns] = useState(DummyHymns);

    // Conditionally apply styles based on the theme
    const {isDarkMode} = useContext(ThemeContext);
    const styles = isDarkMode ? darkModeStyles : lightModeStyles;

    const handleSearch = () => {
        const query = searchQuery.toLowerCase();
        const filtered = DummyHymns.filter((hymn) => {
            // Check if the hymn title matches the query
            if (hymn.title.toLowerCase().includes(query)) {
                return true;
            }
            // Check if the hymn number matches the query
            if (hymn.hymnNumber.includes(query)) {
                return true;
            }
            // Check if any stanza text matches the query
            for (const stanza of hymn.stanzas) {
                if (stanza.text.toLowerCase().includes(query)) {
                    return true;
                }
            }
            // Check if any refrain text matches the query
            for (const refrain of hymn.refrains) {
                if (refrain.text.toLowerCase().includes(query)) {
                    return true;
                }
            }
            return false;
        });
        setFilteredHymns(filtered);
    };


    const toggleSearch = () => {
        if (isSearchActive) {
            setSearchQuery('');
            setFilteredHymns(DummyHymns);
        }
        setIsSearchActive(!isSearchActive);
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                ...styles.headerContainer,
            },
            headerTitle: () => (
                <Text style={[styles.headerText, {fontSize: 20}]}>
                    {isSearchActive ? 'Ishakiro' : 'Indirimbo'}
                </Text>
            ),
            headerLeft: () => (
                <TouchableOpacity
                    onPress={isSearchActive ? toggleSearch : () => navigation.dispatch(DrawerActions.toggleDrawer())}>
                    <Icon name={isSearchActive ? 'arrow-left' : 'bars'} size={20} color={styles.headerIcon.color}
                          style={{paddingLeft: 15}}/>
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View>
                    {!isSearchActive && (
                        <TouchableOpacity onPress={toggleSearch}>
                            <Icon name={'search'} size={20} color={styles.headerIcon.color} style={{paddingRight: 20}}/>
                        </TouchableOpacity>
                    )}
                </View>
            ),
        });
    }, [navigation, isSearchActive]);

    return (
        <View style={styles.container}>
            {isSearchActive && (
                <TextInput
                    placeholder="Search"
                    value={searchQuery}
                    onChangeText={(text) => {
                        setSearchQuery(text);
                        handleSearch();
                    }}
                    autoFocus={true}
                    style={[styles.textInput, {
                        paddingHorizontal: 10,
                        height: 40,
                        borderWidth: 1,
                        borderRadius: 5,
                        margin: 10
                    }]}
                />
            )}
            <FlatList
                data={filteredHymns}
                renderItem={({item}) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('HymnDetailScreen', {hymn: item})}
                        style={[styles.list,{padding: 20, borderBottomWidth: 1}]}>
                        <Text style={[styles.text, {fontSize: 18}]}>{item.hymnNumber}. {item.title}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

