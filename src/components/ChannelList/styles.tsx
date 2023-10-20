import styled from '@emotion/styled';

export const CollapseTriangle = styled.div<{ isDown: boolean }>(({ isDown }) => ({
  width: '0',
  height: '0',
  borderLeft: '6px solid transparent',
  borderRight: '6px solid transparent',
  borderTop: '12px solid lightblue',
  transform: isDown ? '' : 'rotate(180deg)',
}));
