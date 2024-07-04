import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

export default function Input() {
    const [text, setText] = useState('');
    return (
        <View>
        <TextInput 
            value={text}
            onChangeText={function (changedText) 
            {
                console.log("changedText: ", changedText);
                setText(changedText);
                console.log("text: ", text);
            }}
            placeholder="Enter your name" 
            autoCapitalize={true}
        >
        </ TextInput>
        <Text>{text}</Text>
        </View>
    );
}