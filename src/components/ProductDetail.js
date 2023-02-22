import { useEffect, useState } from "react";
import ProductShimmer from "./shimmer/ProductShimmer";
import { useParams } from "react-router-dom";
import { API_URL } from "../../contant";
import { useProductContext } from "../context/productContext";
import ProductContent from "./ProductContent";
import ProductImage from "./ProductImage";
import { useFilterProductContext } from "../context/filterProductContext";

const ProductDetail = () => {
  const params = useParams();
  const { id } = params;
  const { getProduct, isLoading, product } = useProductContext();
  const { filterProduct } = useFilterProductContext();

  console.log("PRODUCTS DETAIL", product);
  console.log("FILTER DETAIL", filterProduct);

  //to load page from top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    id: alias,
    name = "",
    price,
    description,
    stars,
    stock,
    colors,
    reviews,
    image = [{ url: "" }],
  } = product;

  const [mainImg, setMainImg] = useState(image[0].url);
  console.log("COLOR", colors);
  console.log("PRODUCTS", product);

  //Rating stars

  useEffect(() => {
    getProduct(`${API_URL}?id=${id}`);
  }, [ProductImage]);
  return (
    <>
      {isLoading ? (
        <ProductShimmer />
      ) : (
        <div className="pt-28 flex  flex-col sm:px-24 px-8 py-20 justify-between md:flex-row">
          <ProductImage
            mainImg={mainImg}
            setMainImg={setMainImg}
            image={image}
          />
          <ProductContent product={product} />
        </div>
      )}
    </>
  );
};

export default ProductDetail;
