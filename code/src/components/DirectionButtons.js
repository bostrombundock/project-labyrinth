import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import gameplay, { generateNextQuestion } from "reducers/gameplay";

const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const Button = styled.button`
  justify-self: center;
  width: 85px;
  padding: 8px;
  margin: 3px;
  color: black;
  background-color: white;
  border: none;
  font-family: inherit;
  cursor: pointer;
  transition: 0.2s ease-in;

  @media (min-width: 768px) {
    &:enabled:hover {
      color: white;
      background-color: tomato;
    }
  }

  &:disabled {
    color: grey;
    opacity: 0.7;
  }
`;

const DirectionButtons = () => {
  const availableMoves = useSelector((state) =>
    state.gameplay.question.actions?.map((item) => item.direction)
  );
  const dispatch = useDispatch();

  const direction = {
    north: "North",
    west: "West",
    east: "East",
    south: "South",
  };

  const handleOnClick = (direction) => {
    dispatch(generateNextQuestion(direction));
    dispatch(gameplay.actions.setMove(direction));
  };

  return (
    <>
      <p>Where do you want to go?</p>
      <Container>
        <Button
          type="button"
          value={direction.north}
          onClick={(event) => handleOnClick(event.target.value)}
          disabled={!availableMoves?.includes(direction.north)}
        >
          {direction.north}
        </Button>
        <div>
          <Button
            type="button"
            value={direction.west}
            onClick={(event) => handleOnClick(event.target.value)}
            disabled={!availableMoves?.includes(direction.west)}
          >
            {direction.west}
          </Button>{" "}
          <Button
            type="button"
            value={direction.east}
            onClick={(event) => handleOnClick(event.target.value)}
            disabled={!availableMoves?.includes(direction.east)}
          >
            {direction.east}
          </Button>
        </div>
        <Button
          type="button"
          value={direction.south}
          onClick={(event) => handleOnClick(event.target.value)}
          disabled={!availableMoves?.includes(direction.south)}
        >
          {direction.south}
        </Button>
      </Container>
    </>
  );
};

export default DirectionButtons;
