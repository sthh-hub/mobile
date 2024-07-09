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
    };

    function changedText(changedText) {
        console.log("changedText: ", changedText);
        setText(changedText);
        console.log("text: ", text);
        setThankYouVisible(false);
    }

    return (
        <Modal animationType="slide" visible={isModalVisible}>
            <View style={styles.container}>
                <TextInput
                    value={text}
                    // onChangeText={(changedText)=>changedText(changedText)} // we need to have a variable to store the changed text
                    onChangeText={changedText} // same as above
                    onBlur={() => setThankYouVisible(true)}
                    placeholder="Enter your name"
                    autoCapitalize={true}
                    autoFocus={true}
                >
                </ TextInput>
                {thankYouVisible && <Text >Thank you!</Text>}
                <Button title="Confirm" onPress={() => { handleConfirm(); }}></Button>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});