import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'

import { defaultStyling } from '../../constant/styles';
import ProfileImg from '../../assest/icons/profile.png'
import BackIcon from '../../assest/icons/cross.png'

const ResultScreen = ({ route }) => {
    const { profile } = route.params;
    const navigation = useNavigation()

    return (
        profile ? (
            <View style={{ flex: 1, backgroundColor: defaultStyling.light }}>
                <View style={{ elevation: 4, height: '16%', backgroundColor: defaultStyling.dark, borderBottomLeftRadius: 18, borderBottomRightRadius: 18 }} >
                    <TouchableOpacity onProgress={() => navigation.navigate('Home')}>
                        <Image source={BackIcon} style={{ paddingHorizontal: 6, alignSelf: 'flex-end' }} />
                    </TouchableOpacity>
                </View>
                <View style={{ position: 'relative', bottom: 70 }}>
                    <View style={{ elevation: 4, borderRadius: 180, padding: 20, backgroundColor: defaultStyling.light, width: '35%', alignSelf: 'center' }}>
                        <TouchableOpacity onPress={() => { navigation.navigate('Home') }}>
                            <Image source={ProfileImg} style={{ height: 80, width: 80, alignSelf: 'center' }} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ paddingHorizontal: '8%' }}>
                        <View style={{ marginVertical: 6 }}>
                            <Text style={{ color: defaultStyling.primaryText, opacity: 0.5, paddingLeft: 8 }}>Name</Text>
                            <View style={{ paddingVertical: 5, paddingHorizontal: 10, borderWidth: 1, opacity: 0.4, borderRadius: 10 }}>
                                <Text style={{ color: defaultStyling.secondaryText, fontSize: 20, textShadowColor: 'rgba(0, 0, 0, 0.25)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4 }}>{profile.name}</Text>

                            </View>
                        </View>
                        <View style={{ marginVertical: 6 }}>
                            <Text style={{ color: defaultStyling.primaryText, opacity: 0.5, paddingLeft: 8 }}>Registration No</Text>
                            <View style={{ paddingVertical: 5, paddingHorizontal: 10, borderWidth: 1, opacity: 0.4, borderRadius: 10 }}>
                                <Text style={{ color: defaultStyling.secondaryText, fontSize: 20, textShadowColor: 'rgba(0, 0, 0, 0.25)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4 }}>{profile.registrationnumber}</Text>

                            </View>
                        </View>
                        <View style={{ marginVertical: 6 }}>
                            <Text style={{ color: defaultStyling.primaryText, opacity: 0.5, paddingLeft: 8 }}>Email :</Text>
                            <View style={{ paddingVertical: 5, paddingHorizontal: 10, borderWidth: 1, opacity: 0.4, borderRadius: 10 }}>
                                <Text style={{ color: defaultStyling.secondaryText, fontSize: 20, textShadowColor: 'rgba(0, 0, 0, 0.25)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4 }}>{profile.email}</Text>

                            </View>
                        </View>
                        <View style={{ marginVertical: 6 }}>
                            <Text style={{ color: defaultStyling.primaryText, opacity: 0.5, paddingLeft: 8 }}>Section</Text>
                            <View style={{ paddingVertical: 5, paddingHorizontal: 10, borderWidth: 1, opacity: 0.4, borderRadius: 10 }}>
                                <Text style={{ color: defaultStyling.secondaryText, fontSize: 20, textShadowColor: 'rgba(0, 0, 0, 0.25)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4 }}>{profile.section}</Text>

                            </View>
                        </View>
                        <View style={{ marginVertical: 6 }}>
                            <Text style={{ color: defaultStyling.primaryText, opacity: 0.5, paddingLeft: 8 }}>Branch</Text>
                            <View style={{ paddingVertical: 5, paddingHorizontal: 10, borderWidth: 1, opacity: 0.4, borderRadius: 10 }}>
                                <Text style={{ color: defaultStyling.secondaryText, fontSize: 20, textShadowColor: 'rgba(0, 0, 0, 0.25)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4 }}>{profile.branch}</Text>

                            </View>
                        </View>
                        <View style={{ marginVertical: 6 }}>
                            <Text style={{ color: defaultStyling.primaryText, opacity: 0.5, paddingLeft: 8 }}>Batch</Text>
                            <View>
                                <View style={{ paddingVertical: 5, paddingHorizontal: 10, borderWidth: 1, opacity: 0.4, borderRadius: 10 }}>
                                    <Text style={{ color: defaultStyling.secondaryText, fontSize: 20, textShadowColor: 'rgba(0, 0, 0, 0.25)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4 }}>{profile.batch}</Text>

                                </View>
                            </View>
                        </View>
                    </View>
                    <Button
                        style={{ backgroundColor: defaultStyling.dark, borderRadius: 8, marginHorizontal: '8%', paddingVertical: 10 }}
                        onPress={() => { navigation.navigate('Home') }}
                    >
                        <Text style={{ color: defaultStyling.light }} >Back To Home</Text>
                    </Button>
                </View>

            </View>
        ) : (
            <View style={styles.container}>
                <Text>
                    Data Not  Found
                </Text>
            </View>
        )
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: defaultStyling.dark,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: defaultStyling.primaryTextColor
    },
    resultContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 20,
        // width: '80%',
        backgroundColor: defaultStyling.semidark
    },
    resultItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    resultLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: defaultStyling.dark
    },
    resultValue: {
        fontSize: 16,
        color: defaultStyling.dark
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        paddingHorizontal: 20,
    },
    button: {
        backgroundColor: defaultStyling.dark,
        width: '100%',
        borderRadius: 10,
        paddingVertical: 8,
    },
});

export default ResultScreen;
