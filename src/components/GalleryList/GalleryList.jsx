import { CardItem, Grid, GridItem } from 'components';

export const GalleryList = ({ photos, openModal }) => {
  return (
    <Grid>
      {photos.map(({ alt, id, src, avg_color }) => (
        <GridItem key={id} onClick={() => openModal(src.large, alt)}>
          <CardItem color={avg_color}>
            <img src={src.large} alt={alt} />
          </CardItem>
        </GridItem>
      ))}
    </Grid>
  );
};
