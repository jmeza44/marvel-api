import { ResourceList } from '../common/marvel-api-resource-list.model';
import { Summary } from '../common/marvel-api-summary.model';
import { Image } from '../common/marvel-api-image.model';
import { Url } from '../common/marvel-api-url.model';
import { ComicSummary } from './marvel-api-comic.model';
import { StorySummary } from './marvel-api-stories.model';
import { EventSummary } from './marvel-api-event.model';
import { CharacterSummary } from './marvel-api-character.model';
import { CreatorSummary } from './marvel-api-creator.model';

export interface Serie {
  id?: number;
  title?: string;
  description?: string;
  resourceURI?: string;
  urls?: Url[];
  startYear?: number;
  endYear?: number;
  rating?: string;
  modified?: Date;
  thumbnail?: Image;
  comics?: ResourceList<ComicSummary>;
  stories?: ResourceList<StorySummary>;
  events?: ResourceList<EventSummary>;
  characters?: ResourceList<CharacterSummary>;
  creators?: ResourceList<CreatorSummary>;
  next?: Summary;
  previous?: Summary;
}

export interface SeriesSummary extends Summary {}
