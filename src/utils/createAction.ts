import { IFluxAction } from 'models/flux';
const identity = require('ramda/src/identity');

type IPayloadHandler = (...payload: any[]) => any;
export type IActionCreator = (...args: any[]) => IFluxAction;

export const createAction =
    (type: string, payloadCreator: IPayloadHandler = identity, metaCreator?: IPayloadHandler): IActionCreator =>
        (...args: any[]): IFluxAction => {
            const hasError = args[0] instanceof Error;

            const action: IFluxAction = {
                type
            };

            const payload = hasError ? args[0] : payloadCreator(...args);
            if (payload !== undefined) {
                action.payload = payload;
            }

            if (hasError || payload instanceof Error) {
                action.error = true;
            }

            if (metaCreator) {
                action.meta = metaCreator(...args);
            }

            return action;
        };
