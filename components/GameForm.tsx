"use client";

import { Input } from "./ui/input";

const GameForm = () => {

  return (
    <form action={() => { }} className="game-form">
      <div>
        <label htmlFor="title" className="game-form_label">Título</label>
        <Input id="title" name="title" className="game-form_input" required placeholder="Game Title"/>
      </div>
    </form>
  );
};

export default GameForm;
