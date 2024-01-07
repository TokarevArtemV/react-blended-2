import { Text } from 'components';
import { TodoWrapper, DeleteButton, EditButton } from './Todo.styled';
import { RiDeleteBinLine, RiEdit2Line } from 'react-icons/ri';

export const Todo = ({ number, todo, handleDelTodo, handleEditTodo }) => {
  const { id, text } = todo;

  return (
    <TodoWrapper>
      <Text textAlign="center" marginBottom="20px">
        TODO #{number}
      </Text>
      <Text>{text}</Text>
      <DeleteButton type="button" onClick={() => handleDelTodo(id)}>
        <RiDeleteBinLine size={24} />
      </DeleteButton>
      <EditButton type="button" onClick={() => handleEditTodo(todo)}>
        <RiEdit2Line size={24} />
      </EditButton>
    </TodoWrapper>
  );
};
