import {useState , useEffect} from 'react';
import useFetch from '../../common/hooks/useFetch';
import { GetCountryApi } from '../../services/API';
import BasicTable from '../../common/BasicTable';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { GetCountryUrl } from '../../services/URL';

export default function Countries() {
  const { data , setData } = useFetch(GetCountryApi);



  

  const columns = [
    { key: 'countryCode', label: 'Country Code', align: 'left' },
    {
      key: 'countryEnglishName',
      label: 'Country English Name',
      align: 'right'
    },
    { key: 'countryArabicName', label: 'Country Arabic Name', align: 'right' }
  ];


  


  const handleDelete = async country => {
    const confirmed = window.confirm(`Are you sure you want to delete ?`);
    if (confirmed) {
      try {
        const response = await axios.delete(GetCountryApi + '/' + country);
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
      <Button
        variant="outlined"
        color="inherit"
        component={Link}
        to="/countriesform"
        style={{ marginTop: 16, marginLeft: 16 }}
      >
        Create Countries
      </Button>
      {data && (
        <BasicTable columns={columns} data={data} handleDelete={handleDelete} url={GetCountryUrl}/>
      )}
    </div>
  );
}
