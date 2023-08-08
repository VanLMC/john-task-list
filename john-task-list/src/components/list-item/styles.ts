import styled, { css } from 'styled-components';

interface ContainerProps {
  $completed: boolean;
  $collapsed?: boolean;
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
  padding: 5px 24px;
  border: '1px solid lightgrey';
  border-radius: 4;
  ${(props) =>
    props.$completed &&
    css`
      background-color: #bcf3de;
    `}

  ${(props) =>
    props.$collapsed &&
    css`
      border-bottom: 8px solid #c5adc7;
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

export const Button = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  padding: 10px;
  cursor: pointer;
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 80%;
  height: 60px;
  background-color: #c5adc7;
  padding: 5px 24px;
  max-width: 1200px;
`;

export const Input = styled.input`
  width: 100%;
  height: 35px;
  padding: 5px;
  border: none;
  outline: none;
`;
