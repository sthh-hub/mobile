import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet, Image } from 'react-native';

// two ways to pass props!
// export default function Input( props ) {
//     console.log(props.inputHandler);
export default function Input({ inputHandler, inputCanceler, isModalVisible }) {
    const [text, setText] = useState('');
    const [thankYouVisible, setThankYouVisible] = useState(false);
    const [isConfirmDisabled, setIsConfirmDisabled] = useState(true);

    function handleConfirm() {
        console.log("user typed: ", text);
        inputHandler(text); // pass data to parent
        setThankYouVisible(true);
        setText('');
        setIsConfirmDisabled(true);
    };

    function handleCancel() {
        inputCanceler(false);
        setThankYouVisible(false);
        setText('');
    };

    function changedText(changedText) {
        console.log("changedText: ", changedText);
        setText(changedText);
        console.log("text: ", text);
        setThankYouVisible(false);
        setIsConfirmDisabled(changedText.length === 0);
    };

    return (
        <Modal animationType="slide" visible={isModalVisible} transparent={true}>
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <Image
                        style={styles.imageStyle}
                        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2617/2617812.png' }}
                        alt="Network image"
                    />
                    <Image
                        style={styles.imageStyle}
                        source={require('./assets/target.png')} // Make sure the image is saved in the correct path
                        alt="Local file"
                    />
                    <TextInput style={styles.inputStyle}
                        value={text}
                        // onChangeText={(changedText)=>changedText(changedText)} // we need to have a variable to store the changed text
                        onChangeText={changedText} // same as above
                        onBlur={() => setThankYouVisible(false)}
                        placeholder="Enter your goal here..."
                        autoCapitalize={true}
                        autoFocus={true}
                    >
                    </ TextInput>
                    {thankYouVisible && <Text >Thank you!</Text>}
                    <View style={styles.buttonStyle}>
                        <View style={styles.cancelButtonStyle}><Button title="Cancel" onPress={() => { handleCancel(); }}></Button></View>
                        <View style={styles.confirmButtonStyle}><Button title="Confirm" onPress={() => { handleConfirm(); }} disabled={isConfirmDisabled}></Button></View>
                    </View>
                </View>
            </View>
        </Modal >
    );
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: 'lightgrey',
        borderRadius: 5,
        padding: 20,
        alignItems: 'center',
    },
    buttonStyle: {
        fontSize: 8,
        flexDirection: 'row',
        padding: 10,
    },
    cancelButtonStyle: {
        width: '30%',
        backgroundColor: 'white',
        borderRadius: 5,
        margin: 10,
        padding: 5,
    },
    confirmButtonStyle: {
        width: '30%',
        backgroundColor: 'lightblue',
        borderRadius: 5,
        margin: 10,
        padding: 5,
    },
    inputStyle: {
        backgroundColor: '#ffff99',
        margin: 10,
        padding: 10
    },
    imageStyle: {
        width: 100,
        height: 100,
        marginTop: 20,
    }
});