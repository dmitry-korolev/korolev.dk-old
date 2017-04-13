import { expect } from 'chai';
import {
    handleFetchError,
    handleFetchStart,
    handleFetchSuccess
} from './handlers';

describe('handleFetchStart', () => {
    it('simple', () => {
        const state = {
            isFetching: false,
            error: false
        };

        expect(handleFetchStart(state)).to.eql({
            isFetching: true,
            error: false
        });

        expect(state).to.eql({
            isFetching: false,
            error: false
        });
    });
});

describe('handleFetchError', () => {
    it('simple', () => {
        const state = {
            isFetching: true
        };

        const error = new Error('something happened on the way to heaven');

        const action = {
            type: 'example/FETCH_ERROR',
            error: true,
            payload: error
        };

        const expected = {
            isFetching: false,
            error: true,
            errorMessage: error
        };

        expect(handleFetchError(state, action)).to.eql(expected);
    });
});

describe('handleFetchSuccess', () => {
    it('non-paginated result', () => {
        const initialState = {
            isFetching: true
        };

        const action = {
            type: 'example/FETCH_SUCCESS',
            payload: [
                {
                    _id: '5',
                    content: 'Burn the Heretic! Kill the Mutant! Purge the Penguin!',
                    _created: '2017-02-23T14:24:04.211Z'
                },
                {
                    _id: '6',
                    content: 'Знаете, что меня подбадривает? Издевательство над чужими неудачами.',
                    _created: '2017-02-25T14:24:04.225Z'
                }
            ]
        };

        const expected = {
            isFetching: false,
            error: false,
            itemsById: {
                5: {
                    _id: '5',
                    content: 'Burn the Heretic! Kill the Mutant! Purge the Penguin!',
                    _created: '2017-02-23T14:24:04.211Z'
                },
                6: {
                    _id: '6',
                    content: 'Знаете, что меня подбадривает? Издевательство над чужими неудачами.',
                    _created: '2017-02-25T14:24:04.225Z'
                }
            }
        };

        expect(handleFetchSuccess(initialState, action)).to.eql(expected);
    });
    it('paginated result', () => {
        const initialState = {
            isFetching: true
        };

        const action = {
            type: 'example/FETCH_SUCCESS',
            payload: {
                total: 20,
                limit: 2,
                skip: 4,
                data: [
                    {
                        _id: '5',
                        content: 'Burn the Heretic! Kill the Mutant! Purge the Penguin!',
                        _created: '2017-02-23T14:24:04.211Z'
                    },
                    {
                        _id: '6',
                        content: 'Знаете, что меня подбадривает? Издевательство над чужими неудачами.',
                        _created: '2017-02-25T14:24:04.225Z'
                    }
                ],
                pagination: {
                    key: '/',
                    pageNumber: 3
                }
            }
        };

        const expected = {
            isFetching: false,
            error: false,
            itemsById: {
                5: {
                    _id: '5',
                    content: 'Burn the Heretic! Kill the Mutant! Purge the Penguin!',
                    _created: '2017-02-23T14:24:04.211Z'
                },
                6: {
                    _id: '6',
                    content: 'Знаете, что меня подбадривает? Издевательство над чужими неудачами.',
                    _created: '2017-02-25T14:24:04.225Z'
                }
            }
        };

        expect(handleFetchSuccess(initialState, action)).to.eql(expected);
    });
    it('paginated result (harder)', () => {
        const initialState = {
            isFetching: true,
            error: false,
            itemsById: {
                5: {
                    _id: '5',
                    content: 'Burn the Heretic! Kill the Mutant! Purge the Penguin!',
                    _created: '2017-02-23T14:24:04.211Z'
                },
                6: {
                    _id: '6',
                    content: 'Знаете, что меня подбадривает? Издевательство над чужими неудачами.',
                    _created: '2017-02-25T14:24:04.225Z'
                }
            }
        };

        const action = {
            type: 'example/FETCH_SUCCESS',
            payload: {
                total: 20,
                limit: 2,
                skip: 2,
                data: [
                    {
                        _id: '7',
                        content: 'Знаете, что меня подбадривает? Издевательство над чужими неудачами.',
                        _created: '2017-02-27T14:24:04.225Z'
                    },
                    {
                        _id: '8',
                        content: 'Знаете, что меня подбадривает? Издевательство над чужими неудачами.',
                        _created: '2017-02-28T14:24:04.225Z'
                    }
                ],
                pagination: {
                    key: '/',
                    pageNumber: 2
                }
            }
        };

        const expected = {
            isFetching: false,
            error: false,
            itemsById: {
                5: {
                    _id: '5',
                    content: 'Burn the Heretic! Kill the Mutant! Purge the Penguin!',
                    _created: '2017-02-23T14:24:04.211Z'
                },
                6: {
                    _id: '6',
                    content: 'Знаете, что меня подбадривает? Издевательство над чужими неудачами.',
                    _created: '2017-02-25T14:24:04.225Z'
                },
                7: {
                    _id: '7',
                    content: 'Знаете, что меня подбадривает? Издевательство над чужими неудачами.',
                    _created: '2017-02-27T14:24:04.225Z'
                },
                8: {
                    _id: '8',
                    content: 'Знаете, что меня подбадривает? Издевательство над чужими неудачами.',
                    _created: '2017-02-28T14:24:04.225Z'
                }
            }
        };

        expect(handleFetchSuccess(initialState, action)).to.eql(expected);
    });
});
