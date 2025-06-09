// src/App.js

import React, { useState } from 'react';
import './App.css';
import Tabs from './tabs/Tabs'; 
import ProgressBar from './progress bar/ProgressBar';
import Button from './Button/reusable_button';
import StarRating from './star rating/rates';
import DatePickerComponent from './date picker/DatePickerComponent';
import Alert from './alert/alert';
import ConfirmDialog from './cinfirm_dialog/ConfirmDialog';

function App() {
  const [alertMessage, setAlertMessage] = useState('');
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null
  });

  const openConfirmDialog = (title, message, onConfirm) => {
    setConfirmDialog({
      isOpen: true,
      title,
      message,
      onConfirm
    });
  };

  const closeConfirmDialog = () => {
    setConfirmDialog({
      isOpen: false,
      title: '',
      message: '',
      onConfirm: null
    });
  };

  const handleDeleteAccount = () => {
    openConfirmDialog(
      'Delete Account',
      'Are you sure you want to delete your account?',
      () => {
        setAlertMessage('Account deleted successfully!');
        closeConfirmDialog();
      }
    );
  };

  const handleDeleteProject = () => {
    openConfirmDialog(
      'Delete Project',
      'Are you sure you want to delete this project?',
      () => {
        setAlertMessage('Project deleted successfully!');
        closeConfirmDialog();
      }
    );
  };

  const closeAlert = () => {
    setAlertMessage('');
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center space-y-4 bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300">
      <Tabs /> 
      <Button name="Delete Account" color="bg-black text-white hover:bg-purple-800" onClick={handleDeleteAccount} />
      <Button name="Delete Project" color="bg-black text-white hover:bg-purple-800" onClick={handleDeleteProject} />
      <ProgressBar percentage={20} />
      <StarRating stars={5} rating={3} starColor="text-purple-600" />
      <DatePickerComponent />
      
      {alertMessage && <Alert message={alertMessage} onClose={closeAlert} />}
      
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={closeConfirmDialog}
        onConfirm={confirmDialog.onConfirm}
        title={confirmDialog.title}
        message={confirmDialog.message}
      />
    </div>
  );
}

export default App;