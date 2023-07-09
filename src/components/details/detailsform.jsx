import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { useForm } from '../../common/hooks/useForm';
import Input from '../../common/controls/Input';
import { Button } from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { GetCustomerApi, GetDetailApi, GetItemApi } from '../../services/API';
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

const SelectInput = styled(Select)({
  width: '100%'
});

// Styling for the submit button
const SubmitButton = styled(Button)({
  marginTop: 16
});

export default function DetailsForm() {
  const initialFValues = {
    id: 0,
    price: '',
    qty: '',
    totalAmount: '',
    vat: '',
    totalAmountPlusVat: '',
  };

  const { id } = useParams();
  const history = useHistory();

  const { data } = useFetch(GetItemApi);


  const { values, setValues, handleInputChange } = useForm(initialFValues);

  const [itemEnglishName, setitemEnglishName] = useState('');

  const [details, setDetails] = useState({});



  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (id) {
          const response = await axios.get(`${GetDetailApi}/${id}`);
          const detailsdata = response.data[0];
          console.log("d",detailsdata)
          setitemEnglishName(detailsdata.itemId)
          setDetails(detailsdata);
          setValues(detailsdata);
         
        }
      } catch (error) {
        console.log('error: ', error);
      }
    };

    fetchDetails();
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const updatedValues = {...values , itemId : itemEnglishName }
    if (id) {
      try {
        await axios.put(`${GetDetailApi}/${id}`, updatedValues);
       history.push('/details');
      } catch (error) {
        console.error('Failed to update details:', error);
      }
    } else {
      try {
       
        await axios.post(GetDetailApi, updatedValues);
        history.push('/details');
      } catch (error) {
        console.error('Failed to create details:', error);
      }
    }
    console.log("first: ",updatedValues)
  }

  const handleChange = (event) => {
    setitemEnglishName(event.target.value);
    // Update the values object with the selected itemEnglishName
    setValues((prevValues) => ({
      ...prevValues,
      itemId: event.target.value,
    }));
  };
  
  console.log("data: ",data)


  return (
    <FormContainer>
      <form onSubmit={onSubmit}>
        <InputContainer>
          <Input
            name="price"
            label="price"
            variant="outlined"
            value={values.price}
            onChange={handleInputChange}
          />
        </InputContainer>
        <InputContainer>
          <Input
            name="qty"
            label="qty"
            variant="outlined"
            value={values.qty}
            onChange={handleInputChange}
          />
        </InputContainer>
        <InputContainer>
          <Input
            name="vat"
            label="vat"
            variant="outlined"
            value={values.vat}
            onChange={handleInputChange}
          />
        </InputContainer>
        <InputContainer>
          <Input
            name="totalAmount"
            label="totalAmount"
            variant="outlined"
            value={values.totalAmount}
            onChange={handleInputChange}
          />
        </InputContainer>
        <InputContainer>
          <Input
            name="totalAmountPlusVat"
            label="totalAmountPlusVat"
            variant="outlined"
            value={values.totalAmountPlusVat}
            onChange={handleInputChange}
          />
        </InputContainer>
     <SelectInput
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={itemEnglishName}
          label="itemEnglishName"
          onChange={handleChange}
        >
         {data.map((item) => (
      <MenuItem key={item.id} value={item.id}>
        {item.itemEnglishName}
      </MenuItem>
    ))}
        </SelectInput>
 <div>
 </div>
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
