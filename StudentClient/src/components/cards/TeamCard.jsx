// import React from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
// import { Card } from 'react-native-paper';
// import { defaultStyling } from '../../constant/styles';

// import Insta from '../../assest/image/icons/insta.png';
// import Github from '../../assest/image/icons/github.png';
// import Linkedin from '../../assest/image/icons/linkedin.png';

// const TeamCard = ({ img, name, intro, insta, linkedin, github }) => {
//     return (
//         // <Card style={styles.card}>
//         <View style={styles.card}>
//             <View style={styles.imageContainer}>
//                 <Image source={{ uri: img }} style={styles.image} resizeMode="cover" />
//             </View>
//             <Card.Content style={styles.textContainer}>
//                 <Text style={{ fontWeight: 'bold', marginVertical: 4 }} >{name}</Text>
//                 <Text>{intro}</Text>
//                 <View style={styles.actions}>
//                     {
//                         insta && (
//                             <TouchableOpacity style={styles.iconButton}>
//                                 <Image source={Insta} style={styles.icon} />
//                             </TouchableOpacity>
//                         )
//                     }
//                     {
//                         github && (
//                             <TouchableOpacity style={styles.iconButton}>
//                                 <Image source={Github} style={styles.icon} />
//                             </TouchableOpacity>
//                         )
//                     }
//                     {
//                         linkedin && (
//                             <TouchableOpacity style={styles.iconButton}>
//                                 <Image source={Linkedin} style={styles.icon} />
//                             </TouchableOpacity>
//                         )
//                     }
//                 </View>
//             </Card.Content>
//         </View>
//         // </Card>
//     )
// }

// const styles = StyleSheet.create({
//     card: {
//         flexDirection: 'row',
//         // borderColor: '#ccc',
//         // borderWidth: 1,
//         // borderRadius: 10,
//         overflow: 'hidden',
//         marginBottom: 10,
//         backgroundColor: defaultStyling.semidark,
//         margin: 10,
//     },
//     cardContent: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         padding: 10,
//     },
//     imageContainer: {
//         width: '30%', // Adjust the width as per your requirement
//         aspectRatio: 1,
//         overflow: 'hidden',
//         borderRadius: 100,
//     },
//     image: {
//         flex: 1,
//         // alignItems: 'center',
//         // alignSelf: 'center',
//         width: '100%',
//         height: undefined,
//     },
//     textContainer: {
//         flex: 2,
//         padding: 10,
//     },
//     actions: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     iconButton: {
//         backgroundColor: defaultStyling.dark,
//         borderRadius: 50, // for circular shape
//         padding: 8,
//         marginHorizontal: 5,
//     },
//     icon: {
//         width: 17,
//         height: 17,
//     },
// })

// export default TeamCard;


import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { defaultStyling } from '../../constant/styles';
import Insta from '../../assest/image/icons/insta.png';
import Github from '../../assest/image/icons/github.png';
import Linkedin from '../../assest/image/icons/linkedin.png';

const TeamCard = ({ img, name, insta, intro, github, linkedin }) => {

    const limitedIntro = intro.length > 38 ? intro.substring(0, 230) + " " : intro;

    const handlePress = (url) => {
        Linking.openURL(url);
    };

    return (
        <View style={styles.container}>
            {/* <View style={styles.imageContainer}> */}
            <Image source={{ uri: img }} style={styles.image} resizeMode="cover" />
            {/* </View> */}
            <View style={styles.textContainer}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.intro}>{limitedIntro} ... </Text>
                <View style={styles.actions}>
                    {
                        linkedin && (
                            <TouchableOpacity
                                style={styles.iconButton}
                                onPress={() => handlePress(linkedin)}
                            >
                                <Image source={Linkedin} style={styles.icon} />
                            </TouchableOpacity>
                        )
                    }
                    {
                        insta && (
                            <TouchableOpacity
                                style={styles.iconButton}
                                onPress={() => handlePress(insta)}
                            >
                                <Image source={Insta} style={styles.icon} />
                            </TouchableOpacity>
                        )
                    }
                    {
                        github && (
                            <TouchableOpacity
                                style={styles.iconButton}
                                onPress={() => handlePress(github)}
                            >
                                <Image source={Github} style={styles.icon} />
                            </TouchableOpacity>
                        )
                    }
                </View>
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: defaultStyling.semidark,
        borderRadius: 10,
        paddingHorizontal: 5,
        borderWidth: 0.2,
        borderColor: defaultStyling.semidark,
        borderRadius: 10,
        shadowColor: defaultStyling.light,
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 0.1,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 17,
        marginBottom: 2,
        marginRight: 10,
    },
    textContainer: {
        flex: 2,
        padding: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: defaultStyling.primaryText,
    },
    intro: {
        fontSize: 10,
        marginVertical: 2,
        color: defaultStyling.secondaryText,
        opacity: 0.7
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        backgroundColor: defaultStyling.secondaryTextColor,
        borderRadius: 50, // for circular shape
        padding: 8,
        marginHorizontal: 5,
    },
    icon: {
        width: 17,
        height: 17,
    },
});

export default TeamCard;
