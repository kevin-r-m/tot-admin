import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import { Competitor } from '../types';
import EditIcon from '@mui/icons-material/Edit';

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
                    color="inherit"
                />,
            ];
        },
    },
];

const paginationModel = { page: 0, pageSize: 5, pageSizeOptions: [5, 10] };

interface CompetitorTableProps {
    competitors: Competitor[];
    setActiveCompetitor: (competitor: Competitor) => void;
}

export default function CompetitorTable({ competitors, setActiveCompetitor }: CompetitorTableProps) {
    return (
        <DataGrid
            rows={competitors}
            columns={columns}
            initialState={{ pagination: { paginationModel }, sorting: { sortModel: [{ field: 'name', sort: 'asc' }] } }}
            pageSizeOptions={[5, 10]}
            sx={{ border: 0, width: '100%', height: '100%' }}
            getRowId={(row) => row._id}
            onRowClick={(item) => {
                setActiveCompetitor(item.row);
            }}
        />
    );
}
