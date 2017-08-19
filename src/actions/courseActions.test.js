import expect from 'expect';
import thunk from 'redux-thunk';
import * as courseActions from './courseActions';
import * as types from './actionTypes';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

const middleWare = [thunk];
const mockStore = configureMockStore(middleWare);

describe('Async actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('Should create BEGIN_AJAX_CALLS and LOAD_COURSES_SUCCESS when loading courses', (done) => {
    // Here is an example how to use nock
    // nock('https://example.com/api')
    //  .get(/course)
    //  .reply('200, {body: {courses: [{id: 'A', firstNaem: 'Cory', lastName: 'House'}] }}');
    //

    const expectedActions = [
      {type: types.BEGIN_AJAX_CALL},
      {type: types.LOAD_COURSES_SUCCESS, body: {courses: [{id: 'clean-house', title: 'Clean House'}]}}
    ];

    const store = mockStore({courses: []}, expectedActions);
    store.dispatch(courseActions.loadCourses()).then(()=> {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
      expect(actions[1].type).toEqual(types.LOAD_COURSES_SUCCESS);
      done();
    });
  });
});

