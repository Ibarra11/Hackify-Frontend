const jwtKey = "hackify-app-jwt";

export const setJwt = (jwt) => {
  localStorage.setItem(jwtKey, jwt);
};

export const getJwt = () => {
  const jwt = localStorage.getItem(jwtKey);

  if (jwt) {
    return jwt;
  } else {
    return null;
  }
};

export const removeJwt = () => {
  localStorage.removeItem(jwtKey);
};
