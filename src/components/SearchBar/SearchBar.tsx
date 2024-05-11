import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";
import { FormEvent } from "react";

interface SearchBarProps {
  onSearchImg: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchImg }) => {
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const form = evt.target  as HTMLFormElement;
      const query = form.elements.namedItem("query") as HTMLInputElement;
       const value = query.value;
    if (value.trim() === "") {
      toast('Please, enter search requrest!', {
      duration: 3500,
      position: 'top-center',
      style: {
      border: '2px solid #713200',
      padding: '16px',
        color: 'rgb(222, 48, 48)',
      backgroundColor:'rgba(250, 235, 215)',
    }
      });
      return;
    }
    onSearchImg(value);
  };

  return (
    <div>
      <header className={css.header}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="query"
            autoComplete="on"
            autoFocus
            placeholder="Search images and photos"
            className={css.input}
          />
          <button className={css.btnSearch} type="submit">
            Search
          </button>
          <Toaster />
        </form>
      </header>
    </div>
  );
};

export default SearchBar;