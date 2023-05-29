'use client';
import { getCharacters } from "@/app/services/api"
import { CharacterData } from "@/app/services/types"
import Image from "next/image"
import { useEffect, useState } from "react"

const Characters = (): JSX.Element => {

  const [nameCharacter,setNameCaracter] =  useState('')
  const [data,setData] = useState<CharacterData | undefined>(undefined)

  const handlerCharacter = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue: string = event.target.value;
    if(inputValue.length > 3){
      setNameCaracter(inputValue)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCharacters(nameCharacter);
        setData(data);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [nameCharacter]);
  
  
  return (
    <>
    <input type='text' 
    className="p-2 mb-4 rounded-sm outline-none"
    placeholder="Type a name caracter" 
    onChange={(e) => handlerCharacter(e)}/>

    <div className="flex min-h-screen flex-row flex-wrap gap-2">
      {data?.results.map(character => {
        return (
          <div key={character.id} className="flex justify-center items-center flex-col w-48 rounded-md p-2">
            <h1 className="text-gray-900 font-bold text-xs mb-2">{character.name}</h1>
            <Image
              className="rounded-md"
              src={`${character.thumbnail.path}/portrait_xlarge.${character.thumbnail.extension}`}
              alt={character.name} width={150} height={225} />
          </div>
        )
      })}
    </div></>
  )
}

export default Characters