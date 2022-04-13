import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, Text, View, Button, Platform, FlatList } from 'react-native';
import { CATEGORIES } from '../data/dummy-data';
import Colors from '../constants/Colors';
import MealItem from '../components/MealItem';
import MealList from '../components/MealList';

const CategoryMealsScreen = props => {
    

    const catId = props.navigation.getParam('categoryId');
    // const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

    //here we get state.meals (meals we get from APP.js from rootReducer function)
    const availableMeals = useSelector(state => state.meals.filteredMeals);

    const displayedMeals = availableMeals.filter(meal => meal.categoryIds.indexOf(catId) >= 0);

    if(displayedMeals.length === 0)
    {
        return <View style={styles.content}>
            <Text>No meals found, check your filters?</Text>
        </View>
    }

    return (
       <MealList listData={displayedMeals} navigation={props.navigation}></MealList>
    );
};

//Header Title
CategoryMealsScreen.navigationOptions = (navigationData) => {
    const catId = navigationData.navigation.getParam('categoryId');

    const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

    return {
        headerTitle: selectedCategory.title
    };
};

const styles = StyleSheet.create({
    flatlist: {
        width: '100%',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CategoryMealsScreen;