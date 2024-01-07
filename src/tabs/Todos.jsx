import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

const TODOSKEY = 'todos';

export const Todos = () => {
  const [todos, setTodos] = useState(() => getFromLocalStoradge());
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  const handleDelTodo = id => {
    const newTodos = todos.filter(todo => todo.id !== id);
    saveToLocalStoradge(newTodos);
    setTodos(newTodos);
  };

  const handleEditTodo = todo => {
    setCurrentTodo(todo);
    setIsEditing(true);
  };
  const handleEditFormCancel = () => {
    setCurrentTodo({});
    setIsEditing(false);
  };

  const onSubmitEditForm = text => {
    setIsEditing(false);
    const changedTodos = todos.map(todo => {
      return todo.id === currentTodo.id ? { id: todo.id, text } : todo;
    });
    setTodos(changedTodos);
    saveToLocalStoradge(changedTodos);
  };

  const onSubmit = query => {
    const todo = { id: nanoid(), text: query };
    const todos = getFromLocalStoradge();

    todos.push(todo);

    saveToLocalStoradge(todos);

    setTodos(prev => [...prev, todo]);
  };

  function saveToLocalStoradge(todos) {
    try {
      window.localStorage.setItem(TODOSKEY, JSON.stringify(todos));
    } catch (error) {
      toast.error(error.message);
    }
  }

  function getFromLocalStoradge() {
    try {
      return JSON.parse(window.localStorage.getItem(TODOSKEY)) ?? [];
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      {isEditing ? (
        <EditForm
          currentTodo={currentTodo}
          handleCancel={handleEditFormCancel}
          onSubmit={onSubmitEditForm}
        />
      ) : (
        <SearchForm onSubmit={onSubmit} />
      )}
      {todos.length > 0 ? (
        <Grid>
          {todos.map((todo, i) => {
            return (
              <GridItem key={i}>
                <Todo
                  number={i + 1}
                  todo={todo}
                  handleEditTodo={handleEditTodo}
                  handleDelTodo={handleDelTodo}
                />
              </GridItem>
            );
          })}
        </Grid>
      ) : (
        <Text textAlign="center">There are no any todos...</Text>
      )}
      <ToastContainer autoClose={2000} hideProgressBar={true} theme="light" />
    </>
  );
};
