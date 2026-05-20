function checkAccess(role, message) {

  // ADMIN + ANALYST ALLOWED

  if (
    role === "admin" ||
    role === "analyst"
  ) {

    return true;

  }

  // GUEST RESTRICTIONS

  const sensitivePatterns = [

    "account number",
    "bank details",
    "credit card",
    "patient diagnosis",
    "salary",
    "medical history",
    "phone number",
    "email",
    "social security",
    "passport number",
    "driver's license",
    "confidential",
    "secret",
    "proprietary",
    "internal use only",
    "money",
    "payment",
    "transaction",  
    "Billing",
    "Invoice",
    "Financial",
    "Address",
    "Location",
    "IP address",
    "Aadhar",
    "PAN",
    "GST",
    "Driving License",
    "Voter ID",
    "Health Insurance",
    "employee ID",
    "customer ID",
    "client ID",
    "contact",
    "passport",
    "visa",
    "work permit",
    "password",
    "ssn",
    "social security number",
    "key",
    "token",
    "credential",
    "secret",
    "confidential",
    "proprietary",
  ];

  const lowerMessage =
  message.toLowerCase();

  for (let pattern of sensitivePatterns) {

    if (lowerMessage.includes(pattern)) {

      return false;

    }

  }

  return true;
}

module.exports = checkAccess;