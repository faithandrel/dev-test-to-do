import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { v4 as getUuidV4 } from 'uuid';
import { Field, Label, Textarea, Button } from '../shared';
import { Task } from '../../interfaces';
import { Item } from './item';

const Container = styled.div`
  padding: 8px;
`;

export const ToDo = () => {
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

  return (
    <>
      <h3>Add Task</h3>
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
        {tasks.length ? (
          <Container>
            {tasks.map(task => (
              <div key={task.id}>
                <Item task={task} onCheck={onCheck} onRemove={onRemove} />
              </div>
            ))}
          </Container>
        ) : (
          <h3>No tasks added.</h3>
        )}
      </form>
    </>
  );
};
