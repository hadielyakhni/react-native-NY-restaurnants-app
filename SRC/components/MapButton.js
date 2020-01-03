import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { createOpenLink } from 'react-native-open-maps'

const mapButton = ({ latitude, longitude }) => {
    const openMap = createOpenLink({ latitude, longitude, zoom: 20 });
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={openMap}
        >
            <Text style={styles.text}>
                Directions
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#008ee0',
        height: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
        borderRadius: 12
    },
    text: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 28
    }
})

export default mapButton