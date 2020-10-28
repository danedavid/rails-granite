import React, { Component } from 'react';
import API from '../../utils/API';
import * as Routes from '../../utils/Routes';


class New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      message: null,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    API.postNewTask({ task: { description: this.state.description } })
      .then((response) => {
        this.setState({ message: response.notice });
        setTimeout(() => {
          window.location.href = Routes.tasks_path();
        }, 1000);
      })
      .catch(error => {
        console.error(error)
        if (error.text) {
          error.text().then(err => {
            console.error(err);
          });
        }
      });
  }

  handleChange(event) {
    this.setState({
      description: event.target.value,
    });
  }

  displayAddTaskForm() {
    return (
      <div>
        <div className="row">
          <h3 className="pb-3">Add Task</h3>
        </div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group row pt-3">
            <label htmlFor="name" className="col-sm-2 col-form-label">
              <h5 className="text-secondary ">Description: </h5>
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                onChange={this.handleChange}
                value={this.state.description}
              />
            </div>
          </div>
          <div className="form-group row pt float-right pr-3">
            <button className="btn btn-md btn-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    )
  }

  render() {
    return (
      <div className="container">
        {
          this.state.message 
            ? <div className="alert alert-success">
            {this.state.message}
          </div>
          : <div className="col-md-10 mx-auto pt-2">
            {this.displayAddTaskForm()}
          </div>
        } 
      </div>
    );
  }
}

export default New;

