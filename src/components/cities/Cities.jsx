//{ key: 'country.countryCode', label: 'countryCode', align: 'right' }


import {useState , useEffect} from 'react'
import useFetch from '../../common/hooks/useFetch'
import { GetCityApi, GetCountryApi } from '../../services/API'
import BasicTable from '../../common/BasicTable'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { GetCityUrl } from '../../services/URL'

export default function Cities() {


//const {data , setData} = useFetch(GetCityApi)

//setData()

const [data, setData] = useState([])



// const cityurl = GetCityUrl

// useEffect(() => {
//   axios.get(GetCityApi).then(res => {

//     const response = data.map((r) => {
//   return {...r,countryCode:r.country.countryCode}
// })

//     setData( response )


//   })


  
// }, [])

useEffect(() => {
  axios.get(GetCityApi)
    .then(res => {
      const responseData = res.data; // Assuming the response data is an array of objects

      // Map the response data to include the 'countryCode' property
      const updatedData = responseData.map(item => ({
        ...item,
        countryCode: item.country.countryCode
      }));

      setData(updatedData);
    })
    .catch(error => {
      console.error('Failed to fetch city data:', error);
    });
}, []);


// const response = data.map((r) => {
//   return {...r,countryCode:r.country.countryCode}
// })

// console.log("res: ",response)
// setData(response)
const columns = [
  { key: 'cityCode', label: 'City Code', align: 'left' },
  { key: 'cityArabicName', label: 'City Arabic Name', align: 'right' },
  { key: 'cityEnglishName', label: 'City English Name', align: 'right' },
  { key: 'countryCode', label: 'Country Code', align: 'right' }

];



const handleDelete = async city => {
  const confirmed = window.confirm(`Are you sure you want to delete ?`);
  if (confirmed) {
    try {
      const response = await axios.delete(GetCityApi + '/' + city);
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

console.log("data: ",data)


  return (
    <div>
      {/* {error && <div>{error}</div>}
      {pending && <div>Loading...</div>} */}
         <Button variant='outlined' color="inherit" component={Link} to="/citiesform" style={{marginTop: 16 , marginLeft: 16}}>
          Create Cities
        </Button>
       {data && <BasicTable columns={columns} data={data} handleDelete={handleDelete} url={GetCityUrl}/>} 
    </div>
  )
}
