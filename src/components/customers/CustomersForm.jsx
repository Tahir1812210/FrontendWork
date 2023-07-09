import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { useForm } from '../../common/hooks/useForm';
import Input from '../../common/controls/Input';
import { Button, Select, MenuItem } from '@mui/material';
import { GetCustomerApi, GetCountryApi, GetCityApi } from '../../services/API';
import { useHistory , useParams } from 'react-router-dom';
import useFetch from '../../common/hooks/useFetch';
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
  width: '100%',
  '& .MuiSelect-select': {
    padding: '10.5px 14px',
  },
  '& .MuiOutlinedInput-input': {
    padding: '10.5px 14px',
  },
});



export default function CustomersForm() {
  const [countryId, setCountryId] = useState(0);
  const [country, setCountry] = useState('');
  const [cities, setCities] = useState([]);
  const [email, setEmail] = useState('')
  const [mobileNo, setMobileNo] = useState('')
  
  const history = useHistory();

  const initialFValues = {
    id: 0,
    customerCode: '',
    customerArabicName: '',
    customerEnglishName: '',
    email: '',
    mobileNo: ''
  };



  const { values, setValues, handleInputChange } = useForm(initialFValues);

  const [countryEnglishName, setCountryEnglishName] = useState('');
  const [cityEnglishName, setCityEnglishName] = useState('');

  const handleChangeCountry = (event) => {
    setCountryEnglishName(event.target.value);
  };

  const handleChangeCity = (event) => {
    setCityEnglishName(event.target.value);
  };

  const { data } = useFetch(GetCountryApi);
  const { data: cityData } = useFetch(`${GetCityApi}/Country/${countryId}`);

  const onChange = (e) => {
    setCountry(e.target.value);
    console.log(e.target.value);
    setCountryId(e.target.value);
  };

  useEffect(() => {
    if (countryId !== 0) {
      const fetchCustomers = async () => {
        try {
          const response = await fetch(`${GetCityApi}/Country/${countryId}`);
          const customerData = await response.json();
          setCities(customerData);
          console.log('cities: ', customerData);
        } catch (error) {
          console.error('Failed to fetch cities:', error);
        }
      };

      fetchCustomers();
    }
  }, [countryId]);

  const [customer , setCustomer] = useState([])

  const {id} = useParams()

  // useEffect(() => {
  //   try {
  //  const fetchCustomer = async () => {
  // if(id)
  // {
  //   const response = axios.get(`${GetCustomerApi}/${id}`)
  //   const customerData = await response.json();
  //   setCustomer(customerData[0]);
  //   setValues(customerData[0]);
  // }
  //  }
  //  fetchCustomer();
  //   } catch (error) {
  //     console.log("customer data is not updated: ", error)
  //   }
  
   
  // }, [id , GetCustomerApi , setValues])
  

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        if (id) {
          const response = await fetch(`${GetCustomerApi}/${id}`);
          const customerData = await response.json();
          setCustomer(customerData[0]);
          setValues({
            ...values,
            customerCode: customerData[0].customerCode,
            customerArabicName: customerData[0].customerArabicName,
            customerEnglishName: customerData[0].customerEnglishName,
          });
          setEmail(customerData[0].email)
          setMobileNo(customerData[0].mobileNo)
          setCountryId(customerData[0].countryId)
          setCityEnglishName(customerData[0].cityId)
        }
      } catch (error) {
        console.log('Failed to fetch customer data:', error);
      }
    };
  
    fetchCustomer();
  }, [id, GetCustomerApi, setValues]);
  
  const onSubmit = async (e) => {
    e.preventDefault();
    const updatedValues = {
      countryId: countryId,
      cityId: cityEnglishName,
      customerCode: values.customerCode,
      customerArabicName: values.customerArabicName,
      customerEnglishName: values.customerEnglishName,
      email,
      mobileNo
    };
  
    if (id) {
      try {
        await axios.put(`${GetCustomerApi}/${id}`, updatedValues);
        history.push('/customers');
      } catch (error) {
        console.error('Failed to update customer:', error);
      }
    } else {
      try {
        await axios.post(GetCustomerApi, updatedValues);
        history.push('/customers');
      } catch (error) {
        console.error('Failed to create customer:', error);
      }
    }
  
  





  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log('values: ', values);
  //   await fetch(GetCustomerApi, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       countryId: countryEnglishName,
  //       cityId: cityEnglishName,
  //       customerCode: values.customerCode,
  //       customerArabicName: values.customerArabicName,
  //       customerEnglishName: values.customerEnglishName
  //     })
  //   });



    //history




  }
  console.log("first: ",data)
  return ( 

    <FormContainer>
      <form onSubmit={onSubmit}>
        <InputContainer>
          <Input
            name="customerCode"
            label="Customer Code"
            variant="outlined"
            value={values.customerCode}
            onChange={handleInputChange}
          />
        </InputContainer>
        <InputContainer>
          <Input
            name="customerArabicName"
            label="Customer Arabic Name"
            variant="outlined"
            value={values.customerArabicName}
            onChange={handleInputChange}
          />
        </InputContainer>
        <InputContainer>
          <Input
            name="customerEnglishName"
            label="Customer English Name"
            variant="outlined"
            value={values.customerEnglishName}
            onChange={handleInputChange}
          />
        </InputContainer>
        <InputContainer>
          <Input
            name="email"
            label="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <Input
            name="mobileNo"
            label="mobileNo"
            variant="outlined"
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <SelectInput
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={countryId}
            label="countryEnglishName"
            onChange={(e) => onChange(e)}
          >
            {data.map(country => (
              <MenuItem value={country.id}>
                {country.countryEnglishName}
              </MenuItem>
            ))}
          </SelectInput>
        </InputContainer>
        {countryId != 0 && (
          <InputContainer>
            <SelectInput
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={cityEnglishName}
              label="cityEnglishName"
              onChange={handleChangeCity}
            >
              {cities.map(city => (
                <MenuItem value={city.id}>{city.cityEnglishName}</MenuItem>
              ))}
            </SelectInput>
          </InputContainer>
        )}
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
