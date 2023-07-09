import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { useForm } from '../../common/hooks/useForm';
import Input from '../../common/controls/Input';
import { Button } from '@mui/material';
import { useHistory , useParams } from 'react-router-dom';
import { GetCustomerApi, GetItemApi } from '../../services/API';
import axios from 'axios';


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

export default function ItemsForm() {

  const history = useHistory();

  const {id} = useParams();

  const initialFValues = {
    id: 0,
    itemCode: '',
    itemArabicName: '',
    itemEnglishName: '',
    price: '',
    vat: ''
  };

  const { values, setValues, handleInputChange } = useForm(initialFValues);

  const [item , setItem] = useState([])

  useEffect(() => {
    if(id) {
      const fetchItem = async () => {
        try {
          const response = await axios.get(`${GetItemApi}`+'/'+`${id}`);
          const itemData = response.data[0];
          setItem(itemData)
          setValues(itemData)
        } catch (error) {
          console.log("error: ",error)
        }
      }
      fetchItem()
    }
  

  }, [id , setValues, GetItemApi])
  


  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log("values: ",values)
    // await axios.post(GetItemApi , {
    //   itemCode: values.itemCode,
    //   itemArabicName: values.itemArabicName,
    //   itemEnglishName: values.itemEnglishName,
    //   price: values.price,
    //   vat: values.vat
    // }
    //   )
    //   history.push('/items')

    if(id)
    {
      try {
        axios.put(`${GetItemApi}`+'/'+id,values)
        console.log("values: ",values)
         history.push('/items')
      } catch (error) {
        console.error('Failed to update item:', error);
      }
    }
    else
    {
      try {
        axios.post(GetItemApi,values)
        console.log("values: ",values)
         history.push('/items')
      } catch (error) {
        console.error('Failed to create item:', error);
      }
    }

  }

  return (
    <FormContainer>
      <form onSubmit={onSubmit}>
        <InputContainer>
          <Input
            name="itemCode"
            label="Item Code"
            variant="outlined"
            value={values.itemCode}
            onChange={handleInputChange}
          />
        </InputContainer>
        <InputContainer>
          <Input
            name="itemArabicName"
            label="Item Arabic Name"
            variant="outlined"
            value={values.itemArabicName}
            onChange={handleInputChange}
          />
        </InputContainer>
        <InputContainer>
          <Input
            name="itemEnglishName"
            label="Item English Name"
            variant="outlined"
            value={values.itemEnglishName}
            onChange={handleInputChange}
          />
        </InputContainer>

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
            name="vat"
            label="vat"
            variant="outlined"
            value={values.vat}
            onChange={handleInputChange}
          />
        </InputContainer>
        <SubmitButton variant="contained" color="primary" size="large" type='submit'>
          Submit
        </SubmitButton>
      </form>
    </FormContainer>
  );
}
