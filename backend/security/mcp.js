const checkAccess = (role, message) => {

  const sensitiveKeywords = [
    "phone",
    "aadhaar",
    "credit card",
    "password",
    "patient",
  ];

  const isSensitive = sensitiveKeywords.some(
    (word) =>
      message.toLowerCase().includes(word)
  );

  // guest blocked
  if (role === "guest" && isSensitive) {
    return false;
  }

  return true;
};

module.exports = checkAccess;