import { RiSaveLine } from 'react-icons/ri';
import { MdOutlineCancel } from 'react-icons/md';

import { SearchFormStyled, FormBtn, InputSearch } from 'components';
import { BtnEdit } from './EditForm.styled';
import { useState } from 'react';

export const EditForm = ({ currentTodo, handleCancel, onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = evt => {
    evt.preventDefault();
    onSubmit(inputValue);
  };

  const handleInput = evt => {
    setInputValue(evt.target.value);
  };

  return (
    <SearchFormStyled onSubmit={handleSubmit}>
      <BtnEdit type="button" onClick={handleCancel}>
        <MdOutlineCancel size="16px" color="red" />
      </BtnEdit>

      <FormBtn type="submit">
        <RiSaveLine size="16px" color="green" />
      </FormBtn>

      <InputSearch
        placeholder="EDIT TODO"
        name="edit"
        required
        defaultValue={currentTodo.text}
        autoFocus
        onChange={handleInput}
      />
    </SearchFormStyled>
  );
};
