import { Image } from '../common/marvel-api-image.model';
import { ResourceList } from '../common/marvel-api-resource-list.model';
import { Summary } from '../common/marvel-api-summary.model';
import { CharacterSummary } from './marvel-api-character.model';
import { ComicSummary } from './marvel-api-comic.model';
import { CreatorSummary } from './marvel-api-creator.model';
import { EventSummary } from './marvel-api-event.model';
import { SeriesSummary } from './marvel-api-serie.model';

export interface Story {
  id: number;
  title: string;
  description: string;
  resourceURI: string;
  type: string;
  modified: Date;
  thumbnail: Image;
  comics: ResourceList<ComicSummary>;
  series: ResourceList<SeriesSummary>;
  events: ResourceList<EventSummary>;
  characters: ResourceList<CharacterSummary>;
  creators: ResourceList<CreatorSummary>;
  originalIssue: Summary;
}

export interface StorySummary extends Summary {
  type?: string;
}
