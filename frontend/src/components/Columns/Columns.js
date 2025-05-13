import { toast } from "react-toastify";
import { formatMongoDate } from "../../helper/formatDate";
import { Button } from "@mui/material";
import { useUpdateReportStatusMutation } from "../../services/api";


export const UserColumns = [
  {
    header: "Name",
    accessor: 'name',
  },
  {
    header: 'Email',
    accessor: 'email',

  },

  {
    header: 'Phone Number',
    accessor: 'phone',
  },

  {
    header: 'Report Count',
    accessor: 'reports.length',
  },


  {
    header: 'CreatedAt',
    id: 'createdAt',
    // accessor: 'createdAt',
    Cell: ({ ...props }) => formatMongoDate(props.data[props.row.index]?.createdAt),
  },
  {
    header: 'UpdatedAt',
    id: 'updatedAt',
    Cell: ({ ...props }) => formatMongoDate(props.data[props.row.index]?.updatedAt),
  },
];


export const ReportColumns = [
  {
    header: "Report Name",
    accessor: 'name',
  },

  {
    header: 'User Email',
    accessor: 'user.email',
  },

  {
    header: 'Status',
    accessor: 'status',
  },

  {
    header: 'Update Status',
    accessor: 'id',
    Cell: ({ ...props }) => {
      const [updateReportStatus, { isLoading: isUpdateLoading }] = useUpdateReportStatusMutation();
      return (
      <Button
        variant="contained"
        color="primary"
        disabled={isUpdateLoading || props.data[props.row.index]?.status === 'Approved'}
        onClick={async () => {
          try {
            const updatedReport = await updateReportStatus(props.data[props.row.index]?._id).unwrap();
            if (updatedReport.success) {
              toast.success("Report status updated successfully");
            }
          } catch (error) {
            console.log("error",error)
            if(error.originalStatus === 429){
              toast.error("Reached rate limit try again in 1 min");
            }else{
              toast.error("Failed to update report status");

            }
          }
        }}

      >
        {isUpdateLoading  ? 'Updating...' : 'Update'}
      </Button >
      )
    },
  },

{
  header: 'CreatedAt',
    id: 'createdAt',
      // accessor: 'createdAt',
      Cell: ({ ...props }) => formatMongoDate(props.data[props.row.index]?.createdAt),
  },
{
  header: 'UpdatedAt',
    id: 'updatedAt',
      Cell: ({ ...props }) => formatMongoDate(props.data[props.row.index]?.updatedAt),
  },
];

