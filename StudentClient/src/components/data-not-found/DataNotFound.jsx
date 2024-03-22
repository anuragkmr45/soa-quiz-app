import React from 'react'
import { View, Text, Image } from 'react-native'

import DNFImg from '../../assest/image/data-not-found.png'
import { defaultStyling } from '../../constant/styles'

const DataNotFound = () => {
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', backgroundColor: defaultStyling.light }} >
            <Image source={DNFImg} style={{ width: 40, height: 40, opacity: 0.5 }} />
            <Text style={{ color: defaultStyling.primaryText, opacity: 0.7 }}>Data Not Found</Text>
        </View>
    )
}

export default DataNotFound