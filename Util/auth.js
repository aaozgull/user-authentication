import axios from "axios";

const API_KEY = "AIzaSyAzUyx2zIDy99x2GUFO6Op0ssJxEQxp_j0";

async function authenticate(mode, email, password) {
  try {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
    console.log(url);
    const response = await axios.post(url, {
      email: email,
      password: password,
      returnSecureToken: true,
    });
  } catch (error) {
    console.log(error);
  }

  console.log(response?.data);
  const token = response.data.idToken;
  return token;
}

export function createUser(email, password) {
  return authenticate("signUp", email, password);
}

export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}
