import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';
import clsx from 'clsx';

const Navigation = () => {
  const activeStyle = ({ isActive }) =>
    clsx(css.link, isActive && css.activeLink);
  return (
    <header className={css.header}>
      <NavLink className={activeStyle} to="/">
        Home
      </NavLink>
      <NavLink className={activeStyle} to="/movies">
        Search
      </NavLink>
    </header>
  );
};

export default Navigation;
