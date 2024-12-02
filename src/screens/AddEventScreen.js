import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import { db, auth } from '../firebase/config';

export default function AddEventScreen({ navigation, route }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const isEditing = route.params?.event;

    useEffect(() => {
        if (isEditing) {
            const { title, description } = route.params.event;
            setTitle(title);
            setDescription(description);
        }
    }, [route.params]);

    const handleSave = () => {
        if (isEditing) {
            db.collection('events')
                .doc(route.params.event.id)
                .update({ title, description })
                .then(() => {
                    Alert.alert('Success', 'Event updated successfully');
                    navigation.goBack();
                })
                .catch((error) => Alert.alert('Error', error.message));
        } else {
            db.collection('events')
                .add({
                    title,
                    description,
                    userId: auth.currentUser.uid,
                })
                .then(() => {
                    Alert.alert('Success', 'Event added successfully');
                    navigation.goBack();
                })
                .catch((error) => Alert.alert('Error', error.message));
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>
                {isEditing ? 'Edit Event' : 'Add New Event'}
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Event Title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Event Description"
                value={description}
                onChangeText={setDescription}
                multiline
            />
            <Button
                title={isEditing ? 'Update Event' : 'Save Event'}
                color="#007BFF"
                onPress={handleSave}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F5F5F5',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    textArea: {
        height: 100,
    },
});
