import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { useForm } from '../../common/hooks/useForm';
import Input from '../../common/controls/Input';
import { Button } from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { GetCityApi , GetCountryApi } from '../../services/API';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import useFetch from '../../common/hooks/useFetch';


// Styling for the form container
const FormContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: 'auto',
  maxWidth: 400,
  padding: 16,
  marginTop: 16, // Add margin on top
  justifyContent: 'center', // Center the content horizontally and vertically
  border: '1px solid #ccc',
  borderRadius: 4,
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
});

// Styling for the form inputs
const InputContainer = styled('div')({
  marginBottom: 16,
  width: '100%'
});

// Styling for the submit button
const SubmitButton = styled(Button)({
  marginTop: 16
});

const SelectInput = styled(Select)({
  width: '100%'
});



export default function CitiesForm() {
  const history = useHistory();

  const initialFValues = {
    id: 0,
    cityCode: '',
    cityArabicName: '',
    cityEnglishName: ''
  };


  

  const { id } = useParams();

  const { data } = useFetch(GetCountryApi);

  const {  values , setValues , handleInputChange } = useForm(
    initialFValues
  );

  const [countryCode, setCountryCode] = useState('');
  //const [countryId, setCountryId] = useState(0);

  const [city, setCity] = useState({});

  useEffect(() => {
    const fetchCities = async () => {
      try {
        if (id) {
          const response = await axios.get(`${GetCityApi}/${id}`);
          const citydata = response.data[0];
          console.log("d",citydata)
          setCountryCode(citydata.countryId)
          setCity(citydata);
          setValues(citydata);
         
        }
      } catch (error) {
        console.log('error: ', error);
      }
    };

    fetchCities();
  }, [id]);





  const onSubmit = async (e) => {
    e.preventDefault();
    const updatedValues = {...values , countryId : countryCode }
    if (id) {
      try {
        await axios.put(`${GetCityApi}/${id}`, updatedValues);
        history.push('/cities');
      } catch (error) {
        console.error('Failed to update details:', error);
      }
    } else {
      try {
       
        await axios.post(GetCityApi, updatedValues);
        history.push('/cities');
      } catch (error) {
        console.error('Failed to create details:', error);
      }
    }
    console.log("first: ",updatedValues)
  }

  const handleChange = (event) => {
    setCountryCode(event.target.value);
  };

  return (
    <FormContainer>
      <form onSubmit={onSubmit}>
        <InputContainer>
          <Input
            name="cityCode"
            label="City Code"
            variant="outlined"
            value={values.cityCode}
            onChange={handleInputChange}
            required
          />
     
        </InputContainer>
        <InputContainer>
          <Input
            name="cityArabicName"
            label="city Arabic Name"
            variant="outlined"
            value={values.cityArabicName}
            onChange={handleInputChange}
            
          />


        </InputContainer>
        <InputContainer>
          <Input
            name="cityEnglishName"
            label="city English Name"
            variant="outlined"
            value={values.cityEnglishName}
            onChange={handleInputChange}
          />
   
   


        </InputContainer>
        <InputContainer>
        <SelectInput
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={countryCode}
          label="countryCode"
          onChange={handleChange}
        >
         {data.map((city) => (
      <MenuItem key={city.id} value={city.id}>
        {city.countryCode}
      </MenuItem>
    ))}
        </SelectInput>
      
       


        </InputContainer>
        <SubmitButton
          variant="contained"
          color="primary"
          size="large"
          type="submit"
        >
          Submit
        </SubmitButton>
      </form>
    </FormContainer>
  );
}
