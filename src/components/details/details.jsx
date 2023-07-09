import React, { useEffect } from 'react'
import useFetch from '../../common/hooks/useFetch'
import BasicTable from '../../common/BasicTable'
import { GetDetailApi } from '../../services/API'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { GetDetailUrl } from '../../services/URL'
import { useState } from 'react'

export default function Details() {


//const {data} = useFetch(GetDetailApi)

const [data , setData] = useState([])

useEffect(() => {
  axios.get(GetDetailApi).then(res => {
    const responseData = res.data
    const updateData = responseData.map((values) => ({
      ...values,
      itemCode: values.item.itemCode,
      itemEnglishName: values.item.itemEnglishName,
      itemArabicName: values.item.itemArabicName
    }))
    setData(updateData)
  })


}, [])


const detailurl = GetDetailUrl



const columns = [
  { key: 'price', label: 'Price', align: 'left' },
  { key: 'qty', label: 'Quantity', align: 'right' },
  { key: 'totalAmount', label: 'Total Amount', align: 'right' },
  { key: 'vat', label: 'Vat', align: 'right' },
  { key: 'totalAmountPlusVat', label: 'TotalAmountPlusVat', align: 'right' },
  { key: 'itemCode', label: 'Item Code', align: 'right' },
  { key: 'itemEnglishName', label: 'Item English Name', align: 'right' },
  { key: 'itemArabicName', label: 'Item Arabic Name', align: 'right' }
];

const handleDelete = async detail => {
  const confirmed = window.confirm(`Are you sure you want to delete ?`);
  if (confirmed) {
    try {
      const response = await axios.delete(GetDetailApi + '/' + detail);
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
         <Button variant='outlined' color="inherit" component={Link} to="/detailsform" style={{marginTop: 16 , marginLeft: 16}}>
          Create Details
        </Button>
       {data && <BasicTable columns={columns} data={data} handleDelete={handleDelete} url={detailurl}/>} 
    </div>
  )
}
