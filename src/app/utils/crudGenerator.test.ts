import { expect } from 'chai';
import { crudGenerator } from './crudGenerator';

describe.only('CRUD helper', () => {
    const type = 'post';
    const {
        types,
        actions
    } = (crudGenerator as any)(type, {
        fetch: true,
        update: true,
        create: true,
        delete: true
    });

    it('Generates types for given "for" type', () => {
        expect(types.POST_FETCH_START).to.equal('POST_FETCH_START');
        expect(types.POST_FETCH_SUCCESS).to.equal('POST_FETCH_SUCCESS');
        expect(types.POST_FETCH_ERROR).to.equal('POST_FETCH_ERROR');

        expect(types.POST_UPDATE_START).to.equal('POST_UPDATE_START');
        expect(types.POST_UPDATE_SUCCESS).to.equal('POST_UPDATE_SUCCESS');
        expect(types.POST_UPDATE_ERROR).to.equal('POST_UPDATE_ERROR');

        expect(types.POST_CREATE_START).to.equal('POST_CREATE_START');
        expect(types.POST_CREATE_SUCCESS).to.equal('POST_CREATE_SUCCESS');
        expect(types.POST_CREATE_ERROR).to.equal('POST_CREATE_ERROR');

        expect(types.POST_DELETE_START).to.equal('POST_DELETE_START');
        expect(types.POST_DELETE_SUCCESS).to.equal('POST_DELETE_SUCCESS');
        expect(types.POST_DELETE_ERROR).to.equal('POST_DELETE_ERROR');
    });

    it('Generates action creators for given "for" type', () => {
        const testData = Math.random();

        expect(actions.fetchStart(testData)).to.equal({
            data: testData,
            type: 'POST_FETCH_START'
        });

        // TODO: add tests for create, update and delete actions
    });

    // it('Generates reducer for given "for" type', () => {
    //
    // });
});
