import React from 'react';
import { View, Text } from 'react-native';

const GoalDetails = ({ navigation, route }) => {
    console.log(route);
    return (
        <View>
            <Text>Goal Details</Text>
        </View>
    );
};

export default GoalDetails;