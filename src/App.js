/* -------------------------------- Сonponent ------------------------------- */
import Header from "./components/Header";

/* ---------------------------------- Page ---------------------------------- */
import Home from "./pages/Home";
import EditProduct from "./pages/EditProduct";
import CreateProduct from "./pages/CreateProduct";
import ViewAllProduct from "./pages/ViewAllProduct";

/* --------------------------------- Router --------------------------------- */
import { Route, Routes } from "react-router-dom";

/* --------------------------------- Context -------------------------------- */
import { Validation } from "./utils/Auth";

const App = () => {
  return (
    <Validation>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/all-product" element={<ViewAllProduct />} />
        <Route path="/edit-product/:productId" element={<EditProduct />} />
      </Routes>
    </Validation>
  );
};

export default App;
