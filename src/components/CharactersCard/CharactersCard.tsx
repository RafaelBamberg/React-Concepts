import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useMemo, useRef } from "react";
import { CounterWrapperStyled, ListStyled } from "./CharacterCard.styles";
import { CharacterCardProps } from "./types";

const CharactersCard = ({ characters }: CharacterCardProps) => {
  const renderCount = useRef(0);
  renderCount.current += 1;

  const characterCards = useMemo(
    () =>
      characters?.map((character) => (
        <li key={character.id}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="340"
                image={character.image}
                alt={character.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {character.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {character.species}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </li>
      )),
    [characters]
  );

  return (
    <div>
      <CounterWrapperStyled>
        Counter: {renderCount.current}
      </CounterWrapperStyled>

      <ListStyled>{characterCards}</ListStyled>
    </div>
  );
};

export default CharactersCard;
