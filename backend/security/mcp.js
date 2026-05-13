const checkAccess = (role, message) => {

  const sensitiveKeywords = [

    "account",

    "patient",

    "phone",

    "email",

    "financial",

    "bank",

    "confidential",

  ];

  const lowerMessage =
  message.toLowerCase();

  const isSensitive =
  sensitiveKeywords.some(

    keyword =>

    lowerMessage.includes(keyword)

  );

  // ADMIN CAN ACCESS EVERYTHING

  if (role === "admin") {

    return true;

  }

  // GUEST BLOCKED

  if (
    role === "guest" &&
    isSensitive
  ) {

    return false;

  }

  return true;
};

module.exports = checkAccess;