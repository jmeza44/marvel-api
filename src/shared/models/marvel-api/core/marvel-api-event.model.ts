import { ResourceList } from '../common/marvel-api-resource-list.model';
import { Summary } from '../common/marvel-api-summary.model';
import { Url } from '../common/marvel-api-url.model';
import { Image } from '../common/marvel-api-image.model';
import { ComicSummary } from './marvel-api-comic.model';
import { StorySummary } from './marvel-api-stories.model';
import { SeriesSummary } from './marvel-api-serie.model';
import { CharacterSummary } from './marvel-api-character.model';
import { CreatorSummary } from './marvel-api-creator.model';

export interface Event {
  id?: number;
  title?: string;
  description?: string;
  resourceURI?: string;
  urls?: Url[];
  modified?: Date;
  start?: Date;
  end?: Date;
  thumbnail?: Image;
  comics?: ResourceList<ComicSummary>;
  stories?: ResourceList<StorySummary>;
  series?: ResourceList<SeriesSummary>;
  characters?: ResourceList<CharacterSummary>;
  creators?: ResourceList<CreatorSummary>;
  next?: Summary;
  previous?: Summary;
}

export interface EventSummary extends Summary {}
