import { useEffect, useState } from 'react';
import * as React from 'react'
import {Container, Button, Table, TableBody,TableCell,tableCellClasses,TableContainer, TableHead, TableRow, Paper, Chip, TextField, Dialog, DialogTitle, DialogContent, DialogActions, TableFooter, Pagination, IconButton, TablePagination,} from "@mui/material";
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import { styled } from '@mui/material/styles';

import './App.css';

function App() {

const [data, setData] = useState([])
const [showForm, setShowForm] = useState(false);
const [newRowData, setNewRowData] = useState({
  id: '',
  firstname: '',
  lastname: '',
  age: '',
  email: '',
  state: '',
  city: '',
});

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  




useEffect(()=> {
  fetch("http://localhost:5000/patient")
      .then(resp=> resp.json())
      .then(resp=> 
    {console.log(resp)
    setData(resp)})
      
},[])

const handleAddRow = () => {
  setShowForm(true);
};

const handleCloseForm = () => {
  setShowForm(false);
  
  setNewRowData({
    id: '',
    firstname: '',
    lastname: '',
    age: '',
    email: '',
    state: '',
    city: '',
  });
};

const handleInputChange = (event) => {
  const { name, value } = event.target;
  setNewRowData((prevData) => ({ ...prevData, [name]: value }));
};

const handleAddNewRow = () => {
  setData((prevData) => [...prevData, newRowData]);

  fetch("http://localhost:5000/addPatient", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(newRowData)
      }).catch((error)=>{
        console.error('Error: ', error)
      })

  handleCloseForm();
};




const  onDelete = (index)=> {

        const list=[...data]
        fetch("http://localhost:5000/deletePatient", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(list[index].id)
      }).catch((error)=>{
        console.error('Error: ', error)
      })
      list.splice(index,1)
        setData(list);

}


  return (
    
    <div className="App">
    
          {
       <Container>
        <h1>Data Scrubber Tool</h1>
          <TableContainer component={Paper} sx={{
            color:'success.main'
            }}>
          <Table sx={{ minWidth: 650}} size="small" stickyHeader aria-label="simple table">
            
             <TableHead>
             <TableRow>
            <StyledTableCell>Id</StyledTableCell>
            <StyledTableCell align="right">First Name</StyledTableCell>
            <StyledTableCell align="right">Last Name</StyledTableCell>
            <StyledTableCell align="right">Age</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">State</StyledTableCell>
            <StyledTableCell align="right">City</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
          data
          .map((row, index) => (
            row ? (<StyledTableRow
                    key={index}
                              >
              <StyledTableCell component="th" scope="row">
                {index+1}
              </StyledTableCell>
              <StyledTableCell align="right">{row.firstname}</StyledTableCell>
              <StyledTableCell align="right">{row.lastname}</StyledTableCell>
              <StyledTableCell align="right">{row.age}</StyledTableCell>
              <StyledTableCell align="right">{row.email}</StyledTableCell>
              <StyledTableCell align="right">{row.state}</StyledTableCell>
              <StyledTableCell align="right">{row.city}</StyledTableCell>
              <StyledTableCell align="right">
              {<Chip 
                    label="remove"
                    onDelete={()=>{
                      onDelete(index)
                    }}
                    variant="outlined"
                    size="small"
                    color='error'
                    deleteIcon={<RemoveCircleOutlineOutlinedIcon/>}
                    /> }
              </StyledTableCell>
              
              

            </StyledTableRow>) : null
           
          ))}
          
        </TableBody>
  
          </Table>
         
        </TableContainer>
        
        <Button variant="contained" onClick={handleAddRow}>
          Add Row
        </Button>

        <Dialog open={showForm} onClose={handleCloseForm}>
          <DialogTitle>Add New Row</DialogTitle>
          <DialogContent>        
            
              <TextField
              name="firstname"
              value={newRowData.firstname}
              onChange={handleInputChange}
              label="First Name"
              fullWidth
              margin="dense"
            />
            
            <TextField
              name="lastname"
              value={newRowData.lastname}
              onChange={handleInputChange}
              label="Last Name"
              fullWidth
              margin="dense"
            />
            
            <TextField
              name="age"
              value={newRowData.age}
              onChange={handleInputChange}
              label="Age"
              fullWidth
              margin="dense"
            />
            
            <TextField
              name="email"
              value={newRowData.email}
              onChange={handleInputChange}
              label="Email"
              fullWidth
              margin="dense"
            />
            
            <TextField
              name="state"
              value={newRowData.state}
              onChange={handleInputChange}
              label="State"
              fullWidth
              margin="dense"
            />
            
            <TextField
              name="city"
              value={newRowData.city}
              onChange={handleInputChange}
              label="City"
              fullWidth
              margin="dense"
            />
            
          <DialogActions>
            <Button onClick={handleCloseForm}>Cancel</Button>
            <Button onClick={handleAddNewRow}>Add</Button>
          </DialogActions>
          </DialogContent>
        </Dialog>
      </Container> }

   </div>
   
  );
}

export default App;
