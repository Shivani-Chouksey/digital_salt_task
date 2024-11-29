// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route,
//   RouterProvider,
// } from "react-router-dom";

// import RootLayout from "./components/layout/RootLayout";
// import ProductDetail from "./pages/product-detail";
// import Contact from "./pages/contact";
// import About from "./pages/about";
// import Home from "./pages/home";
// import Task from "./pages/task";
// import Crud from "./pages/hooks/crud";
// import CurdPaginated from "./pages/hooks/crud-paginated";
// import Login from "./pages/auth/login";
// import RegistrationPage from "./pages/auth/register";
// import ProtectedLayout from "./components/layout/auth-layout/protected-layout";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<RootLayout />}>
//       <Route index element={<Home />} />
//       <Route path="login" element={<Login />} />
//       <Route path="modular-form" element={<RegistrationPage />} />
//       <Route path="about" element={<About />} />
//       <Route path="redux" element={<Contact />} />
//       <Route path="zustand" element={<Task />} />
//       <Route path="products/:id" element={<ProductDetail />} />
//       <Route path="crud" element={<Crud />} />
//       <Route path="crud-paginated" element={<CurdPaginated />} />


//       {/* Protected Admin Routes */}
//       <Route element={<ProtectedLayout />}>
//         <Route path="crud-paginated" element={<CrudPaginated />} />
//       </Route>
//     </Route>
//   )
// );

// function App() {
//   return <RouterProvider router={router} />;
// }

// export default App;

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import RootLayout from "./components/layout/RootLayout";
import ProductDetail from "./pages/product-detail";
import Contact from "./pages/contact";
import About from "./pages/about";
import Home from "./pages/home";
import Task from "./pages/task";
import Crud from "./pages/hooks/crud";
import CurdPaginated from "./pages/hooks/crud-paginated";
import Login from "./pages/auth/login";
import RegistrationPage from "./pages/auth/register";
import ProtectedLayout from "./components/layout/auth-layout/protected-layout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="modular-form" element={<RegistrationPage />} />
      <Route path="about" element={<About />} />
      <Route path="redux" element={<Contact />} />
      <Route path="zustand" element={<Task />} />
      <Route path="products/:id" element={<ProductDetail />} />
      <Route path="crud" element={<Crud />} />

      {/* Protected Admin Routes */}
      <Route element={<ProtectedLayout />}>
        <Route path="crud-paginated" element={<CurdPaginated />} />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

