
import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import { getImages } from "./components/Api/Api";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import toast from "react-hot-toast";
import { Image } from "./types";
import ImageModal from "./components/ImageModal/ImageModal";

const App = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [dataFetched, setDataFetched] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [chooseImage, setChooseImage] = useState<Image|null>(null);

  useEffect(() => {
    if (!query) return;
    async function fetchImages() {
      try {
        setIsLoading(true);
        const {total_pages,results} = await getImages(query, page);

        setImages((prevImages) => [...prevImages, ...results]);
        setDataFetched(total_pages > page);
        if (results.length === 0) {
          toast("Images not found ", {
            duration: 3500,
            position: "top-center",
            style: {
              border: "2px solid #713200",
              padding: "16px",
              color: "rgb(222, 48, 48)",
              backgroundColor: "rgba(250, 235, 215)",
            },
          });
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchImages();
  }, [query, page]);

  const onSearchImg = (keyWord:string):void => {
      if (query === keyWord) {
      toast("Enter new requarest",{
            duration: 3500,
            position: "top-center",
            style: {
              border: "2px solid #713200",
              padding: "16px",
              color: "rgb(222, 48, 48)",
              backgroundColor: "rgba(250, 235, 215)",
            }
      });
      return;
    }
    setQuery(keyWord);
    setImages([]);
    setPage(1);
    setDataFetched(false);
  };

  const handleMoreImage = (): void => {
    if (isLoading) return;
    setPage((prev) => prev + 1);
  };

  const openModal = (image: Image) => {
    setChooseImage(image);
    setModalIsOpen(true);
  };

  const closeModal = (): void => {
    setChooseImage(null);
    setModalIsOpen(false);
  };
  return (
    <>
      <SearchBar onSearchImg={onSearchImg} />
      {isLoading && <Loader />}
      {images && <ImageGallery images={images} openModal={openModal} />}
      {isError && <ErrorMessage />}
      {dataFetched && <LoadMoreBtn handleMoreImage={handleMoreImage} />}
      {chooseImage && (
        <ImageModal         image={chooseImage}
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default App;