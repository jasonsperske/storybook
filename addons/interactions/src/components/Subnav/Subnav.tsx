import React from 'react';
import {
  Button,
  IconButton,
  Icons,
  Separator,
  P,
  TooltipNote,
  WithTooltip,
  Bar,
} from '@storybook/components';
import { Call, CallStates, ControlStates } from '@storybook/instrumenter';
import { styled } from '@storybook/theming';

import { StatusBadge } from '../StatusBadge/StatusBadge';
import { Controls } from '../../Panel';

const StyledSubnav = styled.nav(({ theme }) => ({
  background: theme.background.app,
  borderBottom: `1px solid ${theme.appBorderColor}`,
  height: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingLeft: 15,
  position: 'sticky',
  top: 0,
  zIndex: 1,
}));

export interface SubnavProps {
  controls: Controls;
  controlStates: ControlStates;
  status: Call['status'];
  storyFileName?: string;
  onScrollToEnd?: () => void;
}

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 4,
  padding: 6,
  color: theme.textMutedColor,
  '&:not(:disabled)': {
    '&:hover,&:focus-visible': {
      color: theme.color.secondary,
    },
  },
}));

const Note = styled(TooltipNote)(({ theme }) => ({
  fontFamily: theme.typography.fonts.base,
}));

export const StyledIconButton = styled(IconButton as any)(({ theme }) => ({
  color: theme.color.mediumdark,
  margin: '0 3px',
}));

const StyledSeparator = styled(Separator)({
  marginTop: 0,
});

const StyledLocation = styled(P)(({ theme }) => ({
  color: theme.textMutedColor,
  justifyContent: 'flex-end',
  textAlign: 'right',
  marginTop: 'auto',
  marginBottom: 1,
  paddingRight: 15,
  fontSize: 13,
}));

const Group = styled.div({
  display: 'flex',
  alignItems: 'center',
});

const RewindButton = styled(StyledIconButton)({
  marginLeft: 9,
});

const JumpToEndButton = styled(StyledButton)({
  marginLeft: 9,
  marginRight: 9,
  marginBottom: 1,
  lineHeight: '12px',
});

const withTooltipModifiers = [
  {
    name: 'preventOverflow',
    options: {
      padding: 0,
    },
  },
  {
    name: 'offset',
    options: {
      offset: [0, -2],
    },
  },
];

export const Subnav: React.FC<SubnavProps> = ({
  controls,
  status,
  storyFileName,
  onScrollToEnd,
}) => {
  const buttonText = status === CallStates.ERROR ? 'Scroll to error' : 'Scroll to end';

  return (
    <Bar>
      <StyledSubnav>
        <Group>
          <StatusBadge status={status} />

          <JumpToEndButton onClick={onScrollToEnd} disabled={!onScrollToEnd}>
            {buttonText}
          </JumpToEndButton>

          <StyledSeparator />

          <WithTooltip
            modifiers={withTooltipModifiers}
            hasChrome={false}
            trigger={controls.start ? 'hover' : 'none'}
            tooltip={<Note note="Go to start" />}
          >
            <RewindButton onClick={controls.start} disabled={!controls.start}>
              <Icons icon="rewind" />
            </RewindButton>
          </WithTooltip>

          <WithTooltip
            modifiers={withTooltipModifiers}
            hasChrome={false}
            trigger={controls.back ? 'hover' : 'none'}
            tooltip={<Note note="Go back" />}
          >
            <StyledIconButton onClick={controls.back} disabled={!controls.back}>
              <Icons icon="playback" />
            </StyledIconButton>
          </WithTooltip>

          <WithTooltip
            modifiers={withTooltipModifiers}
            hasChrome={false}
            trigger={controls.next ? 'hover' : 'none'}
            tooltip={<Note note="Go forward" />}
          >
            <StyledIconButton onClick={controls.next} disabled={!controls.next}>
              <Icons icon="playnext" />
            </StyledIconButton>
          </WithTooltip>

          <WithTooltip
            modifiers={withTooltipModifiers}
            trigger={controls.end ? 'hover' : 'none'}
            hasChrome={false}
            tooltip={<Note note="Go to end" />}
          >
            <StyledIconButton onClick={controls.end} disabled={!controls.end}>
              <Icons icon="fastforward" />
            </StyledIconButton>
          </WithTooltip>
        </Group>
        {storyFileName && (
          <Group>
            <StyledLocation>{storyFileName}</StyledLocation>
          </Group>
        )}
      </StyledSubnav>
    </Bar>
  );
};
