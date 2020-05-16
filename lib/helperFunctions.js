"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeSlashIfExists = removeSlashIfExists;

function removeSlashIfExists(str) {
  return str.startsWith("/") ? str.slice(1) : str;
}