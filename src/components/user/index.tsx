import { useState, ChangeEvent } from 'react';
import { Field, Label, Input, Button, Link } from '../shared';
import { User } from '../../interfaces';
import { register } from '../../services';

interface LogInProps {
  onLogin: (value: boolean) => void;
}

export const LogIn = ({ onLogin }: LogInProps) => {
  const [mode, setMode] = useState<'register' | 'login'>('login');
  const [values, setValues] = useState<User>({ email: '', password: '' });

  const onSubmit = e => {
    e.preventDefault();
    if (mode === 'login') {
      localStorage.setItem('token', Date.now().toString());
      onLogin(true);
      return;
    }
    setMode('login');
  };

  const onValueChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValues(existing => ({ ...existing, [e.target.name]: e.target.value }));

  return (
    <>
      <h3>User {mode === 'register' ? 'Register' : 'Log in'}</h3>
      <form onSubmit={onSubmit}>
        <Field>
          <Label>Email</Label>
          <Input name="email" type="email" required onChange={onValueChange} />
        </Field>
        <Field>
          <Label>Password</Label>
          <Input
            name="password"
            type="password"
            required
            onChange={onValueChange}
          />
        </Field>
        <Button type="submit">Submit</Button>
        <Link
          onClick={() =>
            setMode(current => (current === 'register' ? 'login' : 'register'))
          }>
          {mode === 'register' ? 'Log In' : 'Register'}
        </Link>
      </form>
    </>
  );
};
