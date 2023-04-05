import { getShoppingCart } from "../assets/utilities/fakedb";

const loaderData = async () => {
  const res = await fetch("products.json");
  const products = await res.json();
  const localStorageData = getShoppingCart();
  const addedProducts = [];
  for (const key in localStorageData) {
    const item = products.find(product=>product.id === key);
    item.quantity = localStorageData[key];
    addedProducts.push(item);
  }
  return {products, addedProducts};
};

export default loaderData;
