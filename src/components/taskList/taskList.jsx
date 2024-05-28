import React, { useState } from "react";
import css from "./task.module.scss";
import axios from "axios";

const TaskList = ({
  taskArr,
  updateDB,
  handleEdit,
  reset,
  finishedTask,
  setTaskArr,
  url,
  fetchTasks
}) => {
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const deleteOneTask = (id) => {
    axios
      .delete(url + id)
      .then((response) => {
        const updatedTasks = taskArr.filter((task) => task.id !== id);
        console.log('DELETE 1 TASK');
        setTaskArr(updatedTasks);
        updateDB(updatedTasks)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveChanges = (idx) => {
    const updatedTasks = taskArr.map((task) =>
      task.id === idx
        ? { ...task, taskName: newName, taskDescription: newDescription }
        : task
    );

    updateDB(updatedTasks);
    reset();
  };

  const changeStatus = (idx) => {
    console.log(idx);
    const updatedTasks = taskArr.map((task) =>
     task.id === idx ? { ...task, status: !task.status } : task  
  );
    console.log(updatedTasks);
    updateDB(updatedTasks)
  };

  return (
    <>
      {taskArr.length > 0 &&
        taskArr.map((task) => {
          if (finishedTask === task.status) {
            return (
              <div key={task.id} className={css.taskList}>
                {!task.edit ? (
                  <span> Name:{task.taskName} </span>
                ) : (
                  <input
                    placeholder="name"
                    onChange={(e) => setNewName(e.target.value)}
                  />
                )}
                {!task.edit ? (
                  <span>, Description: {task.taskDescription}</span>
                ) : (
                  <input
                    placeholder="description"
                    onChange={(e) => setNewDescription(e.target.value)}
                  />
                )}

                <input
                  className={css.checkbox}
                  type="checkbox"
                  checked={task.status}
                  onChange={() => changeStatus(task.id)}
                ></input>

                {!task.edit ? (
                  <button
                    onClick={() => deleteOneTask(task.id)}
                    className={css.taskListButton}
                  >
                    Delete
                  </button>
                ) : (
                  <button
                    onClick={() => saveChanges(task.id)}
                    className={css.taskListButton}
                  >
                    Save
                  </button>
                )}
                <button
                  onClick={() => handleEdit(task.id)}
                  className={css.taskListButton}
                >
                  Edit
                </button>
              </div>
            );
          } else return null;
        })}
    </>
  );
};
export default TaskList;
