import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';

import TeamCard from '../../components/cards/TeamCard';
import { defaultStyling } from '../../constant/styles';
import Suraj from '../../assest/image/team/suraj.jpg';
import Anurag from '../../assest/image/team/IMG_20231022_172318.jpg';

const About = () => {
    return (
        <>

            <TeamCard
                img={Suraj}
                name='Suraj Sahu'
                intro='Chief Technology Officer @BrandLadder | Navigating Multi-Cloud Technologies | Backend Developer in NodeJs, PHP, Java | Machine Learning Explorer | Database Maestro | Crafting Solutions in Python, Java, JavaScript, PHP'
                insta='https://www.instagram.com/shaan.suraj'
                linkedin='https://www.linkedin.com/in/shaansuraj'
                github='https://github.com/shaansuraj'
            />
            <TeamCard
                img={Anurag}
                name='Anurag Kumar'
                intro="Technical Director at Brandladder | Open source contributor | MERN and NEXT. JS Developer| Cross Platform App Developer | Former CTO | Ex Tech Lead | Freelancer | CSE 25' SOA"
                insta=''
                linkedin=''
                github=''
            />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: defaultStyling.dark,
        // flex: 1,
    },
});

export default About;
