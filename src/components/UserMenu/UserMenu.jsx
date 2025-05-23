import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/auth/operations';
import { selectUser } from '../../redux/auth/selectors';
import css from './UserMenu.module.css';

export default function UserMenu() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={css.menu}>
      <p className={css.welcome}>Welcome, <span className={css.username}>{user.name}</span></p>
      <button className={css.logoutButton} onClick={handleLogout}>Logout</button>
    </div>
  );
}