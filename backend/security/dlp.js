function maskSensitiveData(text) {

  // ACCOUNT NUMBER CONTEXT

  text = text.replace(

    /((account number|bank account)[^0-9]*)(\d+)/gi,

    "$1[ACCOUNT MASKED]"

  );

  // PHONE NUMBER CONTEXT

  text = text.replace(

    /((phone number|mobile number|contact number)[^0-9]*)(\d+)/gi,

    "$1[PHONE MASKED]"

  );

  // STANDALONE ACCOUNT NUMBERS
  // 11-18 digits

  text = text.replace(

    /\b\d{11,18}\b/g,

    "[ACCOUNT MASKED]"

  );

  // STANDALONE PHONE NUMBERS
  // 10 digits

  text = text.replace(

    /\b\d{10}\b/g,

    "[PHONE MASKED]"

  );

  // EMAILS

  text = text.replace(

    /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi,

    "[EMAIL MASKED]"

  );

  return text;
}

module.exports = maskSensitiveData;