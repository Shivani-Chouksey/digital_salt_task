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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="redux" element={<Contact />} />
      <Route path="zustand" element={<Task />} />
      <Route path="products/:id" element={<ProductDetail />} />
      <Route path="crud" element={<Crud />} />
      <Route path="crud-paginated" element={<CurdPaginated />} />

    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
