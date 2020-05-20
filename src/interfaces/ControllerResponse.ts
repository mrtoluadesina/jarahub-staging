export default interface Response {
  statusCode: number;
  message: String;
  error?: String|null;
  payload?: Object|null;
  token?: String|null;
}
