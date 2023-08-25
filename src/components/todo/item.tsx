import styled from 'styled-components';
import { Checkbox } from '../shared';
import { Task } from '../../interfaces';

interface ItemProps {
  task: Task;
  onCheck: (id: string, value: boolean) => void;
  onRemove: (id: string) => void;
}

const ItemContainer = styled.div`
  border: 1px solid #a5a4a4;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 16px;
  margin: 8px 0px;
`;

const Actions = styled.div`
  display: flex;
  height: 100%;
`;

const Delete = styled.button`
  background-color: red;
  border: none;
  border-radius: 8px;
  text-align: center;
  color: white;
  display: flex;
  margin-left: 4px;
  cursor: pointer;
`;

export const Item = ({ task, onCheck, onRemove }: ItemProps) => (
  <ItemContainer>
    <p>{task.description}</p>
    <Actions>
      <Checkbox
        type="checkbox"
        value={task.complete}
        onChange={e => onCheck(task.id, e.target.checked)}
      />
      <Delete type="button" onClick={() => onRemove(task.id)}>
        <div>x</div>
      </Delete>
    </Actions>
  </ItemContainer>
);
