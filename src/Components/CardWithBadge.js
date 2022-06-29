import { Badge, Card, Grid, Typography } from '@mui/material'

export default function CardWithBadge({ CardCount, CardTitle }) {
    return (
        <Grid item xs={3} >
            <Card sx={{ p: 1}}>
                <Grid container spacing={2}>
                    <Grid item xs={10}>
                        <Typography variant="p">{CardTitle} ({CardCount})</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Badge badgeContent={CardCount} color="error" />
                    </Grid>
                </Grid>
            </Card>
        </Grid>

    )
}


