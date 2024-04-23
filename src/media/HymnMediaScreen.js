import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem  from 'expo-file-system';
import { preloadHymns } from "../database/database";

const HymnMediaScreen = () => {
    const [hymns, setHymns] = useState([]);
    const [selectedHymn, setSelectedHymn] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
        loadHymns();
    }, []);

    const loadHymns = useCallback(async () => {
        try {
            const hymnData = await preloadHymns();
            setHymns(hymnData);
        } catch (error) {
            console.error('Error loading hymns:', error);
        }
    }, []);

    const handleHymnChange = (hymnId) => {
        setSelectedHymn(hymnId);
        retrieveLocalImage(hymnId); // Retrieve image for the selected hymn
    };

    const saveImageLocally = async (uri) => {
        const filename = `${selectedHymn}.jpg`;
        const newUri = FileSystem.documentDirectory + filename;

        try {
            await FileSystem.copyAsync({
                from: uri,
                to: newUri,
            });
            return newUri;
        } catch (error) {
            console.error("Error saving image:", error);
            throw error;
        }
    };

    const replaceImageLocally = async (newUri) => {
        const filename = `${selectedHymn}.jpg`;
        const existingUri = FileSystem.documentDirectory + filename;

        try {
            if (await FileSystem.getInfoAsync(existingUri)) {
                await FileSystem.deleteAsync(existingUri);
            }
            await FileSystem.copyAsync({
                from: newUri,
                to: existingUri,
            });
            setImage(existingUri);
        } catch (error) {
            console.error("Error replacing image:", error);
            throw error;
        }
    };

    const retrieveLocalImage = async (hymnId) => {
        const filename = `${hymnId}.jpg`;
        const localUri = FileSystem.documentDirectory + filename;

        try {
            if (await FileSystem.getInfoAsync(localUri)) {
                setImage(localUri);
            } else {
                setImage(null);
            }
        } catch (error) {
            console.error("Error retrieving image:", error);
        }
    };
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            const originalUri = result.assets[0].uri;
            const fileName = `${selectedHymn}.jpg`;
            const newUri = `${FileSystem.cacheDirectory}${fileName}`;

            // Rename the file
            await FileSystem.moveAsync({
                from: originalUri,
                to: newUri,
            });

            setImage(newUri);
        }
    };

    const saveData = async () => {
        try {
            const fileName = `${selectedHymn}.jpg`;
            const newUri = `${FileSystem.documentDirectory}${fileName}`;
            await FileSystem.moveAsync({
                from: image,
                to: newUri,
            });

            Alert.alert('Success', 'Image saved successfully.');
        } catch (error) {
            Alert.alert('Error', 'Failed to save data.');
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Picker
                selectedValue={selectedHymn}
                style={styles.picker}
                onValueChange={handleHymnChange}
            >
                {hymns.map((hymn) => (
                    <Picker.Item key={hymn.id} label={`ID: ${hymn.number} - ${hymn.title}`} value={hymn.id} />
                ))}
            </Picker>

            <Text style={styles.title}>Selected Hymn: {selectedHymn}</Text>

            <TouchableOpacity style={styles.button} onPress={pickImage}>
                <Text>Pick Image</Text>
            </TouchableOpacity>

            {/* Preview Image */}
            {image && <Image source={{ uri: image }} style={styles.image} />}

            <TouchableOpacity style={styles.button} onPress={saveData}>
                <Text>Save Image</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    picker: {
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        marginBottom: 10,
    },
    button: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#ccc',
        alignItems: 'center',
        borderRadius: 5,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 10,
    },
});

export default HymnMediaScreen;
