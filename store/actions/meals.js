export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const SET_FILTERS = 'SET_FILTERS';

//this is for favorite meals that we add
export const toggleFavorite = (id) => {
    return {
        type: TOGGLE_FAVORITE,
        mealId: id
    };
};

//this is for Filters on setting that we put like: gluteenFree = true...
export const setFilters = filterSettings => {
    return {
        type: SET_FILTERS,
        filters: filterSettings
    };
};