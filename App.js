import { useEffect, useState } from 'react';
import {Container, Button, Table, TableBody,TableCell,TableContainer, TableHead, TableRow, Paper, Chip, Divider, Box, TextField, Dialog, DialogTitle, DialogContent, DialogActions} from "@mui/material";
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
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
        list.splice(index,1)
        setData(list);

        fetch("http://localhost:5000/deletePatient", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(index)
      }).catch((error)=>{
        console.error('Error: ', error)
      })

}


  return (
    <div className="App">
    
          {
       <Container>
        <h1>Data Scrubber Tool</h1>
          <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
             <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">State</TableCell>
            <TableCell align="right">City</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            row ? (<TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.firstname}</TableCell>
              <TableCell align="right">{row.lastname}</TableCell>
              <TableCell align="right">{row.age}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.state}</TableCell>
              <TableCell align="right">{row.city}</TableCell>
              <TableCell align="right">
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
              </TableCell>
              
              

            </TableRow>) : null
           
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
              name="id"
              value={newRowData.id}
              onChange={handleInputChange}
              label="Id"
              fullWidth
              margin="dense"
            />
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
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseForm}>Cancel</Button>
            <Button onClick={handleAddNewRow}>Add</Button>
          </DialogActions>
        </Dialog>
      </Container> }

   </div>
  );
}

export default App;
