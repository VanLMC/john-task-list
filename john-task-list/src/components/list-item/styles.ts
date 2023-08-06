import styled, {css} from 'styled-components';

interface ContainerProps {
    $completed: boolean,
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 65px;
  background-color: #fff;
  width: 80%;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 2px;
  padding: 8px 24px;
  border: '1px solid lightgrey';
  border-radius: 4;
  ${props =>
    props.$completed &&
    css`
      background-color: #bcf3de;
  `}

  max-height: 3em;
  overflow: hidden;
  user-select: none;
`;

export const ListItemText = styled.p`
  margin: 0 0 0 10px;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;