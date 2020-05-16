export function removeSlashIfExists(str) {
  return str.startsWith("/") ? str.slice(1) : str;
}
