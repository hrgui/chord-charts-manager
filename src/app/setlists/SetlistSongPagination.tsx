import * as React from "react";
import { Button, IconButton } from "@material-ui/core";
import styled from "styled-components";
import { WithWidth } from "lib/layout/WithWidth";
import classnames from "classnames";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

interface SetlistSongPaginationProps {
  currentIndex;
  length;
  onChange?;
  classes?;
}

const Container = styled.div`
  height: 36px;
  display: flex;
  align-items: center;

  .pageNumbers-xs {
    max-width: 160px;
    overflow-x: scroll;
    display: flex;
    flex-wrap: nowrap;
  }
`;

const StyledButton = styled(Button)`
  min-width: auto;
`;

export const SetlistSongPagination = (props: SetlistSongPaginationProps) => {
  const { currentIndex, length, onChange } = props;
  const buttonsHolder = React.useRef(null);

  React.useEffect(() => {
    const buttonsHolderEl: any = buttonsHolder.current;
    const buttonToScrollTo: any =
      buttonsHolderEl &&
      buttonsHolderEl.querySelector(`.song-pgn-${currentIndex}`);

    if (buttonToScrollTo && buttonToScrollTo.scrollIntoView) {
      buttonToScrollTo.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentIndex, length]);

  function handleChange(index) {
    onChange(index);
  }

  const buttons = Array.from(new Array(length)).map((_, index) => (
    <StyledButton
      className={`song-pgn-${index}`}
      onClick={e => {
        handleChange(index);
      }}
      key={index}
      variant={currentIndex === index ? "contained" : "text"}
    >
      {index + 1}
    </StyledButton>
  ));

  return (
    <WithWidth>
      {({ width }) => {
        return (
          <Container>
            <IconButton
              data-testid="prev"
              onClick={_ => handleChange(currentIndex - 1)}
            >
              <NavigateBeforeIcon />
            </IconButton>
            <div
              ref={buttonsHolder}
              className={classnames(`pageNumbers-${width}`)}
            >
              {buttons}
            </div>
            <IconButton
              data-testid="next"
              onClick={_ => handleChange(currentIndex + 1)}
            >
              <NavigateNextIcon />
            </IconButton>
          </Container>
        );
      }}
    </WithWidth>
  );
};
