import React, { useEffect, useState} from "react";
import { v4 as uuidv4 } from 'uuid'
import CreationButton from "./form-buttons/create";
import TaskList from "../taskList/task";
import DeleteButton from "./form-buttons/delete";
import css from './form.module.scss'



const Form = () => {

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [taskArr, setTaskArr] = useState([])



  const createTask = () =>{ 
  if (name){
   const task = ({   
      id: uuidv4(),
      taskName: name,
      taskDescription: description,
      status: false,
      edit: false
    })
    taskArr.push(task)
    updateLocalStorage(taskArr)
    reset()
  }}

  const deleteAll = () =>{
    localStorage.clear()
    setTaskArr([])
  }

  const reset = () =>{
    setName("")
    setDescription("")
  }

  const updateLocalStorage = (updatedTasks) => {
    
    localStorage.setItem('Tasks', JSON.stringify(updatedTasks))
    setTaskArr(updatedTasks)
  };

  const handleEdit = (idx) => {
    const updatedTasks = taskArr.map((task) => 
      task.id === idx ? { ...task, edit: !task.edit } : task ) 
      updateLocalStorage(updatedTasks)  
}


  useEffect(() => {
    const storedTasks = localStorage.getItem('Tasks')
    storedTasks && setTaskArr(JSON.parse(storedTasks))
     }, [])

  return (
    <>
    <div className={css.all}>
    <div className={css.form}>
    <h1>Task Tracker</h1>
    <div >
    <input
        className={css.nameInput}
        type="text" 
        placeholder="name"
        value={name}
        onChange = {(e) => setName(e.target.value)} > 
        </input> 
    <input
        className={css.descriptionInput}
        type="text"
        placeholder="description"
        value={description}
        onChange = {(e) => setDescription(e.target.value)} > 
    </input>
    </div>
    </div>
    <div className={css.buttonDiv}>
    <CreationButton
      createTask = {createTask}>
      </CreationButton>
    <DeleteButton   
            deleteAll = {deleteAll}></DeleteButton>
    
    </div>
    <div className={css.formList}>

      <div>
        <TaskList
            taskArr = {taskArr}
            updateLocalStorage = {updateLocalStorage}
            reset = {reset}
            handleEdit = {handleEdit}
            finishedTask = {true}
              ></TaskList>
        </div>
        <div>
        <TaskList
            taskArr = {taskArr}
            updateLocalStorage = {updateLocalStorage}
            reset = {reset}
            handleEdit = {handleEdit}
            finishedTask = {false}
              ></TaskList>
            </div>
    </div>
    </div>
    </>
  )
}

export default Form;