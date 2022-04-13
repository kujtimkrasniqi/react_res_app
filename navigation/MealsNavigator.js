import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import Colors from '../constants/Colors';
import FiltersScreen from '../screens/FiltersScreen';

const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
    },
    // headerTitleStyle: {
    //     fontFamily: 'open-sans'
    // },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
};

//NAVIGATION = ROUTES
const MealsNavigator = createStackNavigator({
    Categories: { //e.g Categories is route name
        screen: CategoriesScreen,
    },
    CategoryMeals: {
        screen: CategoryMealsScreen, //same like Categories: CategoriesScreen, just this is long form and Categories is short way
    },
    MealDetail: MealDetailScreen
}, {
    // mode: 'modal',
    // initialRouteName: 'Categories',
    defaultNavigationOptions: defaultStackNavOptions
});

const FavNavigator = createStackNavigator({
    Favorites: {screen: FavoritesScreen},
    MealDetail: MealDetailScreen
}, {
    // initialRouteName: 'Categories',
    defaultNavigationOptions: defaultStackNavOptions
});

const tabScreenConfig = {
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return (
                    <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor}>
                    </Ionicons>
                );
            },
            tabBarColor: Colors.primaryColor
        }
    },
    Favorites: {
        screen: FavNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return (
                    <Ionicons name='ios-star' size={25} color={tabInfo.tintColor}>
                    </Ionicons>
                );
            },
            tabBarColor: Colors.secondColor
        }
    }
};

//FAVORITE ROUTES
const MealsFavTabNavigator = Platform.OS === 'android' ? createMaterialBottomTabNavigator(tabScreenConfig, {
    activeTintColor: 'white',
    shifting: true,
    barStyle: {
        backgroundColor: Colors.primaryColor
    }
    }) : createBottomTabNavigator(tabScreenConfig,
    {
        tabBarOptions: {
            activeTintColor: Colors.secondColor
        }
    });

const FiltersNavigator = createStackNavigator({
    Filters: FiltersScreen
}, 
{
    // navigationOptions: {
    //     drawerLAbel: 'Filters'
    // },
    defaultNavigationOptions: defaultStackNavOptions
});

const MainNavigator = createDrawerNavigator({
    MealsFavs: {screen: MealsFavTabNavigator, navigationOptions: {
        drawerLabel: 'Meals'
    }},
    Filters: FiltersNavigator
},  {
    contentOptions: {
        activeTintColor: Colors.secondColor,
        labelStyle: {
            fontWeight: 'bold'
        }
    }
});


//WE use now MealsFavTabNavigator because MealsNavigator now is calling inside of MealsFavTabNavigator
export default createAppContainer(MainNavigator); 
