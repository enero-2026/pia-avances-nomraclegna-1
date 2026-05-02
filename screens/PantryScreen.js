import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { getPantry, addIngredient, deleteIngredient } from '../services/pantryService';

export default function PantryScreen() {
    const [ingredients, setIngredients] = useState([]);
    const [filteredIngredients, setFilteredIngredients] = useState([]);
    const [inputText, setInputText] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const data = await getPantry();
            setIngredients(data);
            setFilteredIngredients(data);
        } catch (error) {
            Alert.alert('Error', 'No se pudo cargar la despensa');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (text) => {
        setSearchQuery(text);
        const filtered = ingredients.filter(item =>
            item.name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredIngredients(filtered);
    };

    const handleAdd = async () => {
        if (inputText.trim() === '') {
            Alert.alert('Validación', 'Por favor ingresa un alimento válido.');
            return;
        }

        await addIngredient({
            name: inputText.trim(),
            category: 'General',
            quantity: 1
        });

        setInputText('');
        loadData();
    };

    const handleDelete = async (id) => {
        await deleteIngredient(id);
        loadData();
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#4ade80" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Voraci</Text>

            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    value={inputText}
                    onChangeText={setInputText}
                    placeholder="Ej. Manzanas, Pollo, Avena..."
                    placeholderTextColor="#9ca3af"
                />
                <TouchableOpacity style={styles.button} onPress={handleAdd}>
                    <Text style={styles.buttonText}>Agregar</Text>
                </TouchableOpacity>
            </View>

            <TextInput
                style={[styles.input, { marginBottom: 15 }]}
                value={searchQuery}
                onChangeText={handleSearch}
                placeholder="Buscar en tu despensa"
                placeholderTextColor="#9ca3af"
            />

            <FlatList
                data={filteredIngredients}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.itemCard}>
                        <Text style={styles.itemText}>{item.name}</Text>
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => handleDelete(item.id)}
                        >
                            <Text style={styles.deleteText}>X</Text>
                        </TouchableOpacity>
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.emptyText}>Tu despensa está vacía.</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111827',
        padding: 20,
        paddingTop: 60
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#111827'
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#4ade80',
        marginBottom: 20,
        textAlign: 'center'
    },
    formContainer: {
        flexDirection: 'row',
        marginBottom: 20
    },
    input: {
        flex: 1,
        backgroundColor: '#1f2937',
        color: '#f3f4f6',
        padding: 15,
        borderRadius: 10,
        marginRight: 10,
        fontSize: 16
    },
    button: {
        backgroundColor: '#4ade80',
        justifyContent: 'center',
        paddingHorizontal: 20,
        borderRadius: 10
    },
    buttonText: {
        color: '#111827',
        fontWeight: 'bold',
        fontSize: 16
    },
    itemCard: {
        backgroundColor: '#1f2937',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    itemText: {
        color: '#f3f4f6',
        fontSize: 18
    },
    deleteButton: {
        backgroundColor: '#ef4444',
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderRadius: 6
    },
    deleteText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    emptyText: {
        color: '#9ca3af',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16
    }
});