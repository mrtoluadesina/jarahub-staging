export default interface Response {
  statusCode: number;
  message: String;
  error?: String;
  payload?: Object;
  token?: String;
}
