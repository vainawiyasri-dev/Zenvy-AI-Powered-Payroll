exports.predictLeave = (daysPresent) => {
  if (typeof daysPresent !== "number") {
    return "Unknown";
  }

  if (daysPresent < 20) return "High Leave Probability";
  return "Low Leave Probability";
};

