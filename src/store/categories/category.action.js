// Importing action types and utility function from relevant files
import { CATEGORIES_ACTION_TYPES } from './category.types';
import { createAction } from '../../utils/reducer/reducer.utils';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

// Action creator for indicating the start of category data fetch
export const fetchCategoriesStart = () =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

// Action creator for indicating the successful fetch of category data
export const fetchCategoriesSuccess = (categoriesArray) =>
  createAction(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
    categoriesArray
  );

// Action creator for indicating the failure of category data fetch
export const fetchCategoriesFailed = (error) =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);

// Async action creator for initiating the asynchronous process of fetching categories
export const fetchCategoriesAsync = () => {
  return async (dispatch) => {
    // Dispatching the action to indicate the start of the fetch operation
    dispatch(fetchCategoriesStart());

    try {
      // Fetching categories data asynchronously from Firebase
      const categoriesArray = await getCategoriesAndDocuments('categories');

      // Dispatching the action to indicate the success of the fetch operation
      dispatch(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
      // Dispatching the action to indicate the failure of the fetch operation
      dispatch(fetchCategoriesFailed(error));
    }
  };
};
