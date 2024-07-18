import React from 'react';
import { Pressable, View } from 'react-native';

const PressableButton = ({ children, pressedFunction }) => {

    return (
        <Pressable onPress={pressedFunction}>
            <View>{children}</View>
        </Pressable>
    );
};

export default PressableButton;