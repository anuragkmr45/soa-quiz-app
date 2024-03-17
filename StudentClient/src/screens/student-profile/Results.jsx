import React from 'react'
import { View, Text, StatusBar, ScrollView, Image } from 'react-native'
import { defaultStyling } from '../../constant/styles'
import CrossIcon from '../../assest/icons/cross.png'

const Results = ({ route }) => {

    const { results } = route.params
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return date.toLocaleDateString('en-US', options)
    }

    return (
        <View style={{ paddingHorizontal: 15, paddingTop: 20 }}>
            <StatusBar
                animated={true}
                backgroundColor={defaultStyling.light} />
            {/* <Image source={CrossIcon} /> */}
            <Text style={{ color: defaultStyling.primaryText, fontSize: 24, fontWeight: '500' }}>Quiz Attended</Text>
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
    )
}

export default Results