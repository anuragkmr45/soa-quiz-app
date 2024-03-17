import React from 'react';
import { View, Modal, ActivityIndicator, Text, StyleSheet, Dimensions } from 'react-native';
import { defaultStyling } from '../../constant/styles';

const Loader = ({ loading }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={loading}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <ActivityIndicator size="large" color="white" />
                    <Text style={styles.modalText}>Loading...</Text>
                </View>
            </View>
        </Modal>
    )
}

const { width, height } = Dimensions.get('window');
const qrScannerSize = Math.min(width, height) / 1.1;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: defaultStyling.dark,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    qrScanner: {
        width: qrScannerSize,
        height: qrScannerSize,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContent: {
        backgroundColor: 'inherit',
        padding: 2,
        borderRadius: 10,
        alignItems: 'center',
    },
});

export default Loader
