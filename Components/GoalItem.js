import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView, FlatList } from 'react-native';
import React, { useState } from 'react';


const GoalItem = ({goal}) => {
    return (
    <View style={styles.textContainer}>
        <Text style={styles.textSytle}>{goal.text}</Text>
    </View>
    )
}

export default GoalItem;

const styles = StyleSheet.create({
    textContainer: {
      backgroundColor: '#ffff00',
      padding: 5,
      borderRadius: 5,
    },
    textSytle: {
      fontSize: 25,
      margin: 10,
    },
});