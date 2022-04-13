import React from 'react';
import { StyleSheet, Text, View, Button, Platform, FlatList } from 'react-native';

const DefaultTest = props => {
    return (
        <Text style={styles.text}>{props.children}</Text>
    );
};

const styles = StyleSheet.create({
    text: {
        fontWeight: 'bold'
    }
});

export default DefaultTest;