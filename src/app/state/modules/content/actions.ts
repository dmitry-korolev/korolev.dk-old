// import {
//     GET_POSTS_REQUEST,
//     GET_POSTS_SUCCESS,
//     GET_POSTS_FAILURE,
//
//     GET_POST_REQUEST,
//     GET_POST_SUCCESS,
//     GET_POST_FAILURE,
//
//     GET_CATEGORIES_REQUEST,
//     GET_CATEGORIES_SUCCESS,
//     GET_CATEGORIES_FAILURE,
//
//     GET_CAREGORY_REQUEST,
//     GET_CAREGORY_SUCCESS,
//     GET_CAREGORY_FAILURE,
// } from './types';
//
// // Types
// import { IGetPosts, IContentAction } from 'models/content';
//
// /** Async Action Creator */
// export const getPosts = () => (dispatch) => {
//     dispatch(headlinesRequest());
//
//     return Promise.resolve(require('../../../../../mocks/taglines.json'))
//         .then((taglines: string[]) => dispatch(headlinesSuccess(taglines)))
//         .then(() => dispatch(headlinesSet()));
// };
//
// /** Action Creators */
// export const postsRequest = (): IContentAction => ({ type: GET_POSTS_REQUEST });
// export const postRequest = (): IContentAction => ({ type: GET_POST_REQUEST });
// export const categoriesRequest = (): IContentAction => ({ type: GET_CATEGORIES_REQUEST });
// export const categroriesequest = (): IContentAction => ({ type: GET_CATEGORy_REQUEST });
//
// export const headlinesSuccess = (headlines: string[]): IHeadlinesAction => ({
//     type: GET_SUCCESS,
//     payload: {
//         headlines
//     }
// });
//
// export const headlinesFailure = (message: any): IHeadlinesAction => ({
//     type: GET_FAILURE,
//     payload: {
//         message
//     }
// });
//
// export const headlinesSet = (): IHeadlinesAction => ({
//     type: SET_HEADLINE
// });
