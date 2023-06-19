export interface Thumbnail {
  path: string
  extension: string
}
export interface Item {
  resourceURI: string
  name: string
}

export interface Item2 {
  resourceURI: string
  name: string
}
export interface Item3 {
  resourceURI: string
  name: string
  type: string
}
export interface Item4 {
  resourceURI: string
  name: string
}
export interface Comics {
  available: number
  collectionURI: string
  items: Item[]
  returned: number
}

export interface Series {
  available: number
  collectionURI: string
  items: Item2[]
  returned: number
}

export interface Stories {
  available: number
  collectionURI: string
  items: Item3[]
  returned: number
}

export interface Events {
  available: number
  collectionURI: string
  items: Item4[]
  returned: number
}

export interface Url {
  type: string
  url: string
}
export interface CharacterResult {
  id: number
  name: string
  description: string
  modified: string
  thumbnail: Thumbnail
  resourceURI: string
  comics: Comics
  series: Series
  stories: Stories
  events: Events
  urls: Url[]
}

export interface CharacterData {
  offset: number
  limit: number
  total: number
  count: number
  results: CharacterResult[]
}
export interface Character {
  code: number
  status: string
  copyright: string
  attributionText: string
  attributionHTML: string
  etag: string
  data: CharacterData
}
