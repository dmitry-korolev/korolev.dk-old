import { IAction, IActionCreator } from 'models/flux';
const identity = require('ramda/src/identity');

type IPayloadHandler = (...payload: any[]) => any;

export const createAction =
    <Options>(
        type: string,
        payloadCreator: IPayloadHandler = identity,
        metaCreator?: IPayloadHandler
    ): IActionCreator<Options> =>
        (opts: Options): IAction => {
            const hasError = opts instanceof Error;

            const action: IAction = {
                type
            };

            const payload = hasError ? opts : payloadCreator(opts);
            if (payload !== undefined) {
                action.payload = payload;
            }

            if (hasError || payload instanceof Error) {
                action.error = true;
            }

            if (metaCreator) {
                action.meta = metaCreator(opts);
            }

            return action;
        };
