import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { useForm } from '../../common/hooks/useForm';
import Input from '../../common/controls/Input';
import { Button } from '@mui/material';
import axios from 'axios';
import { GetCountryApi } from '../../services/API';
import { useHistory, useParams } from 'react-router-dom';
import Joi from 'joi';

// Styling for the form container
const FormContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: 'auto',
  maxWidth: 400,
  padding: 16,
  marginTop: 16,
  justifyContent: 'center',
  border: '1px solid #ccc',
  borderRadius: 4,
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
});

// Styling for the form inputs
const InputContainer = styled('div')({
  marginBottom: 16,
  width: '100%',
});

// Styling for the submit button
const SubmitButton = styled(Button)({
  marginTop: 16,
});


export default function CountriesForm() {
  const history = useHistory();
  const { id } = useParams();




   

  const [country, setCountry] = useState({});

  const initialFormValues = {
    countryCode: '',
    countryArabicName: '',
    countryEnglishName: '',
  };

  const { values, handleInputChange, setValues  } = useForm(initialFormValues);


  const onSubmit = async (e) => {
    e.preventDefault();
    
      if (id) {
        try {
          await axios.put(`${GetCountryApi}/${id}`, values);
          history.push('/');
        } catch (error) {
          console.error('Failed to update country:', error);
        }
      } else {
        try {
          await axios.post(GetCountryApi, values);
          history.push('/');
        } catch (error) {
          console.error('Failed to create country:', error);
        }
      }
    
      console.log('Form submitted successfully!');
    }


  useEffect(() => {
    if (id) {
      const fetchCountry = async () => {
        try {
          const response = await axios.get(`${GetCountryApi}`+"/"+`${id}`);
          const countryData = response.data[0];
          setCountry(countryData);
          setValues(countryData);
        } catch (error) {
          console.error('Failed to fetch country:', error);
        }
      };
      fetchCountry();
    }
  }, [id, setValues, GetCountryApi]);

  return (
    <FormContainer>
      <form onSubmit={onSubmit}>
        <InputContainer>
          <Input
            name="countryCode"
            label="Country Code"
            variant="outlined"
            value={values.countryCode}
            onChange={handleInputChange}
          />

        </InputContainer>
        <InputContainer>
          <Input
            name="countryArabicName"
            label="Country Arabic Name"
            variant="outlined"
            value={values.countryArabicName}
            onChange={handleInputChange}
          />
           
        </InputContainer>
        <InputContainer>
          <Input
            name="countryEnglishName"
            label="Country English Name"
            variant="outlined"
            value={values.countryEnglishName}
            onChange={handleInputChange}
          />
           
        </InputContainer>
        <SubmitButton variant="contained" color="primary" size="large" type="submit">
          Submit
        </SubmitButton>
      </form>
    </FormContainer>
  );
}
