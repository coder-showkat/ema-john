import { getShoppingCart } from "../assets/utilities/fakedb";

const loaderData = async () => {
  const localStorageData = getShoppingCart();
  const res = await fetch("https://ema-john-server-gn7b.onrender.com/api/products", {
    method: "POST",
    headers: {
      "content-type": "Application/json"
    },
    body: JSON.stringify(Object.keys(localStorageData)),
  });
  const data = await res.json();
  const addedProducts = data.map(item=> {
    item.quantity = localStorageData[item._id];
    return item;
  })
  return {addedProducts};
};

export default loaderData;
