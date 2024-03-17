import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { defaultStyling } from '../../constant/styles';

const Card = ({ imageUrl, text }) => {

    return (
        <View style={styles.card}>
            {/* <TouchableOpacity onPress={() => { navigation.navigate(screen, { screenDataKey: screenDataValue }) }}> */}
            {/* <Image source={{ uri: imageUrl }} style={styles.image} /> */}
            <Image source={imageUrl} style={styles.image} />
            <Text style={styles.text}>{text}</Text>
            {/* </TouchableOpacity> */}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'rgba(248, 248, 251, 1)',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 0.1,
        // paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 190,
        width: 140,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 10,
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black'
    },
});

export default Card;
