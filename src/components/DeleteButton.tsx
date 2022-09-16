import { FC } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

import { useDeleteTodoMutation } from '../services/TodoService';
import { ITodo } from '../models/ITodo';
import Error from './Error';


const DeleteButton: FC<ITodo> = (todo) => {
  const [deleteTodo, { error }] = useDeleteTodoMutation()

  const handleDelete = async () => {
    await deleteTodo(todo)
  }

  if (error) return <Error />

  return (
    <IconButton onClick={handleDelete} color="error">
      <DeleteIcon />
    </IconButton>
  )
}

export default DeleteButton;