/**
 * Calculate rental price based on start and end dates
 * @param {Date} startDate - Rental start date
 * @param {Date} endDate - Rental end date
 * @param {Object} pricing - Product pricing object with daily, weekly, weekend rates
 * @returns {Object} Calculation result with total price, days, and breakdown
 */
export function calculateRentalPrice(startDate, endDate, pricing) {
  if (!startDate || !endDate || !pricing) {
    return null;
  }

  // Ensure dates are valid
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Reset time to start of day for accurate calculation
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  if (end < start) {
    return null;
  }

  // Calculate number of days (inclusive)
  const timeDiff = end.getTime() - start.getTime();
  const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end day

  let totalPrice = 0;
  let breakdown = [];

  // Calculate full weeks
  const fullWeeks = Math.floor(days / 7);
  const remainingDays = days % 7;

  // Apply weekly rate if available and beneficial
  if (fullWeeks > 0 && pricing.weekly) {
    const weeklyTotal = fullWeeks * pricing.weekly;
    totalPrice += weeklyTotal;
    breakdown.push({
      type: 'weekly',
      count: fullWeeks,
      rate: pricing.weekly,
      total: weeklyTotal
    });
  }

  // Apply daily rate for remaining days
  if (remainingDays > 0) {
    const dailyTotal = remainingDays * pricing.daily;
    totalPrice += dailyTotal;
    breakdown.push({
      type: 'daily',
      count: remainingDays,
      rate: pricing.daily,
      total: dailyTotal
    });
  }

  // If no weeks, just use daily rate
  if (fullWeeks === 0) {
    totalPrice = days * pricing.daily;
    breakdown = [{
      type: 'daily',
      count: days,
      rate: pricing.daily,
      total: totalPrice
    }];
  }

  return {
    days,
    totalPrice,
    breakdown,
    startDate: start,
    endDate: end
  };
}

/**
 * Get minimum date for rental (today)
 * @returns {string} Date string in YYYY-MM-DD format
 */
export function getMinRentalDate() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

/**
 * Format date for display
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date string
 */
export function formatRentalDate(date) {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-GB', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}
