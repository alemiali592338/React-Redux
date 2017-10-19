import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import toastr from 'toastr';
import {formatAuthors} from '../../selectors/selectors';

export class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      course: Object.assign({}, this.props.course),
      errors: {},
      saving: false
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.course.id != nextProps.course.id){
      this.setState({course: Object.assign({}, nextProps.course)});
    }
  }

  updateCourseState(event) {
    let course = Object.assign({}, this.state.course);
    const field = event.target.name;
    course[field] = event.target.value;
    return this.setState({course});
  }

  isFormValid(){
    let formIsValid = true;
    let errors = {};

    if (this.state.course.title.length < 5) {
      errors.title = 'Course title must at least be 5 characters';
      formIsValid = false;
    }
    this.setState({errors});
    return formIsValid;
  }

  saveCourse(event) {
    event.preventDefault();

    if (!this.isFormValid()){
      return;
    }

    this.setState({saving: true});
    this.props.actions.saveCourse(this.state.course)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }

  redirect() {
    this.setState({saving: true});
    toastr.success('Course saved.');
    this.context.router.push('/courses');
  }

  render() {
    const {authors} = this.props;
    return (
      <CourseForm
        course={this.state.course}
        errors={this.state.errors}
        allAuthors={authors}
        onSave={this.saveCourse}
        saving={this.state.saving}
        onChange={this.updateCourseState}/>
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

ManageCoursePage.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  const courseId = ownProps.params.id; // From the path /course/id
  let course = {id:'', watchHref:'', title:'', authorId:'', length:'', category:''};

  if (courseId) {
    let filteredCourses = state.courses.filter(course => course.id === courseId);
    if (filteredCourses[0])
      course = filteredCourses[0];
  }

  return {
    course: course,
    authors: formatAuthors(state.authors)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
