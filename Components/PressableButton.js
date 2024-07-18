import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';

const PressableButton = ({ children, pressedFunction, componentStyle }) => {

    return (
        <Pressable onPress={pressedFunction}
            style={({ pressed }) => {
                return [
                    styles.defaultStyle,
                    componentStyle,
                    pressed && styles.pressedStyle
                ];
            }}>
            <View>{children}</View>
        </Pressable>
    );
};

export default PressableButton;

styles = StyleSheet.create({
    defaultStyle: {
        backgroundColor: 'beige',
        margin: 5,
        padding: 5
    },
    pressedStyle: {
        opacity: 0.5,
        backgroundColor: 'red',
    },
});