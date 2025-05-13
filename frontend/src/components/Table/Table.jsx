import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
} from '@tanstack/react-table';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

const Table = ({ data, columns }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table border="1" style={{ borderCollapse: 'collapse', width: '100%' }}>
      <TableHeader table={table} />
      <TableBody table={table} />
    </table>
  );
};

export default Table;
