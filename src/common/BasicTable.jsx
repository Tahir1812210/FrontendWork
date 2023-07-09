import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Button, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { GetCountryApi } from '../services/API';
import {  useHistory , useParams } from 'react-router-dom';


// Styling for the table container
const StyledTableContainer = styled(TableContainer)({
  maxWidth: 650,
  margin: 'auto',
  marginTop: 16,
});

// Styling for the table
const StyledTable = styled(Table)({
  minWidth: 650,
});

// Styling for the table head cells
const StyledTableCell = styled(TableCell)({
  fontWeight: 'bold',
});

const BasicTable = ({ columns, data , handleDelete , url}) => {

  const handleSearch = (searchTerm) => {
    const filtered = data.filter((item) =>
      Object.values(item).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredData(filtered);
  };

  const history = useHistory();


  if (!data) {
    return <div>Loading...</div>;
  }




  return (
    <StyledTableContainer component={Paper}>
      <StyledTable aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <StyledTableCell key={column.key}>{column.label}</StyledTableCell>
            ))}
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              {columns.map((column) => (
                <TableCell key={column.key} align={column.align}>
                  {row[column.key]}
                </TableCell>
              ))}
              <TableCell>
                <Box sx={{ display: 'flex' }}>
                  <Button variant="outlined" color="secondary" onClick={() => handleDelete(row.id)} sx={{ marginRight: 2 }}>
                    <DeleteIcon />
                  </Button>
                  <Button variant="outlined" color="primary" onClick={() => history.push(`${url}/${row.id}`)}>
                    <EditIcon />
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </StyledTableContainer>
  );
};

export default BasicTable;
