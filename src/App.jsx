import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "./redux/auth/operations";
import { fetchContacts } from "./redux/contacts/operations";
import { selectIsLoggedIn } from "./redux/auth/selectors";
import AppRoutes from "./routes"; // ✅ Routing separated
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  // Refresh user on app load
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  // Fetch contacts only after login
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchContacts());
    }
  }, [dispatch, isLoggedIn]);

  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
}

export default App;
