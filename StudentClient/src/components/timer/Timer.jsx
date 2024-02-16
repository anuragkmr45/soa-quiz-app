// import React, { useState, useEffect } from 'react';
// import { View, StyleSheet } from 'react-native';
// import Animated, { Easing } from 'react-native-reanimated';
// import Svg, { Circle } from 'react-native-svg';

// const { Clock, Value, cond, set, startClock, stopClock, clockRunning, block, timing, debug, divide, multiply } = Animated;

// const Timer = ({ duration }) => {
//     const [isRunning, setIsRunning] = useState(false);
//     const clock = new Clock();
//     const progress = new Value(0);
//     const animatedProgress = new Value(0);

//     useEffect(() => {
//         if (isRunning) {
//             const runClock = block([
//                 cond(clockRunning(clock), [], startClock(clock)),
//                 timing(clock, {
//                     duration: duration * 60000,
//                     toValue: 1,
//                     easing: Easing.linear,
//                 }),
//                 cond(progress >= 1, stopClock(clock)),
//                 set(animatedProgress, progress),
//             ]);

//             return () => {
//                 setIsRunning(false);
//                 stopClock(clock);
//             };
//         }
//     }, [isRunning]);

//     const radius = 100;
//     const strokeWidth = 10;
//     const circumference = radius * 2 * Math.PI;
//     const strokeDashoffset = multiply(animatedProgress, circumference);

//     return (
//         <View style={styles.container}>
//             <Svg width={radius * 2} height={radius * 2}>
//                 <Circle
//                     cx={radius}
//                     cy={radius}
//                     r={radius - strokeWidth / 2}
//                     fill="transparent"
//                     stroke="#ccc"
//                     strokeWidth={strokeWidth}
//                 />
//                 <AnimatedCircle
//                     cx={radius}
//                     cy={radius}
//                     r={radius - strokeWidth / 2}
//                     fill="transparent"
//                     stroke="#ff4500"
//                     strokeWidth={strokeWidth}
//                     strokeDasharray={`${circumference}, ${circumference}`}
//                     strokeDashoffset={strokeDashoffset}
//                 />
//             </Svg>
//         </View>
//     );
// };

// const AnimatedCircle = Animated.createAnimatedComponent(Circle);

// const styles = StyleSheet.create({
//     container: {
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
// });

// export default Timer;
