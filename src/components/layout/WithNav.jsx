import Navbar from '../NavigationComponents/Navbar';
import Footer from '../NavigationComponents/Footer';
import { Outlet } from 'react-router-dom';

export default function WithNav() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}