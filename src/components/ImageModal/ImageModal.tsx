import { Image } from "../../types";
import ReactModal from 'react-modal'
const customStyles = {
  overlay: {
    backgroundColor: "rgba(15, 12, 12, 0.9)",
  },

  content: {
    height: "80%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgb(233, 233, 244)",
  },
};

interface ImageModalProps {
  image: Image;
  modalIsOpen: boolean;
  closeModal: () => void;
}

ReactModal.setAppElement("#root");

const ImageModal: React.FC<ImageModalProps> = ({ image, modalIsOpen, closeModal }) => {
  return (
    <div>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        shouldCloseOnEsc={true}
        style={customStyles}
        contentLabel="Image Modal"
      >
        <div>
          <img src={image.urls.regular} alt={image.alt_description} />
          <h2>{image.alt_description}</h2>
          <p>Autor: {image.user.name}</p>
          <p>Likes: {image.likes}</p>
        </div>
      </ReactModal>
    </div>
  );
};

export default ImageModal;
