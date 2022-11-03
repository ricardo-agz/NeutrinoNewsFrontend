export default function authHeader() {
  const auth = JSON.parse(localStorage.getItem('auth'));
  if (auth && auth.token) {
    return { 'Authorization': auth.token };
  } else {
    return {};
  }
}