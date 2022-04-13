import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Switch, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';
import { setFilters } from '../store/actions/meals';

const FilterSwitch = props => {
    return (
        <View style={styles.filterContainer}>
                <Text>{props.label}</Text>
                <Switch trackColor={{true: Colors.primaryColor}} thumbColor={Platform.OS === 'android' ? Colors.primaryColor : 'white'} value={props.state} onValueChange={props.onChange}></Switch>
            </View>
    );
};

const FilterScreen = props => {
    const {navigation} = props;

    const [isGlutenFree, setGlutenFree] = useState(false);
    const [isLactoseFree, setisLactoseFree] = useState(false);
    const [isVegan, setisVegan] = useState(false);
    const [isVegetarian, setisVegetarian] = useState(false);

    const dispatch = useDispatch();

    //we use useCallback to avoid unnecessary rebuild of this function
    const saveFilters = useCallback(() => {
        //be sure that those params: glutenFree and others are same with reducers/meals.js case SET_FILTERS
        const appliedFilters = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegan: isVegan,
            vegetarian: isVegetarian
        };

        dispatch(setFilters(appliedFilters));
        
    }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch]);

    //here we set data than we can call it on HeaderRight with getParam('save')
    useEffect(() => {
        navigation.setParams({save: saveFilters})
    }, [saveFilters]);

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters / Restrictions</Text>
            <FilterSwitch label='Gluten-free' state={isGlutenFree} onChange={newValue => setGlutenFree(newValue)}></FilterSwitch>
            <FilterSwitch label='Lactose-free' state={isLactoseFree} onChange={newValue => setisLactoseFree(newValue)}></FilterSwitch>
            <FilterSwitch label='Vegan' state={isVegan} onChange={newValue => setisVegan(newValue)}></FilterSwitch>
            <FilterSwitch label='Vegetarian' state={isVegetarian} onChange={newValue => setisVegetarian(newValue)}></FilterSwitch>

            {/* <View style={styles.filterContainer}>
                <Text>Gluten-free</Text>
                <Switch trackColor={{true: Colors.primaryColor}} thumbColor={Platform.OS === 'android' ? Colors.primaryColor : 'white'} value={isGlutenFree} onValueChange={newValue => setGlutenFree(newValue)}></Switch>
            </View> */}
        </View>
    );
};

FilterScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Filter Screen',
        headerLeft: (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Menu' iconName='ios-menu' onPress={() => {
                navData.navigation.toggleDrawer();
            }}></Item>
        </HeaderButtons>
        ),

        headerRight: (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Save' iconName='ios-save' onPress={
                navData.navigation.getParam('save')
            }></Item>
        </HeaderButtons>
        )
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center',
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 10
    }
});

export default FilterScreen;