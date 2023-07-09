import React, { useEffect, useState } from 'react'
import useFetch from '../../common/hooks/useFetch'
import BasicTable from '../../common/BasicTable'
import { GetCustomerApi } from '../../services/API';
import { Button } from '@mui/material'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { GetCustomerUrl } from '../../services/URL';

export default function Customers() {


// const {data , setData} = useFetch(GetCustomerApi)

const [data , setData] = useState([])

const customerurl = GetCustomerUrl;

useEffect(() => {
  axios.get(GetCustomerApi)
    .then(res => {
      const responseData = res.data;
      const updatedData = responseData.map(item => ({
        ...item,
        countryCode: item.country.countryCode,
        countryArabicName: item.country.countryArabicName,
        countryEnglishName: item.country.countryEnglishName,
        cityCode: item.city.cityCode,
        cityArabicName: item.city.cityArabicName,
        cityEnglishName: item.city.cityEnglishName,
      }));
      setData(updatedData);
    })
    .catch(error => {
      console.error('Failed to fetch customer data:', error);
    });
}, []);



const columns = [
  { key: 'customerCode', label: 'Customer Code', align: 'left' },
  { key: 'customerArabicName', label: 'Customer Arabic Name', align: 'right' },
  { key: 'customerEnglishName', label: 'Customer English Name', align: 'right' },
  { key: 'mobileNo', label: 'Mobile No', align: 'right' },
  { key: 'countryCode' , label: 'Country Code' , align: 'right' },
  { key: 'countryArabicName', label: 'Country Arabic Name', align: 'right' },
  { key: 'countryEnglishName' , label: 'Country English Name' , align: 'right' },
  { key: 'cityCode' , label: 'City Code' , align: 'right' },
  { key: 'cityArabicName', label: 'City Arabic Name', align: 'right' },
  { key: 'cityEnglishName' , label: 'City English Name' , align: 'right' },
  
];

const handleDelete = async customer => {
  const confirmed = window.confirm(`Are you sure you want to delete ?`);
  if (confirmed) {
    try {
      const response = await axios.delete(GetCustomerApi + '/' + customer);
      if (response.status === 200) {
        const del = data.filter(d => d.id !== data.id)
        setData(del)
        console.log("del: ",del)
      } else {
        console.error('Failed to delete item');
      }
    } catch (error) {
      console.error('Failed to delete item', error);
    }
  }
};

  return (
    <div>
      {/* {error && <div>{error}</div>}
      {pending && <div>Loading...</div>} */}
         <Button variant='outlined' color="inherit" component={Link} to="/customersform" style={{marginTop: 16 , marginLeft: 16}}>
          Create Customers
        </Button>
       {data && <BasicTable columns={columns} data={data} handleDelete={handleDelete} url={customerurl} />} 
    </div>
  )
}
