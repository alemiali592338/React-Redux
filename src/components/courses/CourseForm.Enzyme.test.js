import expect from 'expect';
import React from 'react';
import {shallow, mount} from 'enzyme';
import CourseForm from './CourseForm';

function setup(saving) {
  let props = {
    course: {},
    allAuthors: [],
    onSave: () => {},
    onChange: () => {},
    saving: saving,
    errors: ''
  };

  return shallow(<CourseForm {...props}/>);
}

describe('CourseForm via Enzyme Test Utils', () => {
  it('Renders Form and H1 ', ()=> {
    const wrapper = setup(false);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('h1').text()).toBe('Manage Course');
  });

  it('Save button is enabled when is not saving', () => {
    const wrapper = setup(false);
    expect(wrapper.find('input').props().value).toBe('Save');
  });

  it('Save button is disabled when is saving...', () => {
    const wrapper = setup(true);
    expect(wrapper.find('input').props().value).toBe('Saving...');
  });
});
