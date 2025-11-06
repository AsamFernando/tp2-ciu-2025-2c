import Carousel from 'react-bootstrap/Carousel';

function CarouselPostImages({images}:{images:any[]}) {

  return (
    <Carousel data-bs-theme="light">
        {images.map((image, i) =>( 
            <Carousel.Item className="align-items-center justify-content-center" key={i}>
                <div className="align-items-center justify-content-center w-100" style={{margin:'3rem', padding:'3rem'}} >
                    {image.url}
                </div>
                {/* <Carousel.Caption>
                    <h5>First slide label</h5>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption> */}
            </Carousel.Item>
        ))}
    </Carousel>
  );
}

export default CarouselPostImages;