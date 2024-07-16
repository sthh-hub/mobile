import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView, FlatList } from 'react-native';
import React, { useState } from 'react';



const GoalItem = ({ goal, deleteHandler, pressHandler }) => {
    function handleDeleteGoal() {
        deleteHandler(goal.id);
    }

    function goalPressed() {
        pressHandler(goal);
    }

    return (
        <View>
            <View style={styles.textContainer}>
                <Text style={styles.textSytle}>{goal.text}</Text>
                <Button style={styles.buttonStyle} title="X" onPress={() => { handleDeleteGoal() }} />
                <Button style={styles.buttonStyle} title="i" onPress={() => { goalPressed() }} />
            </View>
        </View>
    )
}

export default GoalItem;

const styles = StyleSheet.create({
    textContainer: {
        backgroundColor: '#aaa',
        padding: 15,
        borderRadius: 5,
        justifyContent: 'center',
        flexDirection: 'row',
        marginVertical: 15,
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