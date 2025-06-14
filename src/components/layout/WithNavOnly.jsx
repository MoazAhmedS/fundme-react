import Navbar from '../NavigationComponents/Navbar';
import { Outlet } from 'react-router-dom';

export default function WithNavOnly() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}