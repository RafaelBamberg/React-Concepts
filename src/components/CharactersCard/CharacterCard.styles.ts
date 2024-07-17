import styled from "styled-components";

export const ListStyled = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 50px;
  max-width: fit-content;
  margin-left: auto;
  margin-right: auto;
`;

export const CounterWrapperStyled = styled.div`
  position: sticky;
  top: 0;
  max-width: fit-content;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  background-color: white;
  z-index: 1000;
  padding: 10px;
  border: 1px solid black;
`;
