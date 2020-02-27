const response = (
  statusCode: number,
  message: string,
  payload: object,
  error: any,
  token: string,
) => ({ statusCode, message, payload, error, token });

export default response;
