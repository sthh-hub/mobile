import React, { useState } from 'react';
import { TextInput } from 'react-native';

export default function Input() {
    const [text, setText] = useState('');
    return (
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
        />
    );
}