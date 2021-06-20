import React from "react";
import ChordChartView from "./ChordChartView";
import Close from "@material-ui/icons/Close";
import classnames from "classnames";
import styled from "styled-components/macro";

interface SongSectionViewProps {
  chordsDisabled?: boolean;
  lyricsDisabled?: boolean;
  overrideKey?: string;
  hide?: boolean;
  songKey?: string;
  section?: any;
  classes?: any;
  onRequestHide?: any;
}

const Section = styled.div`
  overflow: hidden;
`;

const StyledClose = styled(Close)`
  display: none;
  opacity: 1;
`;

const Title = styled.div`
  color: ${({ theme }) => theme.palette.text.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  &:hover {
    & ${StyledClose} {
      display: block;
      opacity: 1;
    }
  }
`;

const SongSectionBody = styled.pre`
  color: ${({ theme }) => theme.palette.text.primary};
  overflow: auto;
  border: none;
  display: block;
`;

export default ({
  chordsDisabled,
  lyricsDisabled,
  overrideKey,
  songKey,
  hide,
  section,
  onRequestHide,
}: SongSectionViewProps) => {
  if (hide) {
    return <span data-testid="sectionview-hidden" />;
  }

  return (
    <Section>
      <Title>
        {section.title && section.title.toUpperCase()}
        <StyledClose data-testid="songsection-close" onClick={onRequestHide} fontSize={"small"} />
      </Title>
      <SongSectionBody className={classnames("print-cc-body")}>
        {section.type !== "tab" && (
          <ChordChartView
            overrideKey={overrideKey}
            songKey={songKey}
            chordsDisabled={chordsDisabled}
            value={section.body}
            lyricsDisabled={lyricsDisabled}
          />
        )}
      </SongSectionBody>
    </Section>
  );
};
