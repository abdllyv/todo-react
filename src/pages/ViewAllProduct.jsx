/* ---------------------------------- React --------------------------------- */
import { useContext } from "react";

/* --------------------------------- Router --------------------------------- */
import { Link } from "react-router-dom";

/* ---------------------------------- Icons --------------------------------- */
import { FaTrash, FaEdit } from "react-icons/fa";

/* -------------------------------- Component ------------------------------- */
import { createRemoveAlert } from "../utils/SweetAlert";

/* --------------------------------- Context -------------------------------- */
import { Auth } from "../utils/Auth";

const ViewAllProduct = () => {
  /* --------------------------------- Context -------------------------------- */
  const { cart, setCart } = useContext(Auth);

  /* ----------------------------- Remove Product ----------------------------- */
  const removeData = (dataId) => {
    createRemoveAlert(
      "Remove Item",
      "Are you sure you want to remove this item from your cart?",
      "Yes, Remove",
      () => {
        const updatedCart = cart.filter((item) => item.id !== dataId);
        setCart(updatedCart);
      }
    );
  };

  return (
    <section className="allCars">
      <div className="container">
        <div className="row">
          <h2 className="title">All Product List</h2>
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Product Image</th>
                <th>Car Name</th>
                <th>Product Details</th>
                <th>Product Price</th>
                <th>Edit Product</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td className="productImg">
                    <img src={item.productImage} alt={item.name} />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.details}</td>
                  <td>${item.price}</td>
                  <td className="edit">
                    <Link to={`/edit-product/${item.id}`}>
                      <FaEdit />
                    </Link>
                  </td>
                  <td className="edit">
                    <FaTrash onClick={() => removeData(item.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ViewAllProduct;
