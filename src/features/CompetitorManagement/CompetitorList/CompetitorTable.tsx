import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import type { Competitor } from '@/shared/types';
import EditIcon from '@mui/icons-material/Edit';
import { Delete } from '@mui/icons-material';
import { useCompetitorsQuery } from '@/shared/actions';

const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', flex: 0.3 },
    { field: 'name', headerName: 'Competitor Name', flex: 0.5 },
    { field: 'image', headerName: 'Image ID', flex: 1 },
    {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        flex: 0.2,
        cellClassName: 'actions',
        getActions: () => {
            return [
                <GridActionsCellItem
                    icon={<EditIcon />}
                    label="Edit"
                    className="textPrimary"
                    // onClick={handleEditClick(id)}
                    color="primary"
                />,
                <GridActionsCellItem
                    icon={<Delete />}
                    label="Edit"
                    className="textPrimary"
                    // onClick={handleEditClick(id)}
                    color="warning"
                />,
            ];
        },
    },
];

const paginationModel = { page: 0, pageSize: 5, pageSizeOptions: [5, 10] };

interface Props {
    setActiveCompetitor: (competitor: Competitor) => void;
}

export default function CompetitorTable(props: Props) {
    const { data: competitors = [] } = useCompetitorsQuery();

    return (
        <DataGrid
            rows={competitors}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            sx={{ border: 0, width: '100%', height: '100%' }}
            getRowId={(row) => row._id}
            onRowClick={(item) => {
                props.setActiveCompetitor(item.row);
            }}
        />
    );
}
