import { useState } from 'react';
import styled from 'styled-components';
import { LogIn } from './components/user';
import { ToDo } from './components/todo';

const Container = styled.div`
  font-family: Roboto, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  margin: 24px 0px;
  padding: 8px 16px;
  width: 600px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
`;

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.token);

  return (
    <Container className="App">
      <Content>
        {isLoggedIn ? (
          <ToDo onLogOut={setIsLoggedIn} />
        ) : (
          <LogIn onLogin={setIsLoggedIn} />
        )}
      </Content>
    </Container>
  );
};

export default App;
