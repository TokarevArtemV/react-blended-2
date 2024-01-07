import { useState } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export const SearchForm = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmitForm = evt => {
    evt.preventDefault();
    if (query.trim() === '') {
      setQuery('');
      return;
    }

    onSubmit(query);
  };

  const onChange = evt => {
    setQuery(evt.target.value);
  };

  return (
    <SearchFormStyled onSubmit={handleSubmitForm}>
      <FormBtn type="submit">
        <FiSearch size="16px" />
      </FormBtn>
      <InputSearch
        placeholder="What do you want to write?"
        name="search"
        required
        autoFocus
        value={query}
        onChange={onChange}
      />
    </SearchFormStyled>
  );
};
