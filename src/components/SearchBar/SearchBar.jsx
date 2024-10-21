import styles from './SearchBar.module.css';
import toast, { Toaster } from 'react-hot-toast';

const SearchBar = ({ onSearch }) => {
  const handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    const query = form.elements.search.value.trim();
    if (!query) {
      toast.error('Enter the query text', {
        position: 'top-right',
        style: {
          border: '1px solid #f52121',
          padding: '16px',
          color: '#f52121',
          height: '20px',
          fontWeight: '500',
          backgroundColor: '#fc9c9c',
        },
      });
    } else {
      onSearch(query);

      event.target.reset();
    }
  };

  return (
    <>
      <Toaster />
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
        />
        <button className={styles.btn} type="submit">
          Search
        </button>
      </form>
    </>
  );
};

export default SearchBar;
