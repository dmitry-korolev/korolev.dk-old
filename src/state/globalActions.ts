import { IFluxActionCreator } from 'models/flux';
import { Dispatch } from 'redux';
import { getCategories } from 'state/categories';
import { getHeadlines, headlinesSet } from 'state/headlines';

const actions = [
    getHeadlines,
    getCategories,
    headlinesSet
];

const doneActions = new Map();

const doActions = (dispatch: Dispatch<any>): Promise<any[]> => {
    const actionsToDo = actions.filter((action: IFluxActionCreator): boolean => !(
        action.once && doneActions.has(action)
        || action.onlyServer && process.env.BROWSER
        || action.onlyClient && !process.env.BROWSER
    ));

    return Promise.all(actionsToDo.map((action: IFluxActionCreator) => {
        doneActions.set(action, true);
        return dispatch(action());
    }));
};

export {
    doActions
};
