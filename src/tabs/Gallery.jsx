import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Text, GalleryList } from 'components';

export class Gallery extends Component {
  state = {
    query: '',
    page: 1,
    photos: [],
    isMorePhotos: false,
    randomId: 0,
    error: null,
    isEmpty: false,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page, randomId } = this.state;
    if (
      prevState.query !== query ||
      prevState.page !== page ||
      prevState.randomId !== randomId
    ) {
      try {
        const { photos, total_results } = await ImageService.getImages(
          query,
          page
        );
        if (photos.length === 0) {
          this.setState({ isEmpty: true });
          return;
        }
        this.setState(prevState => ({
          photos: [...prevState.photos, ...photos],
          isLoadMore: page < Math.ceil(total_results / 15),
        }));
      } catch (error) {
        this.setState({ error: error.message });
      }
    }
  }

  onSubmit = query => {
    this.setState({
      query,
      page: 1,
      photos: [],
      isLoadMore: false,
      randomId: Math.random(),
      isEmpty: false,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { photos, isLoadMore, error, isEmpty } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.onSubmit} />
        {photos.length > 0 && <GalleryList photos={photos} />}
        {isLoadMore && (
          <Button type="button" onClick={this.handleLoadMore}>
            Load more
          </Button>
        )}
        {error && <Text textAlign="center">Sorry. {error} 😭</Text>}
        {isEmpty && (
          <Text textAlign="center">Sorry. There are no images... 😭</Text>
        )}
      </>
    );
  }
}
