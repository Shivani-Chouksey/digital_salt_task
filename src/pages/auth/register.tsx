import React from 'react';
import DynamicForm from '../../components/modular-form';

interface Field {
  id: string;
  type:
    | 'text'
    | 'email'
    | 'password'
    | 'tel'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'file'
    | 'number'
    | 'radio'
    | 'checkbox'
    | 'range'
    | 'search'
    | 'url'
    | 'time'
    | 'week'
    | 'dropdown'
    | 'submit'
    | 'reset'
    | 'hidden'
    | 'month';
  label?: string;
  multiple?: boolean;
  options?: string[];
  value?: string;
  dependsOn?: {
    field: string;
    value: string;
  };
  styles?: {
    container?: string;
    label?: string;
    input?: string;
  };
}

function RegistrationPage() {
  const formConfig: Field[] = [
    { id: 'name', type: 'text', label: 'Name' },
    { id: 'email', type: 'email', label: 'Email' },
    { id: 'password', type: 'password', label: 'Password' },
    { id: 'file', type: 'radio', label: 'Upload File', options: ['Single', 'multiple'] },
    { id: 'profilePicture', type: 'file', label: 'Profile Picture', multiple: false ,dependsOn: { field: 'file', value: 'Single' }, },
    { id: 'gallery', type: 'file', label: 'Gallery', multiple: true,dependsOn: { field: 'file', value: 'multiple' }, },
    { id: 'age', type: 'number', label: 'Age' },
    // { id: 'gender', type: 'radio', label: 'Gender', options: ['Male', 'Female', 'Other'] },
    // { id: 'test', type: 'checkbox', label: 'Test ', options: ['1', '2', '3'] , dependsOn: { field: 'gender', value: 'Other' },},
    // { id: 'check', type: 'text', label: 'Type Something',dependsOn: { field: 'test', value: '1' } },
    { id: 'gender', type: 'radio', label: 'Gender', options: ['Male', 'Female', 'Other'] },
    { 
      id: 'test', 
      type: 'checkbox', 
      label: 'Test', 
      options: ['1', '2', '3'],
      dependsOn: { field: 'gender', value: 'Other' }  // Show this field if gender is 'Other'
    },
    { 
      id: 'check', 
      type: 'text', 
      label: 'Type Something', 
      dependsOn: { field: 'gender', value: 'Male' },  // Show this field if 'test' checkbox has value '1'
    },
    { id: 'hobby', type: 'checkbox', label: 'Hobbies', options: ['Reading', 'Traveling', 'Gaming'] },
    { id: 'terms', type: 'checkbox', label: 'Agree to Terms & Conditions' },
    { id: 'country', type: 'dropdown', label: 'Country', options: ['USA', 'India', 'Canada'] },
    {
      id: 'state',
      type: 'dropdown',
      label: 'State',
      options: ['California', 'Texas', 'New York'],
      dependsOn: { field: 'country', value: 'USA' },
    },
    { id: 'typeSomthing', type: 'text', label: 'Type Something Here', dependsOn: { field: 'state', value: 'California' }, },
    { id: 'check', type: 'checkbox', label: 'Select One', options: ['Reading', 'Traveling', 'Gaming'],dependsOn: { field: 'state', value: 'Texas' }, },

  
  ];

  return (
    <div className="App">
      <DynamicForm config={formConfig} />
    </div>
  );
}

export default RegistrationPage;
