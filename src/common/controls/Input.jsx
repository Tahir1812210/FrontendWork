import React from 'react'
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)(({ theme }) => ({
    marginBottom: theme.spacing(4)
  }));

export default function Input(props) {
    const {name , label , value , onChange} = props 
  return (
    <StyledTextField
    name={name}
    label={label}
    variant="outlined"
    value={value}
    onChange={onChange}
  />
  )
}
