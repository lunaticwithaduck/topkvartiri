import styled from '@emotion/styled';

const Wrapper = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const Canvas = styled.article`
  overflow: auto;
  transform-origin: center;
`;

const S = { Wrapper, Canvas };

export default S;
