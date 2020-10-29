import React, { Component } from 'react';

import * as Routes from '../../utils/Routes';
import { fetchApi } from '../../utils/API';
import Errors from '../shared/Errors';

class Show extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: null,
    };
    this.handleError = this.handleError.bind(this);
  }

  handleError(response) {
    this.setState({
      errors: {
        errors: response.messages,
        type: response.type,
      },
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
        },
      });
    }
  };

  displayErrors() {
    const { errors } = this.state;

    return (
      <div className="row">
        {errors && (
          <div className="mt-4">
            <Errors errors={errors.errors} message={errors.type} />
          </div>
        )}
      </div>
    )
  }

  render() {
    const { task } = this.props;
    return (
      <React.Fragment>
        <div className="container">
          <h2 className="py-3">You just created a new task!</h2>
          {this.displayErrors()}
          <div className="row">
            <div className="col-md-10 font-weight-bold">
              <h5>
                {task.id}. {task.description}
                <a
                  className="ml-2 btn btn-sm btn-warning"
                  href={Routes.edit_task_path(task.id)}>
                  Edit
                </a>
                <a
                  className="ml-2 btn btn-sm btn-danger"
                  onClick={() => this.handleDelete(task.id)}
                >
                  Delete
                </a>
              </h5>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Show;

