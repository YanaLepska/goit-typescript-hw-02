import { Image } from "../../types";
import css from "./ImageCard.module.css";

interface ImageCardProps {
  image: Image;
  openModal: (image: Image) => void;

}

const ImageCard: React.FC<ImageCardProps> = ({ openModal, image }) => {
  return (
    <div>
      <img
        className={css.ImageCard}
        src={image.urls.small}
        alt={image.alt_description}
        onClick={() => openModal(image)}
      />
    </div>
  );
};

export default ImageCard;
