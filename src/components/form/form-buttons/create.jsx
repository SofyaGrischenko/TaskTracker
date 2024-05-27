import css from './button.module.scss'

const CreationButton = ({createTask}) =>{

  return(
    <button className ={css.formButton}onClick={() => createTask()}>
      Create New Task</button>
  )
}

export default CreationButton;