import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Navigation.module.css';

const buildStylesClasses = ({ isActive }) =>
  clsx(styles.link, isActive && styles.active);

const Navigation = () => {
  return (
    <div className={styles.nav}>
      <NavLink className={buildStylesClasses} to="/">
        Home
      </NavLink>
      <NavLink className={buildStylesClasses} to="/movies" end>
        Movies
      </NavLink>
    </div>
  );
};

export default Navigation;
