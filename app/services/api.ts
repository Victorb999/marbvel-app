import axios from 'axios'
import md5 from 'md5'
import { CharacterData } from './types'

export const api = axios.create({
  baseURL: `https://gateway.marvel.com:443/v1/public/`
})

// ts=1&apikey=1234&hash=ffd275c5130566a2916217b101f26150

const publicKey= '9a1d3109845e069bb29daf53fe012394'
const privateKey = 'fedd87d1241186ecb2858cfdc3597a10b8afad5a'

const paramRequest = () =>{
  const ts = new Date().getTime();
  const hash = md5(ts+privateKey+publicKey)
  return `ts=${ts}&apikey=${publicKey}&hash=${hash}`
}

const paramName = (name:string) =>{
  if(name!== '') return `nameStartsWith=${name}&`
  return ''
}

export const getCharacters = async (nameCharacter : string = ''): Promise<CharacterData> => {
  try {
    
    const {data} = await api.get(
      `characters?${paramName(nameCharacter)}${paramRequest()}`
    )

    return data.data
  } catch (e) {
    console.error(e)
    const character = [] as Array<CharacterData>
    return character
  }
}