import styled from 'styled-components';

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px 0;
`;

export const Label = styled.label`
  margin: 4px 0;
`;

export const Input = styled.input`
  border-radius: 4px;
  padding: 8px;
  border: 1px gray solid;
  font-size: 1em;
`;

export const Button = styled.button`
  cursor: pointer;
  border-radius: 4px;
  padding: 8px 16px;
  border: none;
  background-color: #ccbdf6;
  font-size: 1em;
  margin: 4px 0;
`;

export const Link = styled.a`
  cursor: pointer;
  color: blue;
  text-decoration: underline;
  margin: 0px 8px;
`;

export const Textarea = styled.textarea`
  border-radius: 4px;
  padding: 8px;
  border: 1px gray solid;
`;

export const Checkbox = styled.input`
  accent-color: green;
  cursor: pointer;
`;
