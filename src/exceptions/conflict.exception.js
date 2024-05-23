import { StatusCodes } from "http-status-codes";

class ConflictException extends Error {
  constructor(message) {
    super(message);
    this.StatusCodes = StatusCodes.CONFLICT;
  }
}
export default ConflictException;
