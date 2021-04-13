var numberOfCriteria = 4;

// min/max value for password length
var getMinMax = function(isMin) {
  var minMax = "maximum";
  if (isMin) { minMax = "minimum"; }
  var value = parseInt(window.prompt("Input " + minMax + " length"));
  if (!value) { //incorrect input
    window.alert("Only input a number. Try again.");
    return getMinMax(isMin);
  }
  return value;
}

// ask the user to input a minimum (>= numberOfCriteria) and maximum length
// return password length between min and max (both included)
var getPasswordLength = function() {
  var minValue = 0;
  var maxValue = 0;
  var passwordLength = 0;

  window.alert("Input the length of the password.");
  minValue = getMinMax(true);
  while (minValue < numberOfCriteria) {
    window.alert(
      "Minimum length must be greater than or equal to " + numberOfCriteria + ".\n" +
      "Try again."
    );
    minValue = getMinMax(true);
  }
  console.log(minValue);

  maxValue = getMinMax(false);
  while (maxValue < minValue) {
    window.alert(
      "Maximum length must be greater than or equal to minimum length.\n" +
      "Minimum length is " + minValue + ".\n" +
      "Try again."
      );
    maxValue = getMinMax(false);
  }
  console.log(maxValue);
  passwordLength = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
  console.log(passwordLength);
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
  var uppercaseConfirm = window.confirm("Include uppercase letter?");
  var lowercaseConfirm = window.confirm("Include lowercase letter?");
  var numericConfirm = window.confirm("Include numeric?");
  var specialCharacterConfirm = window.confirm("Include special characters?");

  // no criteria was selected -> need to select at least one criteria
  if (!uppercaseConfirm && !lowercaseConfirm && !numericConfirm && !specialCharacterConfirm) {
    window.alert("Must select at least one criteria.");
    return getRandomPasswordArray(passwordLength);
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

  // general info
  window.alert(
    "Select password criteria:\n\n" +
    "First, you get a prompt to choose the min/max length of the password.\n" +
    "The min value must be greater than or equal to " + numberOfCriteria + ".\n" +
    "The max value must be greater than or equal to min value.\n\n" +
    "Next, you select to include at least one of a series of characters - uppercase, lowercase, numeric, and/or special characters."
    );

  // password length
  var passwordLength = getPasswordLength();

  // get random password array
  var randomPasswordArray = getRandomPasswordArray(passwordLength);

  // generate password
  var password = "";
  for (var i = 0; i < passwordLength; i++) {
    password += randomPasswordArray[i].charAt(Math.floor(Math.random() * randomPasswordArray[i].length));
  }
  return password;
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
