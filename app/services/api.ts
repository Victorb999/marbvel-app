import axios from 'axios'
import md5 from 'md5'
import { CharacterData } from './types'

export const api = axios.create({
  baseURL: `https://gateway.marvel.com:443/v1/public/`,
})

const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY
const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY

const paramRequest = () => {
  if (privateKey && publicKey) {
    const ts = new Date().getTime()
    const hash = md5(ts + privateKey + publicKey)
    return `ts=${ts}&apikey=${publicKey}&hash=${hash}`
  }
  return ''
}

const paramName = (name: string) => {
  if (name !== '') return `nameStartsWith=${name}&`
  return ''
}

export const getCharacters = async (
  nameCharacter: string = '',
): Promise<CharacterData> => {
  try {
    const { data } = await api.get(
      `characters?${paramName(nameCharacter)}${paramRequest()}`,
    )
    return data.data
  } catch (error) {
    console.error(error)
    const character = {
      offset: 0,
      limit: 0,
      total: 0,
      count: 0,
      results: [],
    }
    return character
  }
}

export const getCharacter = async (
  idCharacter: number ,
): Promise<CharacterData> => {
  try {
    const { data } = await api.get(
      `characters/${idCharacter}?${paramRequest()}`,
    )
    return data.data
  } catch (error) {
    console.error(error)
    const character = {
      offset: 0,
      limit: 0,
      total: 0,
      count: 0,
      results: [],
    }
    return character
  }
}