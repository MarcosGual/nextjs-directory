import React from "react";
import { client } from "@/sanity/lib/client";
import { GAMES_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import GameCard, { GameCardType } from "@/components/GameCard";

const UserGames = async ({ id }: { id: string }) => {
  const games = await client.fetch(GAMES_BY_AUTHOR_QUERY, { id });

  return (
    <>
      {games.length > 0 ? (
        games.map((game: GameCardType) => (
          <GameCard key={game._id} post={game} />
        ))
      ) : (
        <p className="no-result">Todavía no cargó ningún juego...</p>
      )}
    </>
  );
};
export default UserGames;
