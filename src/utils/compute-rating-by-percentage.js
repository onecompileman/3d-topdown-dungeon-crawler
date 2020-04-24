export function computeRatingByPercentage(percentage) {
  if (percentage >= 80) {
    return 'A';
  } else if (percentage >= 60 && percentage <= 79) {
    return 'B';
  } else if (percentage >= 40 && percentage <= 59) {
    return 'C';
  } else if (percentage >= 20 && percentage <= 39) {
    return 'D';
  } else {
    return 'E';
  }
}
