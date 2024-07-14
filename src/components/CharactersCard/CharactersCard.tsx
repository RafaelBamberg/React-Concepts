import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { ListStyled } from "./CharacterCard.styles";
import { CharacterCardProps } from "./types";

const CharactersCard = ({ characters }: CharacterCardProps) => (
  <div>
    <ListStyled>
      {characters?.map((character) => (
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
            <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
            </CardActions>
          </Card>
        </li>
      ))}
    </ListStyled>
  </div>
);

export default CharactersCard;
