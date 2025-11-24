import ERROR from './constants/error.js';

class CustomError extends Error {
  constructor(message, name) {
    super(`${ERROR.ERROR} ${message}`);
    this.name = name;
  }

  static date(message) {
    return new CustomError(message, ERROR.name.DATE);
  }

  static menu(message) {
    return new CustomError(message, ERROR.name.MENU);
  }
}
export default CustomError;
