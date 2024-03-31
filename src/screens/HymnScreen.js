import React, { useState, useLayoutEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { DummyHymns } from '../dummy/Dummy';

export const HymnScreen = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [filteredHymns, setFilteredHymns] = useState(DummyHymns);

    const handleSearch = () => {
        const query = searchQuery.toLowerCase();
        const filtered = DummyHymns.filter((hymn) => {
            // Check if the hymn title matches the query
            if (hymn.title.toLowerCase().includes(query)) {
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
            headerTitle:()=>(
                <Text style={{fontSize:20}}>
                    {isSearchActive ? '' : 'Indirimbo'}
                </Text>
            ),
            headerLeft: () => (
                <TouchableOpacity onPress={toggleSearch}>
                    <Icon name={isSearchActive ? 'arrow-back' : 'menu'} size={25} color={'black'} style={{ paddingLeft: 20 }} />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View>
                    {!isSearchActive && (
                        <TouchableOpacity onPress={toggleSearch}>
                            <Icon name={'search'} size={25} color={'black'} style={{ paddingRight: 20 }} />
                        </TouchableOpacity>
                    )}
                </View>
            ),
        });
    }, [navigation, isSearchActive]);

    return (
        <View>
            {isSearchActive && (
                <TextInput
                    placeholder="Search"
                    value={searchQuery}
                    onChangeText={(text) => {
                        setSearchQuery(text);
                        handleSearch();
                    }}
                    autoFocus={true}
                    style={{ paddingHorizontal: 10, height: 40, borderWidth: 1, borderRadius: 5, margin: 10 }}
                />
            )}
            <FlatList
                data={filteredHymns}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('HymnDetailScreen', { hymn: item })}
                        style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                        <Text style={{ fontSize: 18 }}>{item.hymnNumber}. {item.title}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};
