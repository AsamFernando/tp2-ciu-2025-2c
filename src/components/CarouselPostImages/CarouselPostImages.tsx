import Carousel from "react-bootstrap/Carousel";
import type { imageBDType } from "../../Types/Types";

function CarouselPostImages({ images }: { images: imageBDType[] }) {
  if (!images || images.length === 0) {
    return (
      <div className="text-muted py-3 text-center" style={{ fontStyle: "italic" }}>
        Sin imágenes
      </div>
    );
  }

  return (
    <Carousel
      data-bs-theme="light"
      interval={null}
      indicators={images.length > 1}
      style={{ borderRadius: "10px", overflow: "hidden" }}
    >
      {images.map((image, i) => (
        <Carousel.Item key={i}>
          <img
            src={image.url}
            alt={`Imagen ${i + 1}`}
            className="d-block w-100"
            style={{
              width: "100%",
              height: "480px",         // un poco más alto, se ve tipo post de IG
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CarouselPostImages;
