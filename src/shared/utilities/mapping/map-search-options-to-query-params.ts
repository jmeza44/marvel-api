import { SearchOptions } from '../../models/marvel-api/common/marvel-api-search-options.model';

export function mapSearchParams(options: SearchOptions): URLSearchParams {
  const searchParams = new URLSearchParams();

  // Map each property of options to URLSearchParams
  for (const key in options) {
    if (options[key as keyof SearchOptions] !== undefined) {
      const value = options[key as keyof SearchOptions];
      if (Array.isArray(value)) {
        // Handle arrays by joining them with commas
        searchParams.append(key, value.join(','));
      } else if (value instanceof Date) {
        // Handle Date objects by converting them to ISO strings
        searchParams.append(key, value.toISOString());
      } else {
        // All other cases handle as strings
        searchParams.append(key, value.toString());
      }
    }
  }

  return searchParams;
}
