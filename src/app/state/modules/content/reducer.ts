import { IContent } from 'models/content';

const initialState: IContent = {
    posts: new Map(),
    categories: new Map()
};

export const contentReducer = (state = initialState): IContent => {

    return state;
};
