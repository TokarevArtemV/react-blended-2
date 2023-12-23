import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Text, GalleryList } from 'components';

export class Gallery extends Component {
  state = {
    query: '',
    page: 1,
    photos: [],
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      const { photos, total_results } = await ImageService.getImages(
        query,
        page
      );
      this.setState(prevState => ({
        photos: [...prevState.photos, ...photos],
      }));
    }
  }

  onSubmit = query => {
    this.setState({
      query,
    });
  };

  render() {
    const { photos } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.onSubmit} />
        {photos.length > 0 && <GalleryList photos={photos} />}
        {/* <Text textAlign="center">Sorry. There are no images ... 😭</Text> */}
      </>
    );
  }
}
