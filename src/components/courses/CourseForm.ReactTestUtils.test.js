import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
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
  let renderer = TestUtils.createRenderer();
  renderer.render(<CourseForm {...props} />);
  let output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  };
}

describe('CourseForm via React Test Utils', () => {
  it('Renders Form and H1 ', ()=> {
    const {output} = setup(false);
    expect(output.type).toBe('form');
    let [h1] = output.props.children;
    expect(h1.type).toBe('h1');
  });

  it('Save button is enabled when is not saving', () => {
    const {output} = setup(false);
    const submitButton = output.props.children[5];
    expect(submitButton.props.value).toBe('Save');
  });

  it('Save button is disabled when is saving...', () => {
    const {output} = setup(true);
    const submitButton = output.props.children[5];
    expect(submitButton.props.value).toBe('Saving...');
  });
});
