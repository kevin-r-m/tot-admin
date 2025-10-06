import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { Delete } from '@mui/icons-material';
import { useCompetitionsQuery } from '@/shared/actions';
import { Paper } from '@mui/material';

const columns: GridColDef[] = [
    {
        field: 'competitors',
        headerName: 'Competitors',
        flex: 0.3,
        valueGetter: (_, row) => `${row.competitorOne.name} vs ${row.competitorTwo.name}`,
    },
    {
        field: 'Date',
        headerName: 'Date',
        flex: 0.3,
        valueGetter: (_, row) => new Date(row.createdAt).toLocaleDateString(),
    },
    {
        field: 'Winner',
        headerName: 'Winner',
        type: 'string',
        flex: 0.2,
        valueGetter: (_, row) =>
            row.competitorOne.winner
                ? row.competitorOne.name
                : row.competitorTwo.winner
                  ? row.competitorTwo.name
                  : 'TBD',
    },
    {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        flex: 0.2,
        cellClassName: 'actions',
        getActions: () => {
            return [
                <GridActionsCellItem icon={<EditIcon />} label="Edit" className="textPrimary" color="primary" />,
                <GridActionsCellItem icon={<Delete />} label="Edit" className="textPrimary" color="warning" />,
            ];
        },
    },
];

const paginationModel = { page: 0, pageSize: 10, pageSizeOptions: [10, 20] };

export default function CompetitionTable() {
    const { data: competitions = [], isLoading } = useCompetitionsQuery();
    return (
        <Paper elevation={3} sx={{ padding: 2, width: '100%' }}>
            <DataGrid
                loading={isLoading}
                rows={competitions}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[10, 20]}
                sx={{ border: 0, width: '100%', height: '100%' }}
                getRowId={(row) => row._id}
            />
        </Paper>
    );
}
