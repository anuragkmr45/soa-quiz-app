import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import BackIcon from '../../assest/icons/back.png'
import { defaultStyling } from '../../constant/styles';

const AppBar = ({ screen, backScreen }) => {

    const navigation = useNavigation();

    return (
        <View style={{ backgroundColor: defaultStyling.dark }}>
            <Appbar.Header style={styles.container}>
                <View>
                    {
                        backScreen && (
                            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { navigation.navigate('backScreen') }}  >
                                <Image source={BackIcon} style={{
                                    width: 30,
                                    height: 30,
                                }} />
                                <Text style={{ marginVertical: 'auto' }}>{backScreen}</Text>
                            </TouchableOpacity>
                        )
                    }
                </View>
                <View>
                    <Text>{screen}</Text>
                </View>
            </Appbar.Header>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: '99%',
        justifyContent: 'center',
        backgroundColor: defaultStyling.dark,
        justifyContent: 'space-between',
        borderBottomLeftRadius: 13,
        borderBottomRightRadius: 13,
        shadowColor: defaultStyling.semidark,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 50,
    },
})

export default AppBar;