
// src/pages/Analytics.js
import React from 'react';
import { Typography } from '@mui/material';
import { useGetAllUsersQuery } from '../services/api';

import Table from '../components/Table';
import UserTable from '../components/Table/UserTable';
import { UserColumns } from '../components/Columns/Columns';

const Analytics = () => {

    let {data:users,isLoading,error} = useGetAllUsersQuery();

    

    users = users ? users.users  : [];

    console.log('users',users)
    return <>
    <UserTable columns={UserColumns} data={users} onGenerateReport={() => {}} />
    </>;
};

export default Analytics;