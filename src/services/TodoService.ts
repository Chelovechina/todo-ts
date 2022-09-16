import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ITodo } from '../models/ITodo';

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
  }),
  tagTypes: ['Todo'],
  endpoints: (builder) => ({
    fetchAllTodos: builder.query<ITodo[], string>({
      query: () => ({
        url: `/todos`,
      }),
      providesTags: (result) => ['Todo'],
    }),
    createTodo: builder.mutation<ITodo, ITodo>({
      query: (todo) => ({
        url: `/todos`,
        method: 'POST',
        body: todo,
      }),
      invalidatesTags: (result) => ['Todo'],
    }),
    updateTodo: builder.mutation<ITodo, ITodo>({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: 'PUT',
        body: todo,
      }),
      invalidatesTags: (result) => ['Todo'],
    }),
    deleteTodo: builder.mutation<ITodo, ITodo>({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result) => ['Todo'],
    }),
  }),
});

export const {
  useFetchAllTodosQuery,
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} = todoApi;
