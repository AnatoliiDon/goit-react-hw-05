import { NavLink } from 'react-router-dom';
import css from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <NavLink className={css.link} to="/">
      Go Home Page
    </NavLink>
  );
};

export default NotFoundPage;
