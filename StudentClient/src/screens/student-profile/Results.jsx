import React, { useState, useEffect } from 'react'
import { View, Text, StatusBar, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Loader from '../../components/loading/Loader';

import apiEndpoints from '../../services/api';
import { defaultStyling } from '../../constant/styles'
import DataNotFound from '../../components/data-not-found/DataNotFound'
import CrossIcons from '../../assest/icons/arrow.webp'

const Results = () => {

    const [loading, setLoading] = useState(true)
    const [results, setResults] = useState([])

    const navigation = useNavigation()

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return date.toLocaleDateString('en-US', options)
    }

    const handleFetchResults = async () => {
        setLoading(true)
        try {
            const res = await apiEndpoints.getMyResults()
            // console.log('res;', res)
            if (res.status === 200) {
                setResults(res.data.quizResults)
            }
        } catch (error) {
            Alert.alert('Result Not Found', 'Restart the app', [
                { text: 'OK', onPress: () => { navigation.navigate('Home') } },
            ]);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        handleFetchResults()
    }, [])

    return (
        <View style={{ paddingHorizontal: 15, paddingTop: 20, backgroundColor: defaultStyling.light }}>
            <StatusBar
                animated={true}
                backgroundColor={defaultStyling.light} />
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                <Text style={{ color: defaultStyling.primaryText, fontSize: 24, fontWeight: '500' }}>Quiz Attended</Text>
                <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => { navigation.navigate('Home') }}>
                    <Image source={CrossIcons} style={{ width: 25, height: 25 }} />
                </TouchableOpacity>
            </View>

            {
                loading ?
                    <Loader />
                    :

                    results.length > 0 ? (
                        <>
                            <View style={{ height: '94%' }}>
                                <ScrollView>
                                    {
                                        results && results?.reverse()?.map((result, index) => {
                                            return (
                                                <View style={{ marginVertical: 10 }} key={index}>
                                                    <View style={{ backgroundColor: 'rgba(97, 94, 240, 0.09)', width: '100%', padding: 10, borderRadius: 15 }}>
                                                        <Text style={{ color: defaultStyling.dark, fontSize: 20, fontWeight: '500', marginVertical: 10 }}>
                                                            {result.title}
                                                        </Text>
                                                        <Text style={{ color: defaultStyling.primaryText, opacity: 0.6, fontSize: 14, marginVertical: 2 }}>
                                                            Total Marks: MM
                                                        </Text>
                                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                            <Text style={{ color: defaultStyling.primaryText, opacity: 0.6, fontSize: 14 }}>
                                                                Total Obtained: {result.score}
                                                            </Text>
                                                            <Text style={{ color: defaultStyling.secondaryText, opacity: 0.5, fontSize: 12 }}> {formatDate(result.datecreated)}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            )
                                        })
                                    }
                                </ScrollView>
                            </View>
                        </>
                    ) : (
                        <DataNotFound />
                    )
            }




        </View>
    )
}

export default Results