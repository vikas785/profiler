import { userProps } from '@/components/UserDetails';
import React, { createContext, useContext, useState, ReactNode } from 'react';

// interface UserContextType {
//     users: userProps[];
//     setUsers: React.Dispatch<React.SetStateAction<userProps[]>>;
//   }

interface UserContextType {
  userId: number;
  setUserId: React.Dispatch<React.SetStateAction<number>>;
}

  export const UserContext = createContext<UserContextType >({ userId: 0, 
    setUserId: () => {}});