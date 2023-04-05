import React from "react";

const OrderSummary = ({ addedCarts }) => {
  const selected_items = addedCarts
    .map((item) => item.quantity)
    .reduce((a, b) => a + b, 0);

  const total_price = addedCarts
    .map((item) => item.price * item.quantity)
    .reduce((a, b) => a + b, 0);

  const total_shipping = addedCarts
    .map((item) => item.shipping * item.quantity)
    .reduce((a, b) => a + b, 0);

  const total_tax = parseFloat((total_price / 10).toFixed(2));

  const grandTotal = parseFloat(
    (total_price + total_shipping + total_tax).toFixed(2)
  );

  return (
    <div>
      <p>Selected Items: {selected_items}</p>
      <p>Total Price: ${total_price}</p>
      <p>Total Shipping Charge: ${total_shipping}</p>
      <p>Tax: ${total_tax}</p>
      <h4>Grand Total: ${grandTotal}</h4>
    </div>
  );
};

export default OrderSummary;
