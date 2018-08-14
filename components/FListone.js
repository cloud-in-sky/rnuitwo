/*
 * https://reactnativecode.com/flatlist-react-native/
 */
import React, { Component } from 'react';
import { StyleSheet, FlatList, Text, View, Alert, TouchableOpacity } from 'react-native';

export default class FListone extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dataItems: [
                { name: 'Captain Underpants: The First Epic Movie' },
                { name: 'The Boss Baby' },
                { name: 'Trolls' },
                { name: 'Kung Fu Panda 3' },
                { name: 'Home' },
                { name: 'Penguins of Madagascar' },
                { name: 'How to Train Your Dragon 2' },
                { name: 'Mr. Peabody & Sherman' },
                { name: 'Turbo' },
                { name: 'The Croods' },
                { name: 'Rise of the Guardians' },
                { name: 'Kung Fu Panda 2' },
                { name: 'Bee Movie' }
            ]
        };
    }

    _flItemSeparator = () => {
        return (
            <View style={{ height: 1, width: "100%", backgroundColor: "#607D8B" }} />
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
                <Text style={styles.itemStyle}>{item.name}</Text>
            </TouchableOpacity>
        );
    }

    render() {
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
});
