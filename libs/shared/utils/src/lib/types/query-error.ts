export enum QueryErrorType {
  HTTP_NOT_FOUND,
  HTTP_OTHER,
  OTHER, // other than such with !response.ok, like network
}

export class QueryError extends Error {
  constructor(
    message: string,
    public type: QueryErrorType,
    public status: number
  ) {
    super(message);
  }
}
