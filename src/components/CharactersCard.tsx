// components/CharactersCard.tsx

import { CharacterCardProps } from "./types";

const CharactersCard = ({ characters }: CharacterCardProps) => (
  <div>
    <h1>Rick and Morty Characters</h1>
    <ul>
      {characters.map((character) => (
        <li key={character.id}>
          <h2>{character.name}</h2>
          <img src={character.image} alt={character.name} />
        </li>
      ))}
    </ul>
  </div>
);

export default CharactersCard;
