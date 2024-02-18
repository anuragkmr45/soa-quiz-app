import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Card, Chip } from 'react-native-paper';
import { defaultStyling } from '../../constant/styles';

const QuizCard = () => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionPress = (option) => {
        setSelectedOption(option);
    };

    return (
        <Card style={{ width: '100%' }}>
            <ScrollView style={{ paddingVertical: 20 }}>
                <Card.Content>
                    <ScrollView>
                        <Text style={{ color: defaultStyling.dark, marginBottom: 10, fontSize: 17 }} >
                            1. Which programming language is known for its flexibility and readability?
                        </Text>
                        <View>
                            <Chip
                                selected={selectedOption === 'Option 1'}
                                onPress={() => handleOptionPress('Option 1')}
                                style={{
                                    marginVertical: 8,
                                    paddingVertical: 10,
                                    backgroundColor: selectedOption === 'Option 1' ? defaultStyling.dark : '#e0e8eb'
                                }}
                            >
                                <Text style={{
                                    color: selectedOption === 'Option 1' ? 'white' : defaultStyling.semidark
                                }}>
                                    Option Option Option
                                </Text>
                            </Chip>
                        </View>
                    </ScrollView>
                </Card.Content>
            </ScrollView>
        </Card>
    )
}

export default QuizCard;
