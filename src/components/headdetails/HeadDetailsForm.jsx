import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { useForm } from '../../common/hooks/useForm';
import Input from '../../common/controls/Input';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import useFetch from '../../common/hooks/useFetch';
import axios from 'axios';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { GetCustomerApi, GetHeadDetailApi } from '../../services/API';
import {  Select, MenuItem } from '@mui/material';



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

const SelectInput = styled(Select)({
  width: '100%',
});

export default function HeadDetailsForm() {

  const history = useHistory();

  const {id} = useParams();


  const { data } = useFetch(GetCustomerApi);


  const [headdetails , setHeadDetails] = useState({})


  const initialFValues = {
    id: headdetails.id ?? 0,
    invoiceNumber: headdetails.invoiceNumber ?? "",
    invoiceDate: dayjs(new Date()),
    remarks: headdetails.remarks ?? "",
    totalSalesInvoiceAmount: headdetails.totalSalesInvoiceAmount ?? 0,
    totalVatAmount: headdetails.totalVatAmount ?? 0,
    totalSalesInvoicePlusVatAmount: headdetails.totalSalesInvoicePlusVatAmount ??  0,
    totalAmountPlusVat: headdetails.totalAmountPlusVat ?? "",
  };

  console.log("first",id)


  const { values, setValues, handleInputChange } = useForm(initialFValues);

  const handleDateChange = value => { 
    setValues({...values, invoiceDate:value});
};




useEffect(() => {

    if(id)
    {
      const response = axios.get(`${GetHeadDetailApi}/${id}`).then(res => {
      const headdetailsdata = res.data[0]
      // setHeadDetails(headdetailsdata)
      console.log("first",res.data[0])
      setCustomerEnglishName(headdetailsdata.customerId)
      setValues(headdetailsdata)
      })
      
    }
  
  
}, [id])

const [customerEnglishName , setCustomerEnglishName] = useState('')

const handleChange = (event) => {
setCustomerEnglishName(event.target.value)
}

const onSubmit = async (e) => 
{
e.preventDefault()
    if(id)
    {
      try {
       const response = await axios.put(`${GetHeadDetailApi}/${id}` , {...values , customerId : customerEnglishName})
       console.log(response)
        history.push('/headdetails')
      } catch (error) {
        console.log("cannot update headdetails: ",error)
      }
    }
    else
    {
      try {
       await axios.post(GetHeadDetailApi ,  {...values , customerId : customerEnglishName})
        history.push('/headdetails')
      } catch (error) {
        console.log("cannot add headdetails: ",error)
      }
    }
   
  
}

console.log(values.invoiceDate)

  return (
    <FormContainer>
      <form onSubmit={onSubmit}>
        <InputContainer>
          <Input
            name="invoiceNumber"
            label="invoiceNumber"
            variant="outlined"
            value={values.invoiceNumber}
            onChange={handleInputChange}
          />
        </InputContainer>
      <InputContainer>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Basic example"
        value={dayjs(values.invoiceDate)}
        onChange={handleDateChange}
        renderInput={(params) => <TextField {...params} />}
        
      />
    </LocalizationProvider>
      </InputContainer>
        <InputContainer>
          <Input
            name="remarks"
            label="remarks"
            variant="outlined"
            value={values.remarks}
            onChange={handleInputChange}
          />
        </InputContainer>
        <InputContainer>
          <Input
            name="totalSalesInvoiceAmount"
            label="totalSalesInvoiceAmount"
            variant="outlined"
            value={values.totalSalesInvoiceAmount}
            onChange={handleInputChange}
          />
        </InputContainer>
        <InputContainer>
          <Input
            name="totalVatAmount"
            label="totalVatAmount"
            variant="outlined"
            value={values.totalVatAmount}
            onChange={handleInputChange}
          />
        </InputContainer>
        <InputContainer>
          <Input
            name="totalSalesInvoicePlusVatAmount"
            label="totalSalesInvoicePlusVatAmount"
            variant="outlined"
            value={values.totalSalesInvoicePlusVatAmount}
            onChange={handleInputChange}
          />
        </InputContainer>
        {/* <InputContainer>
          <Input
            name="totalAmountPlusVat"
            label="totalAmountPlusVat"
            variant="outlined"
            value={values.totalAmountPlusVat}
            onChange={handleInputChange}
          />
        </InputContainer> */}
        <InputContainer>
          <SelectInput
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={customerEnglishName}
            label="customerEnglishName"
            onChange={handleChange}
          >
      {data.map((customer) => (
        <MenuItem value={customer.id}>{customer.customerEnglishName}</MenuItem> 
      ))}
          
          </SelectInput>
        </InputContainer>
        <SubmitButton variant="contained" color="primary" size="large" type="submit">
          Submit
        </SubmitButton>
      </form>
    </FormContainer>
  );
}
