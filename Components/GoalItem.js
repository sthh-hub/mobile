import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView, FlatList, Pressable } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';


const GoalItem = ({ goal, deleteHandler }) => {

    const navigation = useNavigation();
    const pressed = false;

    function handleDeleteGoal() {
        deleteHandler(goal.id);
    }

    function goalPressed() {
        navigation.navigate('Details', { goalObj: goal });
    }

    return (
        <View>
            <View style={styles.textContainer}>
                <Pressable android_ripple={{ color: "pink" }} onPress={goalPressed}
                    style={({pressed}) => {
                        return [styles.horizantolContainer, pressed && styles.pressedStyle];
                    }} >
                    <Text style={styles.textSytle}>{goal.text}</Text>
                    <Button style={styles.buttonStyle} title="X" onPress={() => { handleDeleteGoal() }} />
                </Pressable>
            </View>
        </View>
    )
}

export default GoalItem;

const styles = StyleSheet.create({
    horizantolContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#aaa',
        borderRadius: 5,
    },
    pressedStyle: {
        opacity: 0.5,
        backgroundColor: 'pink',
    },
    textContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginVertical: 15,
        backgroundColor: '#aaa',
        borderRadius: 5,
    },
    textSytle: {
        fontSize: 25,
        margin: 10,
    },
    buttonStyle: {
        fontSize: 12,
        color: 'white',
        borderRadius: 5,
        margin: 5,
        alignContent: 'center',
        justifyContent: 'center',
    },
});