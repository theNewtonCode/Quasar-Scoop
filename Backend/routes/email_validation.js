function isValidRenownedEmail(email) {
    // Define the regular expression for a valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // List of renowned email domains
    const renownedDomains = [
      "gmail.com",
      "yahoo.com",
      "outlook.com",
      "hotmail.com",
      "icloud.com",
      // Add other renowned domains as needed
    ];
  
    // First check if the email format is valid
    if (!emailRegex.test(email)) {
      return false;
    }
  
    // Extract the domain from the email
    const domain = email.split('@')[1];
  
    // Check if the domain is in the list of renowned domains
    return renownedDomains.includes(domain);
  }
  
  // const email = "example@gmail.com";
  // console.log(isValidRenownedEmail(email)); // true or false
  module.exports = isValidRenownedEmail;