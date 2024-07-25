import { useNavigate } from "react-router-dom";
import * as S from "./Home.styles";

const Home = () => {
  const navigate = useNavigate();
  function handleRedirect() {
    navigate("/characters");
  }

  return (
    <S.Wrapper>
      <button onClick={handleRedirect}>TESTE</button>
    </S.Wrapper>
  );
};

export default Home;
