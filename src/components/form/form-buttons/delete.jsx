import css from './button.module.scss'

const DeleteButton = ({deleteAll}) =>{
  

  return(
    <button className= {css.formButton} onClick={() => deleteAll()}>
      Delete </button>
  )
}

export default DeleteButton;