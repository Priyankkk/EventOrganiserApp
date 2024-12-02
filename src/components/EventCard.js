import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function EventCard({ event, onEdit, onDelete, onFavourite }) {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{event.title}</Text>
            <Text style={styles.description}>{event.description}</Text>
            <View style={styles.actions}>
                {onEdit && (
                    <TouchableOpacity onPress={onEdit}>
                        <Text style={styles.actionText}>Edit</Text>
                    </TouchableOpacity>
                )}
                {onDelete && (
                    <TouchableOpacity onPress={onDelete}>
                        <Text style={styles.actionText}>Delete</Text>
                    </TouchableOpacity>
                )}
                {onFavourite && (
                    <TouchableOpacity onPress={onFavourite}>
                        <Text style={styles.actionText}>Favourite</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 10,
        marginHorizontal: 15,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        color: '#555',
        marginBottom: 10,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    actionText: {
        fontSize: 14,
        color: '#007BFF',
    },
});
