import { StatusCodes } from "http-status-codes";

class NotFoundException extends Error {
  constructor(message) {
    super(message);
    this.StatusCodes = StatusCodes.NOT_FOUND;
  }
}
export default NotFoundException;
