import { Url } from '../common/marvel-api-url.model';
import { Image } from '../common/marvel-api-image.model';
import { ResourceList } from '../common/marvel-api-resource-list.model';
import { Summary } from '../common/marvel-api-summary.model';
import { ComicSummary } from './marvel-api-comic.model';
import { StorySummary } from './marvel-api-stories.model';
import { EventSummary } from './marvel-api-event.model';
import { SeriesSummary } from './marvel-api-serie.model';

export interface Character {
  id?: number;
  name?: string;
  description?: string;
  modified?: Date;
  resourceURI?: string;
  urls?: Url[];
  thumbnail?: Image;
  comics?: ResourceList<ComicSummary>;
  stories?: ResourceList<StorySummary>;
  events?: ResourceList<EventSummary>;
  series?: ResourceList<SeriesSummary>;
}

export interface CharacterSummary extends Summary {
  role?: string;
}
