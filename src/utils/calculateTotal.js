export default (products, discount = 0) => {
  const sumWihoutDiscount = products
    .reduce((sum, { qty, price }) => sum + (price * qty), 0);
  const multiplier = (100 - discount) / 100;
  return (sumWihoutDiscount * multiplier).toFixed(2);
};
