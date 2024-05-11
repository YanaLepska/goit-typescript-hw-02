import css from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
    handleMoreImage: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ handleMoreImage }) => {
  return (
    <div>
      <button onClick={handleMoreImage} className={css.LoadMoreBtn}>
        Load More
      </button>
    </div>
  );
};

export default LoadMoreBtn;
