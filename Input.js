import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

export default function Input() {
    const [text, setText] = useState('');
    const [thankYouVisible, setThankYouVisible] = useState(false);

    return (
        <View>
            <TextInput
                value={text}
                onChangeText={function (changedText) {
                    console.log("changedText: ", changedText);
                    setText(changedText);
                    console.log("text: ", text);
                    setThankYouVisible(false);
                }}
                onBlur={() => setThankYouVisible(true)} 
                placeholder="Enter your name"
                autoCapitalize={true}
                autoFocus={true}
            >
            </ TextInput>
            {thankYouVisible && <Text >Thank you!</Text>}
            <Text>Your last input: {text}</Text>
        </View>
    );
}