import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Select, SelectModalProvider } from '@mobile-reality/react-native-select-pro';

import { DATA } from '../App';

export const ModalExample = () => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
            }}>
            <Modal animationType="slide" transparent={true} visible={modalVisible}>
                <SelectModalProvider>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Pressable
                                onPress={() => setModalVisible(!modalVisible)}
                                style={[styles.button, styles.buttonClose]}>
                                <Text style={styles.textStyle}>Hide Modal</Text>
                            </Pressable>
                            <Select
                                clearable={true}
                                options={DATA}
                                selectControlStyle={{ width: '70%' }}
                            />
                            <Select
                                clearable={true}
                                options={DATA}
                                selectControlStyle={{ width: '70%' }}
                            />
                        </View>
                    </View>
                </SelectModalProvider>
            </Modal>
            <Pressable
                onPress={() => setModalVisible(true)}
                style={[styles.button, styles.buttonOpen]}>
                <Text style={styles.textStyle}>Show Modal</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        // elevation: 5,
        zIndex: 0,
        height: 200,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});
