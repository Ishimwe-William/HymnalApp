import React, { useState, useEffect } from 'react';
import { Button, ScrollView, Text, TextInput, View, StyleSheet, Alert } from 'react-native';
import { addHymn, getAllHymns, updateHymn, deleteHymn, initDatabase } from "./db-services";

const AddHymnScreen = () => {
    const [hymnNumber, setHymnNumber] = useState('');
    const [title, setTitle] = useState('');
    const [stanzas, setStanzas] = useState([{ number: '', text: '' }]);
    const [refrains, setRefrains] = useState([{ number: '', text: '' }]);
    const [allHymns, setAllHymns] = useState([]);
    const [selectedHymn, setSelectedHymn] = useState(null);

    useEffect(() => {
        initDatabase();
        fetchAllHymns();
    }, []);

    const fetchAllHymns = () => {
        getAllHymns(hymnData => setAllHymns(hymnData));
    };

    const handleAddStanza = () => {
        setStanzas([...stanzas, { number: '', text: '' }]);
    };

    const handleAddRefrain = () => {
        setRefrains([...refrains, { number: '', text: '' }]);
    };

    const handleAddHymn = () => {
        addHymn(hymnNumber, title, stanzas, refrains);
        setHymnNumber('');
        setTitle('');
        setStanzas([{ number: '', text: '' }]);
        setRefrains([{ number: '', text: '' }]);
        fetchAllHymns(); // Refresh hymn list after adding new hymn
    };

    const handleUpdateHymn = () => {
        if (selectedHymn) {
            updateHymn(selectedHymn.id, hymnNumber, title, stanzas, refrains);
            setHymnNumber('');
            setTitle('');
            setStanzas([{ number: '', text: '' }]);
            setRefrains([{ number: '', text: '' }]);
            setSelectedHymn(null);
            fetchAllHymns(); // Refresh hymn list after updating hymn
        }
    };

    const handleDeleteHymn = (hymn) => {
        Alert.alert(
            'Delete Hymn',
            `Are you sure you want to delete "${hymn.title}"?`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        deleteHymn(hymn.id);
                        fetchAllHymns(); // Refresh hymn list after deleting hymn
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const handleSelectHymn = (hymn) => {
        setHymnNumber(hymn.hymnNumber);
        setTitle(hymn.title);
        setStanzas(hymn.stanzas);
        setRefrains(hymn.refrains);
        setSelectedHymn(hymn);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TextInput
                style={styles.input}
                value={hymnNumber}
                onChangeText={text => setHymnNumber(text)}
                placeholder="Hymn Number"
            />
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={text => setTitle(text)}
                placeholder="Title"
            />
            <Text style={styles.sectionHeader}>Stanzas</Text>
            {stanzas.map((stanza, index) => (
                <View key={index}>
                    <TextInput
                        style={styles.input}
                        value={stanza.number}
                        onChangeText={text => {
                            const updatedStanzas = [...stanzas];
                            updatedStanzas[index].number = text;
                            setStanzas(updatedStanzas);
                        }}
                        placeholder={`Stanza ${index + 1} Number`}
                    />
                    <TextInput
                        style={styles.input}
                        value={stanza.text}
                        onChangeText={text => {
                            const updatedStanzas = [...stanzas];
                            updatedStanzas[index].text = text;
                            setStanzas(updatedStanzas);
                        }}
                        placeholder={`Stanza ${index + 1} Text`}
                    />
                </View>
            ))}
            <Button title="Add Stanza" onPress={handleAddStanza} />
            <Text style={styles.sectionHeader}>Refrains</Text>
            {refrains.map((refrain, index) => (
                <View key={index}>
                    <TextInput
                        style={styles.input}
                        value={refrain.number}
                        onChangeText={text => {
                            const updatedRefrains = [...refrains];
                            updatedRefrains[index].number = text;
                            setRefrains(updatedRefrains);
                        }}
                        placeholder={`Refrain ${index + 1} Number`}
                    />
                    <TextInput
                        style={styles.input}
                        value={refrain.text}
                        onChangeText={text => {
                            const updatedRefrains = [...refrains];
                            updatedRefrains[index].text = text;
                            setRefrains(updatedRefrains);
                        }}
                        placeholder={`Refrain ${index + 1} Text`}
                    />
                </View>
            ))}
            <Button title="Add Refrain" onPress={handleAddRefrain} />
            <Button title="Add Hymn" onPress={handleAddHymn} />

            {/* Update Hymn */}
            {selectedHymn && (
                <>
                    <Text style={styles.sectionHeader}>Update Hymn</Text>
                    <Button title="Update Hymn" onPress={handleUpdateHymn} />
                </>
            )}

            {/* All Hymns */}
            <Text style={styles.sectionHeader}>All Hymns</Text>
            {allHymns.map(hymn => (
                <View key={hymn.id} style={styles.hymnContainer}>
                    <Text style={styles.hymnTitle}>{hymn.title}</Text>
                    <Text>Hymn Number: {hymn.hymnNumber}</Text>
                    <Button title="Edit" onPress={() => handleSelectHymn(hymn)} />
                    <Button title="Delete" onPress={() => handleDeleteHymn(hymn)} />
                    {hymn.stanzas && (
                        <>
                            <Text style={styles.sectionHeader}>Stanzas</Text>
                            {hymn.stanzas.map(stanza => (
                                <Text key={stanza.id}>{stanza.text}</Text>
                            ))}
                        </>
                    )}
                    {hymn.refrains && (
                        <>
                            <Text style={styles.sectionHeader}>Refrains</Text>
                            {hymn.refrains.map(refrain => (
                                <Text key={refrain.id}>{refrain.text}</Text>
                            ))}
                        </>
                    )}
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    input: {
        width: '80%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    hymnContainer: {
        marginTop: 20,
    },
    hymnTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default AddHymnScreen;
