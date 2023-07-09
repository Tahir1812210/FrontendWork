import React from 'react'
import useFetch from '../../common/hooks/useFetch'
import BasicTable from '../../common/BasicTable'
import { GetItemApi } from '../../services/API'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { GetItemUrl } from '../../services/URL'


export default function Items() {


const {data , setData} = useFetch(GetItemApi)

const itemurl = GetItemUrl

const columns = [
  { key: 'itemCode', label: 'Item Code', align: 'left' },
  { key: 'itemArabicName', label: 'Item Arabic Name', align: 'right' },
  { key: 'itemEnglishName', label: 'Item English Name', align: 'right' },
  { key: 'price', label: 'Price', align: 'right' },
  { key: 'vat', label: 'Vat', align: 'right' },
];

const handleDelete = async item => {
  const confirmed = window.confirm(`Are you sure you want to delete ?`);
  if (confirmed) {
    try {
      const response = await axios.delete(GetItemApi + '/' + item);
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
         <Button variant='outlined' color="inherit" component={Link} to="/itemsform" style={{marginTop: 16 , marginLeft: 16}}>
          Create Items
        </Button>
       {data && <BasicTable columns={columns} data={data} handleDelete={handleDelete} url={itemurl} />} 
    </div>
  )
}
