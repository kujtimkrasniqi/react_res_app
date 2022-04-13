import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, Platform } from 'react-native';
import Colors from '../constants/Colors';

import { CATEGORIES } from '../data/dummy-data';
import CategoryGridTile from '../components/categoryGridTile';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';



const CategoriesScreen = props => {
    // console.log(props);

    const renderGridItem = itemData => {
        return (
            <CategoryGridTile title={itemData.item.title}
                color={itemData.item.color}
                onSelect={() => {
                    props.navigation.navigate({
                        routeName: 'CategoryMeals', params: {
                            categoryId: itemData.item.id
                        }
                    });
                }}>
            </CategoryGridTile>
        );
    };

    return (
        // <View style={styles.screen}>
        //     <Text>Categories Screen</Text>
        //     <Button title='Go to Meals' onPress={() => {
        //         props.navigation.navigate({routeName: 'CategoryMeals'}); //Navigate on stack
        //         // props.navigation.replace({routeName: 'CategoryMeals'}); //replace doesnt allow to go back because its nothing in stack(stack is routes that we created on MealsNavigator)
        //         // props.navigation.push('CategoryMeals');
        //     }}>
        //     </Button>
        // </View>

        <FlatList keyExtractor={(item, index) => item.id} data={CATEGORIES} renderItem={renderGridItem} numColumns={2}>

        </FlatList>
    );
};

//Header Title
CategoriesScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Meal Categories',
        headerLeft: (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Menu' iconName='ios-menu' onPress={() => {
                navData.navigation.toggleDrawer();
            }}></Item>
        </HeaderButtons>
        )
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

});

export default CategoriesScreen;