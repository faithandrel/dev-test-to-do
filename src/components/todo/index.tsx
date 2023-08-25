import { useState, useMemo } from 'react';
import styled from 'styled-components';
import { v4 as getUuidV4 } from 'uuid';
import { Field, Label, Textarea, Button, Link } from '../shared';
import { Task } from '../../interfaces';
import { Item } from './item';

interface ToDoProps {
  onLogOut: (value: boolean) => void;
}

const Container = styled.div`
  margin-top: 8px;
  padding: 8px;
`;

const NavigationButton = styled(Button)<{ $active?: boolean }>`
  background-color: ${props => (props.$active ? 'white' : '#a5a4a4')};
  border: ${props => (props.$active ? '1px solid black' : 'none')};
  margin-right: 8px;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

enum Mode {
  All = 'All',
  Pending = 'Pending',
  Completed = 'Completed'
}

export const ToDo = ({ onLogOut }: ToDoProps) => {
  const [mode, setMode] = useState<Mode>(Mode.All);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [description, setDescription] = useState<string>('');

  const onAddTask = e => {
    e.preventDefault();
    setTasks(existing => [
      ...existing,
      { id: getUuidV4(), description, complete: false }
    ]);
    setDescription('');
  };

  const onCheck = (id: string, value: boolean) =>
    setTasks(items =>
      items.map(item => (item.id === id ? { ...item, complete: value } : item))
    );

  const onRemove = (id: string) =>
    setTasks(items => items.filter(item => item.id !== id));

  const showTasks = useMemo(
    () =>
      tasks.filter(task => {
        if (mode === Mode.All) {
          return true;
        }
        return mode === Mode.Completed ? task.complete : !task.complete;
      }),
    [tasks, mode]
  );

  const logOut = () => {
    localStorage.clear();
    onLogOut(false);
  };

  return (
    <>
      <Title>
        <h3>Add Task</h3>
        <Link onClick={logOut}>Log out</Link>
      </Title>
      <form onSubmit={onAddTask}>
        <Field>
          <Label>Description</Label>
          <Textarea
            rows={6}
            value={description}
            required
            onChange={e => setDescription(e.target.value)}
          />
        </Field>

        <Button type="submit">Submit</Button>
      </form>
      <Container>
        {tasks.length ? (
          <>
            <div>
              <NavigationButton
                type="button"
                $active={mode === Mode.All}
                onClick={() => setMode(Mode.All)}>
                {Mode.All}
              </NavigationButton>
              <NavigationButton
                type="button"
                $active={mode === Mode.Pending}
                onClick={() => setMode(Mode.Pending)}>
                {Mode.Pending}
              </NavigationButton>
              <NavigationButton
                type="button"
                $active={mode === Mode.Completed}
                onClick={() => setMode(Mode.Completed)}>
                {Mode.Completed}
              </NavigationButton>
            </div>
            {showTasks.map(task => (
              <div key={task.id}>
                <Item task={task} onCheck={onCheck} onRemove={onRemove} />
              </div>
            ))}
          </>
        ) : (
          <h3>No tasks added.</h3>
        )}
      </Container>
    </>
  );
};
