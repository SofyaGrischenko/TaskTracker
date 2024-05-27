import React, {useState}  from 'react';
import css from './task.module.scss'

const  TaskList = (props) => {
            
    const {taskArr, updateLocalStorage, handleEdit, reset, finishedTask} = props

    const [newName, setNewName] = useState('')
    const [newDescription, setNewDescription] =useState('')

    const deleteOneTask = (id) => {
      const updatedTasks = taskArr.filter((task) => task.id !== id);
      updateLocalStorage(updatedTasks); 
    }

    const saveChanges = (idx) => {
      const updatedTasks = taskArr.map((task) => 
       task.id === idx ? {...task, taskName: newName, taskDescription: newDescription } : task 
    ) 
      updateLocalStorage(updatedTasks)       
      reset()
    }


    const changeStatus = ( idx) => {
      const updatedTasks = taskArr.map((task) => 
        task.id === idx ? { ...task, status: !task.status } : task 
    ) 
      updateLocalStorage(updatedTasks) 
    }
    
    
    
  
  return (
    <>
    {taskArr.length && taskArr.map((task, id) => {
      if(finishedTask === task.status){
      return(
      <div key={id} className={css.taskList}> 
        {!task.edit ? <span> Name:{task.taskName}  </span> : 
        <input 
          placeholder="name" 
          onChange = {(e) => setNewName(e.target.value)}/>}
        {!task.edit ? <span>, Description: {task.taskDescription}</span> : 
        <input
          placeholder="description"
          onChange = {(e) => setNewDescription(e.target.value)}/> }

        <input
            className={css.checkbox}
             type="checkbox" 
            checked={task.status}
            onChange = {() => changeStatus(task.id)}
            ></input> 

          {!task.edit ? 
          <button  onClick={() => deleteOneTask(task.id)} className={css.taskListButton}>
            Delete
            </button>
            : 
          <button
              onClick={() => saveChanges(task.id)} className={css.taskListButton}>
            Save</button>
           }
          <button 
              onClick={() => handleEdit(task.id)}className={css.taskListButton}>
                Edit</button>
      </div> )}
      else return <></> })    
  } 
  </>
  ) }
export default TaskList;