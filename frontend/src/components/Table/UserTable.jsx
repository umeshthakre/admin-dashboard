import React from 'react';
import { useTable } from 'react-table';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Box,
} from '@mui/material';
import { useGenerateReportMutation } from '../../services/api';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';


const UserTable = ({ columns, data }) => {
  const location = useLocation();

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const [generateReport, { isLoading: isGeneratingReport }] = useGenerateReportMutation();

  return (
    <Paper elevation={3} sx={{ margin: 2, padding: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Users
        </Typography>
       { location.pathname === "/reports" && <Button variant="contained" color="primary" onClick={async () => {
          try {
            const response = await generateReport().unwrap();
            if(response.name){
              toast.success("Report generated successfully");
            }

            console.log('response', response)
          } catch (error) {

            console.log('error status', error.originalStatus)


            if(error.originalStatus === 429){
              toast.error("Reached rate limit try again in 1 min");
            }
            toast.error(error?.data)
            console.log('error', error)
          }
        } }>
          { isGeneratingReport ? 'Generating...' : 'Generate Report'}
        </Button>}
      </Box>

      <TableContainer>
        <Table {...getTableProps()} sx={{ minWidth: 650 }} aria-label="user table">
          <TableHead>
            {headerGroups.map(headerGroup => (
              <TableRow {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map(column => (
                  <TableCell
                    {...column.getHeaderProps()}
                    sx={{ fontWeight: 'bold', color: 'black' }}
                    key={column.id}
                  >
                    {column.header}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>

          <TableBody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()} key={row.id}>
                  {row.cells.map(cell => (
                    <TableCell key={cell.id} {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default UserTable;
