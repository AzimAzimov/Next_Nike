export const getDiscountedPricePersentage = (originalPrice, discountedPrice) => {
  const discount = originalPrice - discountedPrice;
  const discountPersentage = (discount / originalPrice) * 100

  return discountPersentage.toFixed(2)
};