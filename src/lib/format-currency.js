/**
 * Format amount in Ghana Cedis
 * @param {number} amount - The amount to format
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

/**
 * Format amount with custom symbol
 * @param {number} amount - The amount to format
 * @returns {string} Formatted currency string with GH₵ symbol
 */
export function formatPrice(amount) {
  return `GH₵ ${amount.toFixed(2)}`;
}
