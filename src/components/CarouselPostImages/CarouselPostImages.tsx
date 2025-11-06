import Carousel from 'react-bootstrap/Carousel';
import type { imageBDType } from '../../Types/Types';

function CarouselPostImages({images}:{images:imageBDType[]}) {

  return (
    <Carousel data-bs-theme="light">
        {images.map((image, i) =>( 
            <Carousel.Item className="align-items-center justify-content-center" key={i}>
                <div className="align-items-center justify-content-center w-100" style={{margin:'3rem', padding:'3rem'}} >
                    {image.url}
                </div>
            </Carousel.Item>
        ))}
    </Carousel>
  );
}

export default CarouselPostImages;