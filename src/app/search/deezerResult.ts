

export class DeezerResult {
  id: number;
  readable: boolean;
  title: string;
  title_short: string;
  title_version: string;
  link: string;
  duration: number;
  rank: number;
  explicit_lyrics: boolean;
  preview: string;
  artist: Artist;
  album: Album;
  type: string;
}

export class DeezerResponse {
  data: any[];
  next: string;
  total: number;
}

export class Artist {
  id: number;
  name: string;
  link: string;
  share: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  nb_album: number;
  nb_fan: number;
  radio: boolean;
  tracklist: string;
  type: string;
}

export class Album {
  id: number;
  name: string;
  upc: string;
  link: string;
  share: string;
  cover: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
  cover_xl: string;
  genre_id: number;
  genres: Genres[];
  label: string;
  nb_tracks: number;
  duration: number;
  fans: number;
  rating: number;
  release_date: string;
  record_type: string;
  available: boolean;
  alternative: Album;
  tracklist: string;
  explicit_lyrics: boolean;
  contributors: string[];
  artist: Artist;
  type: string;
}

export class Track {
  id: number;
  readable: boolean;
  title: string;
  title_short: string;
  title_version: string;
  unseen: boolean;
  isrc: string;
  link: string;
  share: string;
  duration: number;
  track_position: number;
  disk_number: number;
  rank: number;
  release_date: string;
  explicit_lyrics: boolean;
  preview: string;
  bpm: number;
  gain: number;
  available_countries: string[];
  alternative: Track;
  contributors: string[];
  artist: Artist;
  album: Album;
  type: string;
}

export class Genres {
  id: number;
  name: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  type: string;
}
