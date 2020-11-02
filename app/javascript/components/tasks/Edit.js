import React, { Component } from 'react';

import { fetchApi } from '../../utils/API';
import * as Routes from '../../utils/Routes';
import Errors from '../shared/Errors';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: {
        ...this.props.task,
        errors: null,
        message: null
      }
    }
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

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      task: {
        ...this.state.task,
        [name]: value
      }
    });
  };

  handleSubmit = e => {
    fetchApi({
      url: Routes.task_path(this.props.task.id),
      method: 'PATCH',
      body: {
        task: this.state.task
      },
      onError: this.handleError,
      onSuccess: response => {
        console.log(response);
      },
      successCallBack: () => {
        window.location.replace(Routes.tasks_path());
      },
    });
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

  displayNewTaskForm() {
      const {users}=this.props;
      const { errors, message } = this.state;
    return (
     <div className="col-md-10 mx-auto pt-2">
          <div className="row">
            <h3 className="pb-3">Edit Task</h3>
          </div>
          {this.displayErrors()}
          {message ? (
            <div className="alert alert-success">{message}</div>
          ) : (
          <form action={Routes.task_path(this.props.task.id)} onSubmit={this.handleSubmit}>
            <div className="form-group row pt-3">
              <label htmlFor="name" className="col-sm-2 col-form-label">
                <h5 className="text-secondary ">Description: </h5>
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  onChange={this.handleChange}
                  name="description"
                  value={this.state.task.description}
                />
              </div>
            </div>
            <div className="form-group row pt-3">
              <label htmlFor="name" className="col-sm-2 col-form-label">
                <h5 className="text-secondary ">Assigned to: </h5>
              </label>
              <div className="col-sm-10">
                <select
                  className="custom-select"
                  name="user_id"
                  id="users"
                  onChange={this.handleChange}
                >
                  {users &&
                    users.map(user => (
                      <option value={user.id} key={user.id}>
                        {user.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="form-group row pt float-right pr-3">
              <button className="btn btn-md btn-primary" type="submit">
                Submit
              </button>
            </div>
          </form>
          )}
        </div>
    )
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">
          {this.displayNewTaskForm()}
        </div>
      </React.Fragment>
    );
  }
}

export default Edit;

