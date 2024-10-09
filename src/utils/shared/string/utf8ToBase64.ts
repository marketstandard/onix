export function utf8ToBase64(str) {
  return btoa(unescape(encodeURIComponent(str)));
}
