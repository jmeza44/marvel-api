import { Summary } from './marvel-api-summary.model';

export interface ResourceList<SummaryType extends Summary> {
  available?: number;
  returned?: number;
  collectionURI?: string;
  items?: Array<SummaryType>;
}
