export const formatPrice = (price?: number): string => {
  return price?.toFixed(2) || "0.00";
};
