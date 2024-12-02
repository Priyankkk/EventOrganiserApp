import React, { useEffect, useState } from 'react';
import { View, FlatList, Alert, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { db, auth } from '../firebase/config';
import EventCard from '../components/EventCard';

export default function EventsScreen({ navigation }) {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = db.collection('events').onSnapshot((snapshot) => {
            const eventsData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setEvents(eventsData);
            setLoading(false);
        });

        return unsubscribe; // Clean up the listener on unmount
    }, []);

    const handleEditEvent = (event) => {
        navigation.navigate('AddEvent', { event });
    };

    const handleDeleteEvent = (id) => {
        db.collection('events')
            .doc(id)
            .delete()
            .then(() => Alert.alert('Deleted', 'Event has been removed'))
            .catch((error) => Alert.alert('Error', error.message));
    };

    const handleAddToFavourites = (event) => {
        const { id, title } = event;
        // Check if the event is already in favourites
        db.collection('favourites')
            .where('userId', '==', auth.currentUser.uid)
            .where('id', '==', id)
            .get()
            .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    Alert.alert('Duplicate Favourite', `"${title}" is already in your favourites.`);
                } else {
                    // Add the event to favourites
                    db.collection('favourites')
                        .add({
                            ...event,
                            userId: auth.currentUser.uid,
                        })
                        .then(() => Alert.alert('Success', `"${title}" has been added to your favourites.`))
                        .catch((error) => Alert.alert('Error', error.message));
                }
            })
            .catch((error) => Alert.alert('Error', error.message));
    };

    const handleLogout = () => {
        auth.signOut()
            .then(() => navigation.replace('Login'))
            .catch((error) => Alert.alert('Logout Error', error.message));
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Loading events...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Log Out</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, styles.addButton]}
                onPress={() => navigation.navigate('AddEvent')}
            >
                <Text style={styles.buttonText}>Add New Event</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, styles.favouriteButton]}
                onPress={() => navigation.navigate('Favourites')}
            >
                <Text style={styles.buttonText}>View Favourite Events</Text>
            </TouchableOpacity>
            <FlatList
                data={events}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <EventCard
                        event={item}
                        onEdit={
                            item.userId === auth.currentUser.uid
                                ? () => handleEditEvent(item)
                                : null
                        }
                        onDelete={
                            item.userId === auth.currentUser.uid
                                ? () => handleDeleteEvent(item.id)
                                : null
                        }
                        onFavourite={() => handleAddToFavourites(item)} // Prevent duplicate favourites
                    />
                )}
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
    loadingText: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 20,
        color: '#555',
    },
    button: {
        width: '100%',
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    addButton: {
        backgroundColor: '#28A745',
    },
    favouriteButton: {
        backgroundColor: '#FFC107',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
