import { getCharacter } from "../services/api"
import Image from 'next/image'

interface PageProps {
  params: { slug: number }
}

export default async function Page({ params }: PageProps) {


  const { results } = await getCharacter(params.slug)

  return (
    <div className="flex justify-center p-10 w-8/12 relative">
      <Image
        className="rounded-t-md"
        src={`${results[0].thumbnail.path}/portrait_xlarge.${results[0].thumbnail.extension}`}
        alt={results[0].name}
        width={150}
        height={225}
      />
      <div className="flex p-10 flex-col">
        <h1
          className="text-gray-100 font-bold text-md"
        > {results[0].name}</h1>
        <p>{results[0].description}</p>
      </div>
      <a href="/" className="absolute bottom-0 text-cyan-500 hover:text-cyan-900">voltar</a>
    </div>
  )
}