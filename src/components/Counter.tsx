// src/components/Counter.tsx
import styled from "@emotion/styled";
import useCounterStore from "../store/useCounterStore";
import Button from "./common/Button";
import { colors } from "../styles/theme";

const CounterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  border: 1px solid ${colors.lightGray};
  border-radius: 8px;
  margin: 2rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CounterValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin: 1rem 0;
  color: ${colors.primary};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Counter = () => {
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <CounterContainer>
      <h2>Zustand 상태 관리 예제</h2>
      <CounterValue>{count}</CounterValue>
      <ButtonGroup>
        <Button variant="primary" onClick={decrement}>
          감소
        </Button>
        <Button variant="outline" onClick={reset}>
          초기화
        </Button>
        <Button variant="primary" onClick={increment}>
          증가
        </Button>
      </ButtonGroup>
    </CounterContainer>
  );
};

export default Counter;
