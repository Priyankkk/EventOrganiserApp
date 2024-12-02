import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Alert, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';
import EventCard from '../components/EventCard';

export default function FavouritesScreen() {
    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
        const unsubscribe = db
            .collection('favourites')
            .where('userId', '==', auth.currentUser.uid)
            .onSnapshot((snapshot) => {
                const favData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setFavourites(favData);
            });

        return unsubscribe; // Clean up the listener on unmount
    }, []);

    const handleRemoveFavourite = (id) => {
        // Optimistic UI Update: Remove from the UI immediately
        setFavourites((prevFavourites) =>
            prevFavourites.filter((fav) => fav.id !== id)
        );

        // Remove from Firestore
        db.collection('favourites')
            .doc(id)
            .delete()
            .then(() => Alert.alert('Success', 'Event removed from favourites'))
            .catch((error) => {
                Alert.alert('Error', error.message);
                // Revert UI Update if deletion fails
                setFavourites((prevFavourites) => [
                    ...prevFavourites,
                    favourites.find((fav) => fav.id === id),
                ]);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Favourite Events</Text>
            {favourites.length > 0 ? (
                <FlatList
                    data={favourites}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <EventCard
                            event={item}
                            onDelete={() => handleRemoveFavourite(item.id)}
                        />
                    )}
                />
            ) : (
                <Text style={styles.emptyText}>No favourite events found.</Text>
            )}
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
    emptyText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#777',
        marginTop: 20,
    },
});
