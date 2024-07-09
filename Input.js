import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function Input() {
    const [text, setText] = useState('');
    const [thankYouVisible, setThankYouVisible] = useState(false);

    function handleConfirm() {
        console.log("user typed: ", text);
        setText('');
    };

    function changedText(changedText) {
        console.log("changedText: ", changedText);
        setText(changedText);  
        console.log("text: ", text);
        setThankYouVisible(false);
    }

    return (
        <View>
            <TextInput
                value={text}
                onChangeText={() => changedText()}
                onBlur={() => setThankYouVisible(true)} 
                placeholder="Enter your name"
                autoCapitalize={true}
                autoFocus={true}
            >
            </ TextInput>
            {thankYouVisible && <Text >Thank you! {text}</Text>}
            <Button title="Confirm" onPress={()=>{handleConfirm();}}></Button>
        </View>
    );
}