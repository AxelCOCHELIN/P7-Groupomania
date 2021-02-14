let required = (propertyType) => {
  return (v) =>
    (v && v.length > 0) || `Vous devez remplir le champ ${propertyType}`;
};
let minLength = (propertyType, minLength) => {
  return (v) =>
    (v && v.length >= minLength) ||
    `${propertyType} doit contenir au moins ${minLength} caractères`;
};
let maxLength = (propertyType, maxLength) => {
  return (v) =>
    (v && v.length <= maxLength) ||
    `${propertyType} doit contenir maximum ${maxLength} caractères`;
};

let emailFormat = () => {
  let regex = /^\w+([.-]?\w+)*@\w+([.-]?\w{2,24})+$/;
  return (v) =>
    (v && regex.test(v)) || "Veuillez entrer une adresse mail valide";
};

let passwordFormat = () => {
  let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
  return (v) =>
    (v && regex.test(v)) ||
    "Votre mot de passe doit comprendre une majuscule, une minuscule et un chiffre minimum";
};

export default {
  required,
  minLength,
  maxLength,
  emailFormat,
  passwordFormat,
};
