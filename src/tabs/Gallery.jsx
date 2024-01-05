import { useEffect, useState } from 'react';
import * as ImageService from 'service/image-service';
import { Button, SearchForm, Text, GalleryList, Modal } from 'components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Gallery = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [usedQuery, setUsedQuery] = useState('');
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [modalSrc, setModalSrc] = useState(false);
  const [modalAlt, setModalAlt] = useState(false);

  useEffect(() => {
    if (query !== '') {
      fetchImage();
    }

    async function fetchImage() {
      try {
        const { photos, total_results } = await ImageService.getImages(
          query,
          page
        );
        if (photos.length === 0) {
          setIsEmpty(true);
          return;
        }
        setUsedQuery(query);
        setPhotos(prevState => [...prevState, ...photos]);
        setIsLoadMore(page < Math.ceil(total_results / 15));

        if (page === 1)
          toast.success(`Hooray! We are found ${total_results} images`);

        if (page === Math.ceil(total_results / 15))
          toast.success(`This is the end, no more images to show`);
      } catch (error) {
        setError(error.message);
      }
    }
  }, [page, query]);

  const onSubmit = query => {
    if (usedQuery === query) return;
    setQuery(query);
    setPage(1);
    setPhotos([]);
    setIsLoadMore(false);
    setIsEmpty(false);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const handleModal = (imgSrc, imgAlt) => {
    setModalSrc(imgSrc);
    setModalAlt(imgAlt);
    setIsModal(true);
  };

  const closeModal = () => {
    setIsModal(false);
  };

  return (
    <>
      <SearchForm onSubmit={onSubmit} />
      {photos.length > 0 && (
        <GalleryList openModal={handleModal} photos={photos} />
      )}
      {isLoadMore && (
        <Button type="button" onClick={handleLoadMore}>
          Load more
        </Button>
      )}
      {error && <Text textAlign="center">Sorry. {error} 😭</Text>}
      {isEmpty && (
        <Text textAlign="center">Sorry. There are no images... 😭</Text>
      )}
      {isModal && (
        <Modal imgSrc={modalSrc} imgAlt={modalAlt} closeModal={closeModal} />
      )}
      <ToastContainer autoClose={2000} hideProgressBar={true} theme="light" />
    </>
  );
};
