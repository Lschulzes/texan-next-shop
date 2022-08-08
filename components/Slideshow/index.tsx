import { Slide } from 'react-slideshow-image';

import 'react-slideshow-image/dist/styles.css';
import { getImageUrl } from '../../pages/admin/products/[slug]';
import styles from './Slideshow.module.css';

type Props = {
  images: Array<string>;
};

const Slideshow = ({ images }: Props) => {
  return (
    <Slide easing="ease" duration={7000} indicators>
      {images.map((image) => (
        <div className={styles['each-slide']} key={image}>
          <div
            style={{
              backgroundImage: `url(${getImageUrl(image)})`,
              backgroundSize: 'cover',
            }}
          ></div>
        </div>
      ))}
    </Slide>
  );
};

export default Slideshow;
