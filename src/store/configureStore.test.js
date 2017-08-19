import expect from 'expect';
import {createStore} from 'redux';
import rootReducer from '../reducers';
import initialStore from '../reducers/initialState';
import * as courseActions from '../actions/courseActions';

describe('Configure Store', () => {

  it('Should handle creating courses', () => {
    const store = createStore(rootReducer, initialStore);
    const course = {
      title: 'Cory House'
    };
    store.dispatch(courseActions.insertCourseSuccess(course));

    const actual = store.getState().courses[0];
    const expected = Object.assign({}, course);
    expect(actual).toEqual(expected);
  });
});
