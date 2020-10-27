import React from "react"
import PropTypes from "prop-types"

const List = ({ tasks }) => {
  const displayTaskList = () => {
    return (
      <div>
        <h1>Tasks List</h1>
        <div className="p-1">
          {tasks && tasks.length ? (
            <ul className="list-group list-unstyled">
              {tasks.map((task, index) => {
                return (
                  <li key={index}>
                    Task id : {task.id}
                    <br />
                    Task description: {task.description}
                  </li>
                );
              })}
            </ul>
          ) : (
            <h3>No task has been created yet</h3>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="pt-5">
        {displayTaskList()}
      </div>
    </div>
  );
};

export default List;
