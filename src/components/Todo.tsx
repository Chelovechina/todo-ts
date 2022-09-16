import { FC } from 'react';
import { Box, Checkbox, ButtonGroup, Typography } from '@mui/material';

import { useUpdateTodoMutation } from '../services/TodoService';
import { boxStyle, typographyStyle } from './../styles/TodoStyles'
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import Error from './Error';
import { ITodo } from '../models/ITodo';

const Item: FC<ITodo> = (todo) => {
  const { id, title, isComplete } = todo
  const [updateTodo, { error }] = useUpdateTodoMutation()

  const handleChange = async () => {
    await updateTodo({ id, title, isComplete: !isComplete })
  };

  if (error) return <Error />

  return (
    <Box sx={boxStyle}>
      <Checkbox
        checked={isComplete}
        onChange={handleChange}
        color="success"
      />
      <Typography sx={typographyStyle} style={{
        textDecoration: isComplete ? 'line-through' : 'none',
      }}>{title}</Typography >
      <ButtonGroup variant="text">
        <EditButton {...todo} />
        <DeleteButton {...todo} />
      </ButtonGroup>
    </Box>
  )
}

export default Item;