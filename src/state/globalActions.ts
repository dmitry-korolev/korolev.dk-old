import * as debug from 'debug';
import { IActionCreator, IAsyncActionCreator } from 'models/flux';
import { IStore } from 'models/store';
import { Dispatch } from 'redux';

const logInfo = debug('k:global:actions');

const doneActions = new Set();
const shouldRunAction = (action: AnyAction): boolean => !(
    action.once && doneActions.has(action)
    || action.onlyServer && process.env.BROWSER
    || action.onlyClient && !process.env.BROWSER
);

type AnyAction = IAsyncActionCreator | IActionCreator;

const runGlobalActions =
    async (dispatch: Dispatch<IStore>, ...actions: AnyAction[][]): Promise<void> => {
        // Simple way to make sequences of actions
        // See usage example in containers/App
        for (const step of actions) {
            const actionsToDo = step.filter(shouldRunAction);

            await Promise.all(actionsToDo.map((action: IAsyncActionCreator) => {
                logInfo(`Processing:`, action.actionName || action.name);
                doneActions.add(action);
                return dispatch(action());
            }));
        }
    };

export {
    runGlobalActions
};
