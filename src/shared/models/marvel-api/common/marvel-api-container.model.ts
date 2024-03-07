export interface Container<DataType> {
  offset?: number;
  limit?: number;
  total?: number;
  count?: number;
  results?: Array<DataType>;
}
