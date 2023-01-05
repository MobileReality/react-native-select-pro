import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { Select, SelectModalProvider } from '@mobile-reality/react-native-select-pro';

import { SafeAreaViewWrapper } from '../components/safe-area-view-wrapper';
import { DATA } from '../constants/data';

export const ModalExample = () => {
    const [simpleModal, setSimpleModal] = useState(false);
    const [pageSheetModal, setPageSheetModal] = useState(false);
    const [rnModalSimpleModal, setRNModalSimpleModal] = useState(false);
    const [rnModalPageSheetModal, setRNModalPageSheetModal] = useState(false);

    return (
        <SafeAreaViewWrapper
            style={{
                flex: 1,
                justifyContent: 'center',
            }}
        >
            <Modal animationType="slide" transparent={true} visible={simpleModal}>
                <SelectModalProvider>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setSimpleModal(!simpleModal)}
                            >
                                <Text style={styles.textStyle}>Hide Modal</Text>
                            </Pressable>
                            <Select clearable={true} options={DATA} />
                            <Select clearable={true} options={DATA} />
                        </View>
                    </View>
                </SelectModalProvider>
            </Modal>

            <Modal animationType="slide" visible={pageSheetModal} presentationStyle="pageSheet">
                <SelectModalProvider>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setPageSheetModal(!pageSheetModal)}
                            >
                                <Text style={styles.textStyle}>Hide Modal</Text>
                            </Pressable>
                            <Select clearable={true} options={DATA} />
                            <Select clearable={true} options={DATA} />
                        </View>
                    </View>
                </SelectModalProvider>
            </Modal>

            <ReactNativeModal isVisible={rnModalSimpleModal} style={{ margin: 0 }}>
                <SelectModalProvider>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setRNModalSimpleModal(!rnModalSimpleModal)}
                            >
                                <Text style={styles.textStyle}>Hide Modal</Text>
                            </Pressable>
                            <Select clearable={true} options={DATA} />
                            <Select clearable={true} options={DATA} />
                        </View>
                    </View>
                </SelectModalProvider>
            </ReactNativeModal>

            <ReactNativeModal
                isVisible={rnModalPageSheetModal}
                style={{ margin: 0 }}
                presentationStyle="pageSheet"
            >
                <SelectModalProvider>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setRNModalPageSheetModal(!rnModalPageSheetModal)}
                            >
                                <Text style={styles.textStyle}>Hide Modal</Text>
                            </Pressable>
                            <Select clearable={true} options={DATA} />
                            <Select clearable={true} options={DATA} />
                        </View>
                    </View>
                </SelectModalProvider>
            </ReactNativeModal>

            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setSimpleModal(true)}
            >
                <Text style={styles.textStyle}>Show Modal from react-native</Text>
            </Pressable>

            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setPageSheetModal(true)}
            >
                <Text style={styles.textStyle}>
                    Show Modal with presentationStyle=pageSheet from react-native
                </Text>
            </Pressable>

            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setRNModalSimpleModal(true)}
            >
                <Text style={styles.textStyle}>Show Modal from react-native-modal</Text>
            </Pressable>

            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setRNModalPageSheetModal(true)}
            >
                <Text style={styles.textStyle}>
                    Show Modal with presentationStyle=pageSheet from react-native-modal
                </Text>
            </Pressable>
        </SafeAreaViewWrapper>
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
        zIndex: 0,
        height: 200,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginBottom: 8,
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
});
