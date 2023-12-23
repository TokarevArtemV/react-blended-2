import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    query: '',
    page: 1,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      const data = await ImageService.getImages(query, page);
      console.log(data);
    }
  }

  onSubmit = query => {
    this.setState({
      query,
    });
  };

  render() {
    return (
      <>
        <SearchForm onSubmit={this.onSubmit} />
        {/* <Text textAlign="center">Sorry. There are no images ... 😭</Text> */}
      </>
    );
  }
}
