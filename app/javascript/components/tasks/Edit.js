import React, { Component } from 'react';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: this.props.task.description,
    };
  }

  handleChange = e => {
    this.setState({ description: e.target.value });
  };

  displayEditTaskForm() {
    return (
      <div>
        <div className="form-row">
          <div className="form-group col-md-4">
            <label>Description : </label>
          </div>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <br />
        <button className="btn btn-md btn-primary" type="submit">
          Update task
        </button>
      </div>
    )
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <h3 className="py-3">Enter new task details</h3>
          {this.displayEditTaskForm()}
        </div>
      </React.Fragment>
    );
  }
}

export default Edit;
