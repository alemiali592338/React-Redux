import expect from 'expect';
import React from 'react';
import {shallow, mount} from 'enzyme';
import {ManageCoursePage} from "./ManageCoursePage";

describe('Manage Course Page test', () => {
  it('Sets error message when attempted to save empty course title', () => {
    const course = {id:'', watchHref:'', title:'', authorId:'', length:'', category:''};
    const authors = [];
    const actions = {
      saveCourse: () => Promise.resolve()
    };
    const props = {
      course,
      authors,
      actions
    };
    const wrapper = mount(<ManageCoursePage {...props}/>);
    const saveButton = wrapper.find('input').last();
    expect(saveButton.prop('type')).toBe('submit');
    saveButton.simulate('click');
    expect(wrapper.state().errors.title).toBe('Course title must at least be 5 characters');
  });
});
