import {combineReducers} from 'redux';
import courses from './courseReducers';
import authors from './authorReducer';
import ajaxCallsInProgress from './ajaxCallsReducer';

const rootReducer = combineReducers({
  courses,
  authors,
  ajaxCallsInProgress
});

export default rootReducer;
