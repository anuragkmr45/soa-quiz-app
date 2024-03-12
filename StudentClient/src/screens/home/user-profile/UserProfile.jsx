import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import apiEndpoints from '../../../services/api'

import { defaultStyling } from '../../../constant/styles'

const UserProfile = ({ route }) => {

    console.log(route.params)

    return (
        <View style={{ backgroundColor: defaultStyling.dark, flex: 1 }}>
            <ScrollView>
                <Text>UserProfile</Text>
            </ScrollView>
        </View>
    )
}

export default UserProfile