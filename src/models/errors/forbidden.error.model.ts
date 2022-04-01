class ForbiddenError extends Error {
  constructor(public message: any) {
    super(message);
  }
}

export default ForbiddenError;
