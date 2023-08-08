import styled from 'styled-components';

export const Container = styled.div`
  background-color: #fed7b8;
  height: 100vh;
  width: 100%;
  padding: 20px 0;
  text-align: center;
  h1 {
    padding: 10px;
    font-size: 20px;
    user-select: none;
    color: #5e4760;
  }

  position: relative;
  overflow: hidden;
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  max-width: 1200px;
`;

export const Input = styled.input`
  width: 80%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  margin-bottom: 10px;
  outline: none;
`;
