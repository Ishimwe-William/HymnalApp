import React, { useState, useLayoutEffect, useContext, useEffect, useCallback } from 'react';
import { Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ThemeContext } from "../utils/ThemeContext";
import { darkModeStyles, lightModeStyles } from "../utils/options";
import { getHymns, initDatabase, preloadHymns } from "../database/database";

initDatabase();

export const HymnScreen = () => {
    const [hymns, setHymns] = useState([]);
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [filteredHymns, setFilteredHymns] = useState([]);
    const { isDarkMode } = useContext(ThemeContext);
    const styles = isDarkMode ? darkModeStyles : lightModeStyles;

    const loadHymns = useCallback(async () => {
        try {
            const hymnData = await preloadHymns();
            setHymns(hymnData);
            setFilteredHymns(hymnData);
        } catch (error) {
            console.error('Error loading hymns:', error);
        }
    }, []);

    useEffect(() => {
        loadHymns();
    }, [loadHymns]);

    const handleSearch = () => {
        const query = searchQuery.toLowerCase();
        const filtered = hymns.filter((hymn) => {
            if (hymn?.title?.toLowerCase().includes(query)) {
                return true;
            }

            if (hymn?.number?.toString().trim().includes(query)) {
                return true;
            }

            for (const stanza of hymn?.stanzas ?? []) {
                if (stanza?.text?.toLowerCase().includes(query)) {
                    return true;
                }
            }

            for (const refrain of hymn?.refrains ?? []) {
                if (refrain?.text?.toLowerCase().includes(query)) {
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
            setFilteredHymns(hymns);
        }
        setIsSearchActive(!isSearchActive);
    };

    useLayoutEffect(() => {
        const loadHymns = async () => {
            try {
                const hymnData = await getHymns();
                setHymns(hymnData);
                setFilteredHymns(hymnData);
            } catch (error) {
                console.error('Error loading hymns:', error);
            }
        };

        loadHymns();

        navigation.setOptions({
            headerStyle: {
                ...styles.headerContainer,
            },
            headerTitle: () => (
                <Text style={[styles.headerText, { fontSize: 20 }]}>
                    {isSearchActive ? 'Ishakiro' : 'Indirimbo'}
                </Text>
            ),
            headerLeft: () => (
                <TouchableOpacity
                    onPress={isSearchActive ? toggleSearch : () => navigation.dispatch(DrawerActions.toggleDrawer())}>
                    <Icon name={isSearchActive ? 'arrow-left' : 'bars'} size={20} color={styles.headerIcon.color}
                          style={{ paddingLeft: 15 }}/>
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View>
                    {!isSearchActive && (
                        <TouchableOpacity onPress={toggleSearch}>
                            <Icon name={'search'} size={20} color={styles.headerIcon.color} style={{ paddingRight: 20 }}/>
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
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('HymnDetailScreen', { hymn: item, hymns: filteredHymns, currentIndex: index })}
                        style={[styles.list, { padding: 20, borderBottomWidth: 1 }]}>
                        <Text style={[styles.text, { fontSize: 18 }]}>
                            {item?.number?.toString()}. {item?.title}
                        </Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item?.id?.toString()}
            />
        </View>
    );
};
