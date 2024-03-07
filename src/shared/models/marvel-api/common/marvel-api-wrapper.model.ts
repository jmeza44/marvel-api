import { Container } from './marvel-api-container.model';

export interface Wrapper<DataType> {
  code?: number;
  status?: string;
  copyright?: string;
  attributionText?: string;
  attributionHTML?: string;
  data?: Container<DataType>;
  etag?: string;
}
