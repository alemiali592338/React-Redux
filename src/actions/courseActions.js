import * as actionTypes from './actionTypes';
import courseApi from '../api/mockCourseApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadCoursesSuccess(courses){
  return {type: actionTypes.LOAD_COURSES_SUCCESS, courses};
}

export function updateCourseSucess(savedCourse) {
  return {type: actionTypes.UPDATE_COURSE_SUCCESS, course: savedCourse};
}

export function insertCourseSuccess(savedCourse) {
  return {type: actionTypes.INSERT_COURSE_SUCCESS, course: savedCourse};
}

export function loadCourses() {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return courseApi.getAllCourses().then(courses => {
      dispatch(loadCoursesSuccess(courses));
    }).catch(error => {
      dispatch(ajaxCallError());
      throw error;
    });
  };
}

export function saveCourse(course) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return courseApi.saveCourse(course).then(savedCourse => {
      course.id ? dispatch(updateCourseSucess(savedCourse)) : dispatch(insertCourseSuccess(savedCourse));
    }).catch(error => {
      dispatch(ajaxCallError());
      throw error;
    });
  };
}

