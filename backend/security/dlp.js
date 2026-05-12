const maskSensitiveData = (text) => {

  // phone numbers
  text = text.replace(
    /\b\d{10}\b/g,
    "[PHONE_REDACTED]"
  );

  // emails
  text = text.replace(
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
    "[EMAIL_REDACTED]"
  );

  // Aadhaar
  text = text.replace(
    /\b\d{12}\b/g,
    "[AADHAAR_REDACTED]"
  );

  // credit card
  text = text.replace(
    /\b\d{16}\b/g,
    "[CARD_REDACTED]"
  );

  return text;
};

module.exports = maskSensitiveData;