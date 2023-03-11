import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];



export default function BasicTable(props) {
  console.log(props.data,props.tableHead)
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead >
          <TableRow style={{backgroundColor:"black"}}>
            {
              props.tableHead.map((ele)=>{
                return(

                  <TableCell style={{color:"white"}}  align="center">{ele}</TableCell>
                )

              })
            }
            <TableCell style={{color:"white"}} align="right"></TableCell>
            {/* 
            <TableCell style={{color:"white"}} align="right">Fat&nbsp;(g)</TableCell>
            <TableCell style={{color:"white"}} align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell style={{color:"white"}} align="right">Protein&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align='center'>
                {row.name}
                
              </TableCell>
              {/* {name: 'Frozen',password:159,som:78,vs:7677,h:7} */}
              <TableCell align="center">{row?.password}</TableCell>
              <TableCell align="center">{row?.som}</TableCell>
              <TableCell align="center">{row?.vs}</TableCell>
              <TableCell align="center">{row?.h}</TableCell>
              <TableCell align="center"><Button>edit</Button> <Button>Delete</Button></TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}