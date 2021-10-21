import { createContext, useEffect, useState } from 'react';
import { api } from '../services/api';
import { IAuthContextData, IAuthProvider } from '../types/authorize';
import { IAuthResponse } from '../types/authorize';
import { User } from '../types/user';

export const AuthContext = createContext({} as IAuthContextData);

export const AuthProvider = (props: IAuthProvider) => {
  const [user, setUser] = useState<User | null>(null);

  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=d20d01dd5bb6422d6592`;

  const signIn = async (githubCode: string) => {
    const response = await api.post<IAuthResponse>('authenticate', {
      code: githubCode,
    });

    const { token, user } = response.data;

    localStorage.setItem('@dowhile:token', token);

    api.defaults.headers.common.authorization = `Bearer ${token}`;

    setUser(user);
  };

  const signOut = async () => {
    setUser(null);

    localStorage.removeItem('@dowhile:token');
  };

  useEffect(() => {
    const token = localStorage.getItem('@dowhile:token');

    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;

      api
        .get<User>('profile')
        .then((response) => {
          setUser(response.data);
        })
        .catch(() => {
          signOut();
        });
    }
  });

  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes('?code=');

    if (hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split('?code=');

      window.history.pushState({}, '', urlWithoutCode);
      signIn(githubCode);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signInUrl, user, signOut }}>
      {props.children}
    </AuthContext.Provider>
  );
};
