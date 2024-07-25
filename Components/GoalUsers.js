import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-web';

const GoalUsers = () => {

    useEffect(async () => {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        console.log(response);
    }, []);

    return (
        <View>
            <Text>GoalUsers Component</Text>
        </View>
    );
};

export default GoalUsers;