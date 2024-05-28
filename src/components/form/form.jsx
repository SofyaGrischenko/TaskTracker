import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CreationButton from "./form-buttons/create";
import TaskList from "../taskList/taskList";
import DeleteButton from "./form-buttons/delete";
import css from "./form.module.scss";
import axios from "axios";

const Form = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [taskArr, setTaskArr] = useState([]);
  const url = "http://localhost:3000/tasks/";

  const createTask = () => {
    if (name) {
      const task = {
        id: uuidv4(),
        taskName: name,
        taskDescription: description,
        status: false,
        edit: false,
      };
      postTasks(task);
      reset();
    }
  };

  const postTasks = (task) => {
    axios
      .post(url, task)
      .then((response) => {
        setTaskArr([...taskArr, task]);
        console.log("CREATE TASK");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteAll = () => {
    taskArr.map((task) => {
      axios
        .delete(url + task.id)
        .then((response) => {
          console.log("DELETE ALL", response);
          setTaskArr([]);
          updateDB();
        })
        .catch((error) => {
          console.log(error);
        });
      return <></>;
    });
  };

  const reset = () => {
    setName("");
    setDescription("");
  };

  const updateDB = (updatedTasks) => {

    updatedTasks.map(async (task) => {
      await axios
        .put(url + task.id, {
          id: task.id,
          taskName: task.taskName,
          taskDescription: task.taskDescription,
          status: task.status,
          edit: task.edit,
        })

        .then((response) => {
          console.log("response", response);
          setTaskArr(updatedTasks);
        })
        .catch((error) => {
          console.log(error);
        });
      return <></>;
    });
  };

  const handleEdit = (idx) => {
    const updatedTasks = taskArr.map((task) =>
      task.id === idx ? { ...task, edit: !task.edit } : task
    );
    updateDB(updatedTasks);
  };

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks().then((data) => {
      data && setTaskArr(data);
    });
  }, []);

  return (
    <>
      <div className={css.all}>
        <div className={css.form}>
          <h1>Task Tracker</h1>
          <div>
            <input
              className={css.nameInput}
              type="text"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
            <input
              className={css.descriptionInput}
              type="text"
              placeholder="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></input>
          </div>
        </div>
        <div className={css.buttonDiv}>
          <CreationButton createTask={createTask}></CreationButton>
          <DeleteButton deleteAll={deleteAll}></DeleteButton>
        </div>
        <div className={css.formList}>
          <div>
            <TaskList
              taskArr={taskArr}
              updateDB={updateDB}
              reset={reset}
              handleEdit={handleEdit}
              finishedTask={true}
              setTaskArr={setTaskArr}
              url={url}
            ></TaskList>
          </div>
          <div>
            <TaskList
              taskArr={taskArr}
              updateDB={updateDB}
              reset={reset}
              handleEdit={handleEdit}
              finishedTask={false}
              setTaskArr={setTaskArr}
              url={url}
            ></TaskList>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
