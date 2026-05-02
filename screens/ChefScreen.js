import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ChefScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Chef IA</Text>
            <Text style={{ color: 'white' }}>Aquí se conectará una IA</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0f172a'
    },
    title: {
        fontSize: 30,
        color: '#bef264',
        fontWeight: 'bold',
        marginBottom: 10
    }
});