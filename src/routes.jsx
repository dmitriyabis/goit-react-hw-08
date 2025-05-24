// import { Routes, Route } from "react-router-dom";
// import Layout from "./components/Layout/Layout";
// import HomePage from "./pages/HomePage";
// import RegistrationPage from "./pages/RegistrationPage";
// import LoginPage from "./pages/LoginPage";
// import ContactsPage from "./pages/ContactsPage";
// import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
// import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute";

// export default function AppRoutes() {
//   return (
//     <Routes>
//       <Route path="/" element={<Layout />}>
//         <Route index element={<HomePage />} />
//         <Route
//           path="register"
//           element={<RestrictedRoute component={<RegistrationPage />} />}
//         />
//         <Route
//           path="login"
//           element={<RestrictedRoute component={<LoginPage />} />}
//         />
//         <Route
//           path="contacts"
//           element={<PrivateRoute component={<ContactsPage />} />}
//         />
//         <Route path="*" element={<HomePage />} />
//       </Route>
//     </Routes>
//   );
// }
