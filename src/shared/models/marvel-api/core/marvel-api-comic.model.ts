import { Price } from '../common/marvel-api-price.model';
import { Summary } from '../common/marvel-api-summary.model';
import { TextObject } from '../common/marvel-api-text-object.model';
import { Url } from '../common/marvel-api-url.model';
import { Image } from '../common/marvel-api-image.model';
import { ResourceList } from '../common/marvel-api-resource-list.model';
import { CreatorSummary } from './marvel-api-creator.model';
import { CharacterSummary } from './marvel-api-character.model';
import { StorySummary } from './marvel-api-stories.model';
import { EventSummary } from './marvel-api-event.model';

export interface Comic {
  id?: number;
  digitalId?: number;
  title?: string;
  issueNumber?: number;
  variantDescription?: string;
  description?: string;
  modified?: Date;
  isbn?: string;
  upc?: string;
  diamondCode?: string;
  ean?: string;
  issn?: string;
  format?: string;
  pageCount?: number;
  textObjects?: TextObject[];
  resourceURI?: string;
  urls?: Url[];
  series?: Summary;
  variants?: Summary[];
  collections?: Summary[];
  collectedIssues?: Summary[];
  dates?: Date[];
  prices?: Price[];
  thumbnail?: Image;
  images?: Image[];
  creators?: ResourceList<CreatorSummary>;
  characters?: ResourceList<CharacterSummary>;
  stories?: ResourceList<StorySummary>;
  events?: ResourceList<EventSummary>;
}

export interface ComicSummary extends Summary {}
