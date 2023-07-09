import React, { useEffect, useState } from 'react'
import useFetch from '../../common/hooks/useFetch'
import BasicTable from '../../common/BasicTable'
import { GetHeadDetailApi } from '../../services/API'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { GetHeadDetailUrl } from '../../services/URL'

export default function HeadDetails() {


//const {data} = useFetch(GetHeadDetailApi)

const [data , setData] = useState([])



useEffect(() => {
  axios
    .get(GetHeadDetailApi)
    .then(res => {
      const responseData = res.data; // Assuming the response data is an array of objects

      // Map the response data to include the 'customerCode', 'customerEnglishName', and 'customerArabicName' properties
      const updatedData = responseData.map(item => ({
        ...item,
        
          customerCode: item.customer.customerCode,
        customerEnglishName: item.customer.customerEnglishName,
        customerArabicName: item.customer.customerArabicName
        
      }));
      console.log(updatedData)

      setData(updatedData);
    })
    .catch(error => {
      console.error('Failed to fetch headdetails data:', error);
    });
}, []);






const columns = [
  { key: 'invoiceNumber', label: 'invoiceNumber', align: 'left' },
  { key: 'invoiceDate', label: 'invoiceDate', align: 'right' },
  { key: 'remarks', label: 'remarks', align: 'right' },
  { key: 'totalSalesInvoiceAmount', label: 'totalSalesInvoiceAmount', align: 'right' },
  { key: 'totalVatAmount', label: 'totalVatAmount', align: 'right' },
  { key: 'totalSalesInvoicePlusVatAmount', label: 'totalSalesInvoicePlusVatAmount', align: 'right' },
  { key: 'customerCode', label: 'Customer Code', align: 'right' },
  { key: 'customerEnglishName', label: 'Customer English Name', align: 'right' },
  { key: 'customerArabicName', label: 'Customer Arabic Name', align: 'right' }

];

const headdetailsurl = GetHeadDetailUrl

const handleDelete = async headdetail => {
  const confirmed = window.confirm(`Are you sure you want to delete ?`);
  if (confirmed) {
    try {
      const response = await axios.delete(GetHeadDetailApi + '/' + headdetail);
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
         <Button variant='outlined' color="inherit" component={Link} to="/headdetailsform" style={{marginTop: 16 , marginLeft: 16}}>
          Create HeadDetailsDetails
        </Button>
       {data && <BasicTable columns={columns} data={data} handleDelete={handleDelete}  url={headdetailsurl} />} 
    </div>
  )
}
