import React from 'react';
import { StyleSheet, ScrollView, View, Text, StatusBar, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import TeamCard from '../../components/cards/TeamCard';
import { defaultStyling } from '../../constant/styles';
import ArrowIcon from '../../assest/icons/arrow.png'

const About = () => {

    const navigation = useNavigation()

    return (
        <>
            <StatusBar animated={true} backgroundColor={defaultStyling.light} />
            <View style={{ paddingHorizontal: 10, paddingVertical: 20, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: defaultStyling.light }}>
                <Text style={{ color: defaultStyling.primaryText, fontWeight: '600', fontSize: 20, alignSelf: 'center' }}>About Creators</Text>
                <TouchableOpacity
                    style={{ borderColor: defaultStyling.light, alignSelf: 'center' }}
                    onPress={() => { navigation.navigate('Home') }}
                >
                    <Image source={ArrowIcon} resizeMode='cover' style={{ alignSelf: 'flex-end' }} />
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.container}>
                    <Text style={{ color: defaultStyling.primaryText, fontSize: 16, fontWeight: '500' }}>Mentors</Text>
                    <TeamCard
                        img="https://firebasestorage.googleapis.com/v0/b/brandladder-webapp.appspot.com/o/general%2Fanukampamaam.jpg?alt=media&token=b0df57bb-5dbc-4fd2-94d0-c4f6f96690db"
                        name='Anukampa Behera'
                        intro='Assistant Professor at ITER, SOA University | DevOps, AI and ML Researcher'
                        insta='https://www.instagram.com/anukampabehera'
                        linkedin='https://www.linkedin.com/in/anukampa-behera-a1393849'
                    />
                    <TeamCard
                        img="https://media.licdn.com/dms/image/D5603AQEP1cz4sfBjvQ/profile-displayphoto-shrink_400_400/0/1705065056894?e=1714608000&v=beta&t=Yj5-6QkqTlvQ9x80IBsz6z8qVZMgEsPWi1zPu0JwTrI"
                        name='Pawan Kumar '
                        intro="SRE Intern @Nutanix || CCNA certified || Final year @ITER || Flutter App Developer || Solving for India Regional Qualified || HackOn with Amazon`22 "
                        insta='https://www.instagram.com/pawan21.9'
                        linkedin='https://www.linkedin.com/in/pawan-kumar-9490581b5'
                        github='https://github.com/pnkr01'
                    />
                </View>
                <View style={styles.container}>
                    <Text style={{ color: defaultStyling.primaryText, fontSize: 16, fontWeight: '500' }}>Developers</Text>
                    <TeamCard
                        img="https://media.licdn.com/dms/image/D5603AQGKr1uo9PAJwg/profile-displayphoto-shrink_400_400/0/1710516921803?e=1716422400&v=beta&t=0sMSe6PFojUXBW5B4f5TFiZyQUSqHcJfvy3mbJSLeNY"
                        name='Anurag Kumar'
                        intro="Tech Director at Brandladder | Android Develeoper at EaseMyLiving |  Open source contributor | MERN Stack, Electron JS and NEXT. JS Developer | React Native Cross Platform App Developer | Devops Trainee | Former CTO | Ex Project Lead At Progeeks | CSE 25' SOA"
                        insta='https://www.instagram.com/anuragkmr_45'
                        linkedin='https://www.linkedin.com/in/anuragkmr45'
                        github='https://github.com/anuragkmr45'
                    />
                    <TeamCard
                        img="https://media.licdn.com/dms/image/D5603AQH5ENl5vx3pig/profile-displayphoto-shrink_800_800/0/1677615719524?e=1716422400&v=beta&t=T1AJ6vsTYcjxK_gDIOeHnnc4bG3GiTmsSyvGUgVZlmE"
                        name='Suraj Sahu'
                        intro='Chief Technology Officer @BrandLadder | Navigating Multi-Cloud Technologies | Backend Developer in NodeJs, PHP, Java | Machine Learning Explorer | Database Maestro | Crafting Solutions in Python, Java, JavaScript, PHP'
                        insta='https://www.instagram.com/shaan.suraj'
                        linkedin='https://www.linkedin.com/in/shaansuraj'
                        github='https://github.com/shaansuraj'
                    />
                    <TeamCard
                        img="https://firebasestorage.googleapis.com/v0/b/brandladder-webapp.appspot.com/o/general%2Fdiksha.png?alt=media&token=b7edbf5f-4d2e-4d46-9f32-8376de5185f0"
                        name='Diksha Jethwa'
                        intro="Frontend Web developer | UI UX Designer | B.Tech CSE'26 | Hacktoberfest 2023 | Trident Hackathon 5th runner-up| JS, Dart "
                        insta='https://www.instagram.com/diksha_artworks'
                        linkedin='https://www.linkedin.com/in/diksha-jethwa/'
                        github='https://github.com/Diksha566'
                    />
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: defaultStyling.light,
        flex: 1,
        paddingHorizontal: 8,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    scrollViewContent: {
        flexGrow: 1, // Ensure the content grows vertically to fit all items
        paddingHorizontal: 5
    },
});

export default About;
