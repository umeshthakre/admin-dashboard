// src/pages/Reports.js
import React from 'react';
import { Typography } from '@mui/material';
import UserTable from '../components/Table/UserTable';
import { useGetAllReportsQuery } from '../services/api';
import { ReportColumns } from '../components/Columns/Columns';

const Reports = () => {

  let {data:reports,isLoading,error} = useGetAllReportsQuery();


  reports = reports ? reports.reports : [];

  return (
  <>
  <Typography variant="h4">Reports Page</Typography>
  <UserTable columns={ReportColumns} data={reports} />
  </>
  );  
};

export default Reports;