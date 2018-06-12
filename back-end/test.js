function capitolizeFirstLetter(inputString){
  let formattedString = inputString.charAt(0).toUpperCase() + inputString.substr(1);
  return formattedString;
}



console.log(capitolizeFirstLetter('toronto'));