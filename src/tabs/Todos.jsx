import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

import { useEffect, useState } from 'react';

export const Todos = () => {
  const onSubmit = query => {};

  return (
    <>
      <Text>Todos</Text>
      <SearchForm onSubmit={onSubmit} />
    </>
  );
};
