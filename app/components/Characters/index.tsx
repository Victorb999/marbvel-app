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
      className="p-2 mb-4 rounded-sm outline-none bg-neutral-800"
      placeholder="Type a name caracter" 
      onChange={(e) => handlerCharacter(e)}/>

      <div className="flex min-h-screen flex-row flex-wrap gap-4 justify-center items-center">
        {data?.total === 0 ? (
          <div data-testid="noFoudError" className="flex justify-center items-center text-gray-100 font-bold text-md">No characters found</div>
        ) :
        data?.results.map(character => {
          return (
            <div key={character.id} className="bg-neutral-800 flex justify-center items-center flex-col w-32 rounded-md">
              <Image
                className="rounded-t-md"
                src={`${character.thumbnail.path}/portrait_xlarge.${character.thumbnail.extension}`}
                alt={character.name} width={150} height={225}/>
              <div className="flex justify-center items-center h-10">
                <h1 className="text-gray-100 font-bold text-xs">{character.name}</h1>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Characters