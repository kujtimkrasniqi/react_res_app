import React, { useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Image } from 'react-native';
// import { MEALS } from '../data/dummy-data';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefalutText';

import { toggleFavorite } from '../store/actions/meals';

const ListItem = props => {
    return (
        <View styles={styles.listItem}>
            <Text>{props.children}</Text>
        </View>
    );
};

const MeailDetailScreen = props => {
    //here second meals we take from reducers(meals.js)
    const availableMeals = useSelector(state => state.meals.meals);
    const mealId = props.navigation.getParam('mealId');

    //currentMealsIsFavorite we use to check if meals are part of favoriteMeals so we can change the star sign to filled and not filled
    const currentMealsIsFavorite = useSelector(state => state.meals.favoriteMeals.some(meal => meal.id === mealId));

    const selectedMeals = availableMeals.find(meal => meal.id === mealId);

    const dispatch = useDispatch();

    //with useCallback at second params in array [dispatch, mealId] => means that those two shouldnt change so
    // this will not re run the useEffect on each refresh till we have new favorite food (new mealId)
    const toggleFavoriteHandler = useCallback(() => {
        dispatch(toggleFavorite(mealId));
    }, [dispatch, mealId]);

    useEffect(() => {
        //here we use this to setParams to forward to Headers function below : (MeailDetailScreen.navigationOptions)
        props.navigation.setParams({
            toggleFav: toggleFavoriteHandler
        });
    }, [toggleFavoriteHandler]);

    useEffect(() => {
        //here we use this to setParams to forward to Headers function below : (MeailDetailScreen.navigationOptions)
        props.navigation.setParams({
            isFav: currentMealsIsFavorite
        });
    }, [currentMealsIsFavorite]);

    return (
        <ScrollView>
            <Image source={{ uri: selectedMeals.imageUrl }} style={styles.image}></Image>
            <View style={styles.details}>
                <DefaultText>{selectedMeals.duration}</DefaultText>
                <DefaultText>{selectedMeals.complexity.toUpperCase()}</DefaultText>
                <DefaultText>{selectedMeals.affordability.toUpperCase()}</DefaultText>
            </View>
            <Text style={styles.title}>ingredients</Text>
            {selectedMeals.ingredients.map(ingredient => (
                <ListItem key={ingredient}>{ingredient}</ListItem>
            ))}
            <Text style={styles.title}>Steps</Text>
            {selectedMeals.steps.map(step => (
                <ListItem key={step}>{step}</ListItem>
            ))}
        </ScrollView>
    );
};

MeailDetailScreen.navigationOptions = (navigationData) => {
    // const mealId = navigationData.navigation.getParam('mealId');
    const mealTitle = navigationData.navigation.getParam('mealTitle');
    const toggleFavorite = navigationData.navigation.getParam('toggleFav');
    const isFavorite = navigationData.navigation.getParam('isFav');
    // const selectedMeals = MEALS.find(meal => meal.id === mealId);

    return {
        headerTitle: mealTitle,
        headerRight:
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='Favorite' iconName={isFavorite ? 'ios-star' : 'ios-star-outline'} onPress={toggleFavorite}>

                </Item>
            </HeaderButtons>,
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200,
    },
    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 22,
        textAlign: 'center'
    },
    listItem: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
    }
});

export default MeailDetailScreen;