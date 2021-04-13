// get input value
var getValue = function(eID) {
  return parseInt(document.getElementById(eID).value);
}

// get checkbox value
var getCheckboxValue = function(eID) {
  return document.getElementById(eID).checked;
}

// return number of selected criteria
var getNumberOfCriteria = function() {
  var uppercaseConfirm = getCheckboxValue("uppercaseConfirm");
  var lowercaseConfirm = getCheckboxValue("lowercaseConfirm");
  var numericConfirm = getCheckboxValue("numericConfirm");
  var specialCharacterConfirm = getCheckboxValue("specialCharacterConfirm");
  var n = 0;

  if (uppercaseConfirm) { n++; }
  if (lowercaseConfirm) { n++; }
  if (numericConfirm) { n++; }
  if (specialCharacterConfirm) { n++; }

  return n;
}

// ask the user to input a minimum (>= numberOfCriteria) and maximum length
// return password length between min and max (both included)
var getPasswordLength = function() {
  var minValue = getValue("minLength");
  var maxValue = getValue("maxLength");
  var numberOfCriteria = getNumberOfCriteria();
  var passwordLength = 0;

  // no input
  if (!minValue || !maxValue) {
    document.getElementById("errorMessage").innerHTML +=
    "<p>Input min/max length.</p>";
    return;
  }

  if (minValue < numberOfCriteria) {
    console.log("min < nCriteria");
    document.getElementById("errorMessage").innerHTML +=
    "<p>Minimum length must be greater than or equal to " + numberOfCriteria + ".</p>";
    return;
  }

  if (maxValue < minValue) {
    document.getElementById("errorMessage").innerHTML +=
    "<p>Maximum length must be greater than or equal to " + minValue + ".</p>";
    return;
  }

  passwordLength = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
  return passwordLength;
}

// return random index which doesn't exist in existIndex array
var getRandomIndex = function(passwordLength, existIndex) {
  var index = Math.floor(Math.random() * passwordLength);
  while (existIndex.includes(index)) {
    index = Math.floor(Math.random() * passwordLength);
  }
  return index;
}

// ask the user to select at least one criteria and
// return random password array
var getRandomPasswordArray = function(passwordLength) {
  var uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var lowercase = "abcdefghijklmnopqrstuvwxyz";
  var numeric = "0123456789";
  var specialCharacter = "!\"#$%&\'()*,-./:;<=>?@[]\\^_`{|}~"; //omit SPACE
  var allChars = "";
  var randomPasswordArray = Array(passwordLength);
  var existIndex = [];

  // ask the user to select the criteria
  var uppercaseConfirm = getCheckboxValue("uppercaseConfirm");
  var lowercaseConfirm = getCheckboxValue("lowercaseConfirm");
  var numericConfirm = getCheckboxValue("numericConfirm");
  var specialCharacterConfirm = getCheckboxValue("specialCharacterConfirm");

  // no criteria was selected -> need to select at least one criteria
  if (!uppercaseConfirm && !lowercaseConfirm && !numericConfirm && !specialCharacterConfirm) {
    document.getElementById("errorMessage").innerHTML += "<p>Must select at least one criteria.</p>";
    return;
  }

  // at least one criteria was selected
  if (uppercaseConfirm) {
    var randomIndex = getRandomIndex(passwordLength, existIndex);
    existIndex.push(randomIndex);
    randomPasswordArray[randomIndex] = uppercase;
    allChars += uppercase;
  }
  if (lowercaseConfirm) {
    var randomIndex = getRandomIndex(passwordLength, existIndex);
    existIndex.push(randomIndex);
    randomPasswordArray[randomIndex] = lowercase;
    allChars += lowercase;
  }
  if (numericConfirm) {
    var randomIndex = getRandomIndex(passwordLength, existIndex);
    existIndex.push(randomIndex);
    randomPasswordArray[randomIndex] = numeric;
    allChars += numeric;
  }
  if (specialCharacterConfirm) {
    var randomIndex = getRandomIndex(passwordLength, existIndex);
    existIndex.push(randomIndex);
    randomPasswordArray[randomIndex] = specialCharacter;
    allChars += specialCharacter;
  }

  // fill the rest of the array
  for (var i = 0; i < passwordLength; i++) {
    if (!existIndex.includes(i)) {
      randomPasswordArray[i] = allChars;
    }
  }

  return randomPasswordArray;
}

// return the generated password based on input length and selected criteria
var generatePassword = function() {

  // password length
  var passwordLength = getPasswordLength();
  if (!passwordLength) {
    return;
  } else { // no error, show the lenght of the password
    document.getElementById("info").innerHTML +=
    "<p>Password length is " + passwordLength + ".</p>";
  }

  // get random password array
  var randomPasswordArray = getRandomPasswordArray(passwordLength);
  if (!randomPasswordArray) {
    return;
  }

  // generate password
  var password = "";
  for (var i = 0; i < passwordLength; i++) {
    password += randomPasswordArray[i].charAt(Math.floor(Math.random() * randomPasswordArray[i].length));
  }

  return password;
}

// Get references to the #generate element
var generateBtn = document.getElementById("generate");

// Write password to the #password input
function writePassword() {

  // clear error message and info
  document.getElementById("errorMessage").innerHTML = "";
  document.getElementById("info").innerHTML = "";

  // generate password and write it out
  var password = generatePassword();

  var passwordText = document.getElementById("password");

  // if no error -> output the password
  if (!document.getElementById("errorMessage").innerHTML) {
    passwordText.value = password;
  } else {
    passwordText.value = "";
  }
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
