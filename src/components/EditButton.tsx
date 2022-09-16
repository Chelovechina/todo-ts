import { ChangeEvent, FC, useState } from 'react';
import { Modal, IconButton, Box, TextField, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import { boxStyle, divStyle, buttonStyle } from './../styles/EditButtonStyles';
import { ITodo } from '../models/ITodo';
import { useUpdateTodoMutation } from '../services/TodoService';
import Error from './Error';

const EditButton: FC<ITodo> = ({ id, isComplete }) => {
  const [open, setOpen] = useState(false);
  const [newTitle, setNewTitle] = useState<string>('')
  const [updateTodo, { error }] = useUpdateTodoMutation()

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewTitle(e.target.value)
  }
  const handleSave = async () => {
    await updateTodo({ id, title: newTitle, isComplete })
    setNewTitle('')
    handleClose()
  }

  if (error) return <Error />

  return (
    <>
      <IconButton onClick={handleOpen} color="success">
        <EditIcon />
      </IconButton>

      <Modal open={open} onClose={handleClose}>
        <Box sx={boxStyle}>
          <TextField fullWidth value={newTitle} onChange={handleChange} label="Изменить" variant="filled" />
          <div style={divStyle}>
            <Button
              sx={buttonStyle}
              onClick={handleClose}
              size="small"
              color="error"
              variant="contained">
              Отмена
            </Button>
            <Button onClick={handleSave} sx={buttonStyle} size="small" color="success" variant="contained">
              Сохранить
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default EditButton;
