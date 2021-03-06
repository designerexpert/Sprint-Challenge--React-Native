import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import { StackNavigator } from 'react-navigation';
import axios from 'axios';
import Styles from '../Styles';
//'https://dog.ceo/api/breeds/list/all'

export default class Breeds extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    keyExtractor = (item, index) => {
        return (`${item}${index}`);
    }

    componentWillMount() {
        axios.get('https://dog.ceo/api/breeds/list/all')
            .then(res => {
                console.log('success getting breeds');
                let breeds = Object.keys(res.data.message);
                this.setState({ breeds })
            })
            .catch(err => {
                console.log(err, 'error getting breeds list');
            })
    }

    handleSubBreeds = (subBreed) => {
        console.log(subBreed);
        // this.props.navigation.setParams({ subBreed });
        this.props.navigation.navigate('SubBreeds', { subBreed });
    }

    render() {
        return (
            <View style={Styles.container}>
                <Text style={Styles.pageHeader}>All Dogo Breeds</Text>
                <ScrollView contentContainerStyle={Styles.listWrapper}>
                    <FlatList
                        keyExtractor={this.keyExtractor}
                        data={this.state.breeds}
                        renderItem={({ item }) => {
                            return (
                                <Text
                                    style={Styles.listText}
                                    name={item}
                                    onPress={() => { this.handleSubBreeds(item) }}
                                >
                                    {item}
                                </Text>
                            );
                        }}
                    />
                </ScrollView>
            </View>
        );
    }
}