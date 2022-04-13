import { MEALS } from '../../data/dummy-data';
import { SET_FILTERS, TOGGLE_FAVORITE } from '../actions/meals';

const initialState = {
    meals: MEALS,
    filteredMeals: MEALS,
    favoriteMeals: []
};

const mealsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_FAVORITE:
            const existingIndex = state.favoriteMeals.findIndex(meal => meal.id === action.mealId);
            if(existingIndex >= 0)
            {
                const updatedFavMeals = [...state.favoriteMeals];
                //here we delete the existingMeals and we update with new one
                updatedFavMeals.splice(existingIndex, 1);
                return {...state, favoriteMeals: updatedFavMeals};
            }
            else
            {
                //state.meals we have in function mealsReducer
                const meal = state.meals.find(meal => meal.id === action.mealId);
                //...state means to copy the old state than to update it
                return {...state, favoriteMeals: state.favoriteMeals.concat(meal)}
            }
        case SET_FILTERS:
            const appliedFilters = action.filters;
            const updatedFilteredMeals = state.meals.filter(meal => {
                if (appliedFilters.glutenFree && !meal.isGlutenFree)
                {
                    return false;
                }
                if(appliedFilters.lactoseFree && !meal.isLactoseFree)
                {
                    return false;
                }
                if(appliedFilters.vegetarin && !meal.isVegetarian)
                {
                    return false;
                }
                if(appliedFilters.vegan && !meal.isVegan)
                {
                    return false;
                }
                return true;
            });
            return {...state, filteredMeals: updatedFilteredMeals};
        default:
            return state;
    }
    return state;
};

export default mealsReducer;