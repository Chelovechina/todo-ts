import { ChangeEvent, FC, useState } from 'react';
import { TextField, IconButton, Card } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { cardStyle, inputStyle } from './../styles/AddTodoStyles';
import { useCreateTodoMutation } from '../services/TodoService';
import { ITodo } from './../models/ITodo'


const AddTodo: FC = () => {
  const [newTodoText, setNewTodoText] = useState<string>('')
  const [createTodo, { }] = useCreateTodoMutation()

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNewTodoText(event.target.value)
  }

  const handleCreate = async () => {
    await createTodo({ title: newTodoText, isComplete: false } as ITodo)
    setNewTodoText('')
  }

  return (
    <Card sx={cardStyle}>
      <TextField
        fullWidth
        focused
        sx={inputStyle}
        value={newTodoText}
        onChange={handleChange}
        color="success"
        label="Создать задание"
        variant="outlined"
      />
      <IconButton onClick={handleCreate} size="large" color="success">
        <AddIcon />
      </IconButton>
    </Card>
  );
};

export default AddTodo;
