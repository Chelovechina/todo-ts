import { FC } from 'react';
import { CssBaseline, Container, Typography } from '@mui/material';

import { containerStyle, divStyle } from './styles/AppStyles'
import Todo from './components/Todo'
import AddTodo from './components/AddTodo'
import { useFetchAllTodosQuery } from './services/TodoService';
import Error from './components/Error';

const App: FC = () => {
  const { data: todos, error } = useFetchAllTodosQuery('')

  if (error) return <Error />

  const todoList = todos && todos.map((todo) => {
    return <Todo {...todo} />
  })

  return (
    <div style={divStyle}>
      <CssBaseline />
      <Container maxWidth='sm' sx={containerStyle}>
        <div>
          <AddTodo />
          {todoList}
        </div>
      </Container>
    </div>
  );
}

export default App;
