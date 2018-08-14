/*
 * https://reactnativecode.com/flatlist-react-native/
 * https://appdividend.com/2018/04/10/react-native-flatlist-example/
 * https://restcountries.eu/#api-endpoints-region
 */
import React, { Component } from 'react';
import { StyleSheet, FlatList, Text, View, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';

export default class FListtwo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dataItems: [],
            isLoading: true
        };
    }

    async _fetchJsonData() {
        //Retrieve remote JSON data
        return fetch('https://restcountries.eu/rest/v2/region/Asia')
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
        Alert.alert(index + ' - ' + item.name);
    }

    _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={this._clickItem.bind(this, item, index)}>
                <Text style={styles.itemStyleCountry}>{item.name}</Text>
                <Text style={styles.itemStyleCapital}>Capital: {item.capital}  Timezone: {item.timezones}</Text>
            </TouchableOpacity>
        );
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, paddingTop: 40 }}>
                    <ActivityIndicator />
                </View>
            );
        }

        return (
            <View style={styles.containerStyle}>
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
        margin: 10
    },
    itemStyle: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    itemStyleCountry: {
        paddingTop: 10,
        fontSize: 24,
        height: 48,
    },
    itemStyleCapital: {
        paddingBottom: 10,
        fontSize: 16,
        height: 36,
        color: 'blue'
    },
});
