/* ---------------------------------- React --------------------------------- */
import { useContext, useEffect, useState } from "react";

/* --------------------------------- Router --------------------------------- */
import { useNavigate, useParams } from "react-router-dom";

/* ------------------------- React Hook Form && Yup ------------------------- */
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";

/* -------------------------------- Context ------------------------------- */
import { Auth } from "../utils/Auth";

const EditProduct = () => {
  /* ------------------------------- Local State ------------------------------ */
  const [preview, setPreview] = useState("");
  const [data, setData] = useState([]);

  /* --------------------------------- Params --------------------------------- */
  const { productId } = useParams();

  /* --------------------------------- Context -------------------------------- */
  const { cart, setCart } = useContext(Auth);

  /* -------------------------------- Navigate -------------------------------- */
  const navigate = useNavigate();

  /* -------------------------------- Get Data -------------------------------- */
  useEffect(() => {
    const getData = () => {
      cart.find((item) => item.id === productId && setData(item));
    };
    getData();
  }, [cart, productId]);
  
  /* --------------------------------- Schema --------------------------------- */
  const ProductSchema = object({
    name: string().required().trim(),
    details: string().required().trim(),
    price: string().required().trim(),
  });

  /* --------------------------- // React Hook Form --------------------------- */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ProductSchema),
    values: {
      name: data.name,
      details: data.details,
      price: data.price,
    },
  });

  /* ------------------------------ Select Image ------------------------------ */
  const handleImg = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setPreview(reader.result);
    };
    reader.onerror = function (error) {
      console.log(error);
    };
  };

  /* --------------------------- Edit Product --------------------------- */
  const onSubmit = (data) => {
    const updatedCart = cart.map((item) => {
      if (item.id === productId) {
        return {
          ...item,
          id: productId,
          name: data.name,
          details: data.details,
          price: data.price,
          productImage: preview || item.productImage,
        };
      }
      return item;
    });

    setCart(updatedCart);
    navigate("/all-product");
  };

  return (
    <section className="edit-product">
      <div className="container">
        <div className="row">
          <form
            data-aos="fade-up"
            data-aos-duration="900"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                className="inp"
                defaultValue={data.name}
                {...register("name")}
              />
              {errors.name && (
                <div className="error-message">{errors.name.message}</div>
              )}
            </div>
            <div className="form-group">
              <label>Detail</label>
              <textarea
                name="details"
                rows="5"
                cols="33"
                className="inp"
                defaultValue={data.details}
                {...register("details")}
              ></textarea>
              {errors.details && (
                <div className="error-message">{errors.details.message}</div>
              )}
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                type="text"
                name="price"
                className="inp"
                defaultValue={data.price}
                {...register("price")}
              />
              {errors.price && (
                <div className="error-message">{errors.price.message}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="profileImage">Upload image</label>
              <input
                type="file"
                name="profileImage"
                className="inp"
                onChange={handleImg}
              />
              {preview ? (
                <div className="previewImage">
                  <img src={preview} alt="old_img" />
                </div>
              ) : (
                <div className="previewImage">
                  <img src={data.productImage} alt="new_img" />
                </div>
              )}
            </div>
            <button type="submit" className="btn">
              SEND MESSAGE
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditProduct;
