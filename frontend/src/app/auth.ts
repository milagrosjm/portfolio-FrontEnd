export function isLoggedIn(username : String) {
    return (username === sessionStorage.getItem('username'));
}
