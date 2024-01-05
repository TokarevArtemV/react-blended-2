import { ModalWraper, ModalImage } from 'components';
import { useEffect } from 'react';

export const Modal = ({ imgSrc, imgAlt, closeModal }) => {
  useEffect(() => {
    const handleCloseModal = evt => {
      if (evt.code === 'Escape') closeModal();
    };

    window.addEventListener('keydown', handleCloseModal);

    return () => {
      window.removeEventListener('keydown', handleCloseModal);
    };
  }, [closeModal]);

  const handleClick = evt => {
    if (evt.target === evt.currentTarget) closeModal();
  };

  return (
    <ModalWraper onClick={handleClick}>
      <ModalImage src={imgSrc} alt={imgAlt} />
    </ModalWraper>
  );
};
