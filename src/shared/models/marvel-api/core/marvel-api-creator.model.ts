import { ResourceList } from '../common/marvel-api-resource-list.model';
import { Url } from '../common/marvel-api-url.model';
import { Image } from '../common/marvel-api-image.model';
import { Summary } from '../common/marvel-api-summary.model';
import { SeriesSummary } from './marvel-api-serie.model';
import { StorySummary } from './marvel-api-stories.model';
import { ComicSummary } from './marvel-api-comic.model';
import { EventSummary } from './marvel-api-event.model';

export interface Creator {
  id?: number;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  suffix?: string;
  fullName?: string;
  modified?: Date;
  resourceURI?: string;
  urls?: Url[];
  thumbnail?: Image;
  series?: ResourceList<SeriesSummary>;
  stories?: ResourceList<StorySummary>;
  comics?: ResourceList<ComicSummary>;
  events?: ResourceList<EventSummary>;
}

export interface CreatorSummary extends Summary {
  role?: string;
}
