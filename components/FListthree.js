/*
 * https://reactnativecode.com/flatlist-react-native/
 * https://appdividend.com/2018/04/10/react-native-flatlist-example/
 * https://www.datamuse.com/api/
 */
import React, { Component } from 'react';
import { StyleSheet, FlatList, Text, View, Alert, TouchableOpacity, ActivityIndicator, TextInput, Button, Dimensions } from 'react-native';

var screenwidth = Dimensions.get('window').width;

export default class FListthree extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dataItems: [],
            isLoading: true,
            partword: ''
        };
    }

    async _fetchJsonData(myword) {
        //Retrieve remote JSON data
        var jUrl = 'https://api.datamuse.com/words?sp=';
        if (myword) {
            jUrl = jUrl + myword + '*';
        } else {
            jUrl = jUrl + 'a*&max=20';
        }

        return fetch(jUrl)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataItems: responseJson
                }, function () {
                    // In this block you can do something with new state.
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    componentDidMount() {
        //componentDidMount() is invoked immediately after a component is mounted
        //Initialization that requires DOM nodes should go here. 
        //If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
        this._fetchJsonData();
    }

    _flItemSeparator = () => {
        return (
            <View style={{ height: 2, width: "100%", backgroundColor: "skyblue" }} />
        );
    }

    _keyExtractor = (item, index) => String(index);

    _clickItem(item, index) {
        Alert.alert(index + ' - ' + item.word);
    }

    _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={this._clickItem.bind(this, item, index)}>
                <Text style={styles.itemStyle}>{item.word}</Text>
            </TouchableOpacity>
        );
    }

    _inputChange() {
        this.setState({ isLoading: true });
        this._fetchJsonData(this.state.partword);
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, paddingTop: 50 }}>
                    <ActivityIndicator />
                </View>
            );
        }

        return (
            <View style={styles.containerStyle}>

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingBottom: 20 }}>
                    <TextInput
                        style={styles.inputFieldStyle}
                        placeholder="Enter letter(s)"
                        onChangeText={(text) => this.setState({ partword: text })}
                    />
                    <Button title="Search" onPress={this._inputChange.bind(this)} color='green' />
                </View>

                <FlatList
                    data={this.state.dataItems}
                    ItemSeparatorComponent={this._flItemSeparator}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 3,
        paddingTop: 5,
    },
    itemStyle: {
        padding: 5,
        fontSize: 24,
        height: 48,
    },
    inputFieldStyle: {
        width: screenwidth * .6,
        margin: 3,
        height: 44,
        borderColor: '#7a42f4',
        borderWidth: 2
    },
});
