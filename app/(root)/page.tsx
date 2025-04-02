
import { auth } from "@/auth";
import GameCard, { GameCardType } from "@/components/GameCard";
import SearchForm from "@/components/SearchForm";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { GAMES_QUERY } from "@/sanity/lib/queries";

export default async function Home({ searchParams }: {
  searchParams: Promise<{ query?: string }>
}) {
  const query = (await searchParams).query;
  const params = { search: query || null }
  const { data: posts } = await sanityFetch({ query: GAMES_QUERY, params });

  return (
    <>
      <section className="blue_container">
        <h1 className="heading">Explorá tus juegos favoritos,
          y Rankealos</h1>
        <p className="sub-heading !max-w-3wl">¡También podés agregar los juegos de tu infancia y votar por los mejores!</p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Resultados de búsqueda para "${query}"` : "Todos los juegos"}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: GameCardType, index: number) => (
              <GameCard key={index} post={post} />
            ))
          ) : (
            <p className="no-result">No se encontraron juegos...</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  )
}