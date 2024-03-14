import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';

import AppBar from '../../components/appbar/AppBar'
import TeamCard from '../../components/cards/TeamCard';
import { defaultStyling } from '../../constant/styles';

const About = () => {
    return (
        <>
            <AppBar screen='About Creators' />
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.container}>
                    <Text style={styles.title}>Mentors</Text>
                    <TeamCard
                        img="https://media.licdn.com/dms/image/C5103AQGEzNEyvvc5AQ/profile-displayphoto-shrink_800_800/0/1582521988828?e=1714608000&v=beta&t=bu3fsQ04KEF46MaTz6oW6sOpl_Z29Z-5DqbY5GyD5sI"
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
                        github='https://github.com/anuragkmr45'
                    />
                </View>
                <View style={styles.container}>
                    <Text style={styles.title}>Developers</Text>
                    <TeamCard
                        img="https://firebasestorage.googleapis.com/v0/b/brandladder-webapp.appspot.com/o/team%2F1707362911480.jpg?alt=media&token=20fb203b-607a-4727-bc70-02b4e6f97d23"
                        name='Anurag Kumar'
                        intro="Tech Director at Brandladder | Android Develeoper at EaseMyLiving |  Open source contributor | MERN Stack, Electron JS and NEXT. JS Developer | React Native Cross Platform App Developer | Devops Trainee | Former CTO | Ex Project Lead At Progeeks | CSE 25' SOA"
                        insta='https://www.instagram.com/anuragkmr_45'
                        linkedin='https://www.linkedin.com/in/anuragkmr45'
                        github='https://github.com/anuragkmr45'
                    />
                    <TeamCard
                        img="https://firebasestorage.googleapis.com/v0/b/brandladder-webapp.appspot.com/o/team%2Fsurajpropicteam.jpg?alt=media&token=873e0108-aad1-445f-8c37-21b1df62066f"
                        name='Suraj Sahu'
                        intro='Chief Technology Officer @BrandLadder | Navigating Multi-Cloud Technologies | Backend Developer in NodeJs, PHP, Java | Machine Learning Explorer | Database Maestro | Crafting Solutions in Python, Java, JavaScript, PHP'
                        insta='https://www.instagram.com/shaan.suraj'
                        linkedin='https://www.linkedin.com/in/shaansuraj'
                        github='https://github.com/shaansuraj'
                    />
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: defaultStyling.dark,
        flex: 1,
        paddingVertical: 20, // Add some padding to separate the cards from the edges
        paddingHorizontal: 8,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    scrollViewContent: {
        flexGrow: 1, // Ensure the content grows vertically to fit all items
    },
});

export default About;
