import React from "react";
import { client } from "@/sanity/lib/client";
import { GAMES_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import GameCard, { GameTypeCard } from "@/components/GameCard";

const UserGames = async ({ id }: { id: string }) => {
  const games = await client.fetch(GAMES_BY_AUTHOR_QUERY, { id });

  return (
    <>
      {games.length > 0 ? (
        games.map((game: GameTypeCard) => (
          <GameCard key={game._id} post={game} />
        ))
      ) : (
        <p className="no-result">No posts yet</p>
      )}
    </>
  );
};
export default UserGames;
