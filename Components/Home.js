import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView, FlatList } from 'react-native';
import React, { useState } from 'react';
import Header from "./Header";
import Input from "./Input";
import GoalItem from "./GoalItem";

export default function Home({ navigation }) {
    const appName = "Summer 2024 class";

    const [receivedText, setReceivedText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [goals, setGoals] = useState([]);

    // To receive data add a parameter
    function handleInputData(data) {
        console.log("callback fn called with data: ", data);
        setReceivedText(data);
        setModalVisible(false);

        // define a new object {text:.., id:..}
        const newGoal = { text: data, id: Math.random().toString() };
        // use updater function when updating the state variable based on existing state
        setGoals((currentGoals) => {
            return [...currentGoals, newGoal];
        });
    }
    function handleInputCancel(isVisible) {
        console.log("callback fn called with data: ", isVisible);
        setModalVisible(isVisible);
    };

    function handleDeleteGoal(deletedId) {
        console.log("delete goal with id: ", deletedId);
        setGoals((currentGoals) => {
            return currentGoals.filter((goal) => {
                return goal.id !== deletedId;
            });
        });
    }

    function handlePressIGoal(pressedGoal) {
        console.log("Goal pressed ", pressedGoal);
        navigation.navigate('Details', { goalObj: pressedGoal });
        // navigation.navigate('Details', { pressedGoal });
    }


    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Header name={appName} theme="dark">
                    {/* <Text> This is a child component</Text>
        <Text> This is another child component</Text> */}
                </Header>
                <View style={styles.buttonStyle}>
                    <Button title="Add a goal" onPress={() => { setModalVisible(true) }}></Button>
                </View>
            </View>
            <View style={styles.bottomContainer}>
                {/* set up a callback function */}
                {goals.length === 0 ? (
                    <Text>Please Add a Goal</Text>
                ) : (
                    <FlatList
                        renderItem={({ item }) => {
                            return <GoalItem goal={item} deleteHandler={handleDeleteGoal} pressHandler={handlePressIGoal} />;
                        }}
                        data={goals}
                    />
                    // <ScrollView>
                    //   {goals.map((goalObj) => {
                    //     console.log(goalObj);
                    //     return (
                    //       <View key={goalObj.id} style={styles.textContainer}>
                    //         <Text style={styles.textSytle}>{goalObj.text}</Text>
                    //       </View>
                    //     );
                    //   })}
                    // </ScrollView>
                )}
                <View style={styles.textContainer}>
                    <Input inputHandler={handleInputData} inputCanceler={handleInputCancel} isModalVisible={modalVisible} />
                    {/* use the state variable to render the received data */}
                    {/* <Text>{receivedText}</Text> */}
                </View>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        backgroundColor: '#ffff00',
        padding: 5,
        borderRadius: 5,
    },
    textSytle: {
        fontSize: 25,
        margin: 10,
    },
    buttonStyle: {
        width: '30%',
        fontSize: 12,
        backgroundColor: 'lightblue',
        color: 'white',
        borderRadius: 5,
        margin: 5,
    },
    topContainer: {
        flex: 1,
        marginTop: 70,
        alignItems: 'center'
    },
    bottomContainer: {
        flex: 5,
        backgroundColor: 'lightyellow',
        width: '100%',
        alignItems: 'center'
    }
});
