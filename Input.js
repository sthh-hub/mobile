import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet } from 'react-native';

// two ways to pass props!
// export default function Input( props ) {
//     console.log(props.inputHandler);
export default function Input({ inputHandler, isModalVisible }) {
    console.log(inputHandler);
    const [text, setText] = useState('');
    const [thankYouVisible, setThankYouVisible] = useState(false);

    function handleConfirm() {
        console.log("user typed: ", text);
        inputHandler(text); // pass data to parent
        setThankYouVisible(true);
        // setText('');
    };

    function changedText(changedText) {
        console.log("changedText: ", changedText);
        setText(changedText);
        console.log("text: ", text);
        setThankYouVisible(false);
    }

    return (
        <Modal animationType="slide" visible={isModalVisible} transparent={true}>
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <TextInput style={styles.inputStyle}
                        value={text}
                        // onChangeText={(changedText)=>changedText(changedText)} // we need to have a variable to store the changed text
                        onChangeText={changedText} // same as above
                        onBlur={() => setThankYouVisible(true)}
                        placeholder="Enter your goal here..."
                        autoCapitalize={true}
                        autoFocus={true}
                    >
                    </ TextInput>
                    {thankYouVisible && <Text >Thank you!</Text>}
                    <View style={styles.buttonStyle}>
                        <Button title="Confirm" onPress={() => { handleConfirm(); }}></Button>
                    </View>
                </View>
            </View>
        </Modal>
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
        width: '30%',
         backgroundColor: 'lightblue',
        color: 'white',
        borderRadius: 5,
        margin: 5,
    },
    inputStyle: {
        color: 'black',
        backgroundColor: '#ffff99',
        margin: 5,
    }
});