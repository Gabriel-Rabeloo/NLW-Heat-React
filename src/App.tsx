/* eslint-disable prettier/prettier */
/* eslint-disable no-extra-boolean-cast */
import styles from './App.module.scss';
import { MessageList } from './components/MessageList';
import { LoginBox } from './components/LoginBox';
import { useContext } from 'react';
import { SendMessageForm } from './components/SendMessageForm';
import { AuthContext } from './contexts/auth';

export const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <main
      className={`${styles.contentWrapper} ${!!user ? styles.contentSinged : ''
        }`}
    >
      <MessageList />
      {user ? <SendMessageForm /> : <LoginBox />}
    </main>
  );
};
