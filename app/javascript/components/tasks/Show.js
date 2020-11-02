import React, { Component } from 'react';
import * as Routes from "./../../utils/Routes";
import { fetchApi } from '../../utils/API';
import Form from '../tasks/comment/Form';
import Errors from '../shared/Errors';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      errors: null
    }
    this.handleError = this.handleError.bind(this);
  }

  handleError(response) {
    this.setState({
      errors: {
        errors: response.messages,
        type: response.type
      }
    });
  }

  handleDelete = taskId => {
    let taskDelete = confirm('Are you sure you want to delete the task?');
    if (taskDelete) {
      fetchApi({
        url: Routes.task_path(taskId),
        method: 'DELETE',
        onError: this.handleError,
        onSuccess: response => {
          console.log(response);
        },
        successCallBack: () => {
          window.location.replace(Routes.tasks_path());
        }
      });
    }
  };

  render() {
    const { task, comments } = this.props;
    const { errors } = this.state;
    return (
      <React.Fragment>
        <div className="container">
          <h2 className="py-3">You just created a new task!</h2>
           <div className="row">
            {errors && (
              <div className="mt-4">
                <Errors errors={errors.errors} message={errors.type} />
              </div>
            )}
          </div>
          <div className="row">
            <div className="col-md-10">
              {task.id}.{task.description}
              <a
                className="ml-2 btn btn-sm btn-warning"
                href={Routes.edit_task_path(task.id)}
              >
                Edit
              </a>
              <a
                className="ml-2 btn btn-sm btn-danger"
                onClick={() => this.handleDelete(task.id)}
              >
                Delete
              </a>
            </div>
          </div>
          <div className="row">
            <div className="mt-4 pt-4 border-top">
              <h3 className="mb-3">Comments</h3>
              {comments.map(comment => {
                return (
                  <div className="py-2">
                    <p className="font-weight-bold">{comment.content}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="row">
            <div className="mt-4 pt-4 border-top">
              <Form task={task}/>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Show;

