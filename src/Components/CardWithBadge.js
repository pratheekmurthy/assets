import { Badge, Card, Grid, Typography } from '@mui/material'
import { indigo, pink, purple } from '@mui/material/colors'

export default function CardWithBadge({ CardCount, CardTitle }) {
    return (
        <Grid item xs={3} >
            <Card sx={{ p: 1 ,backgroundColor: purple[200]}}>
                <Grid container spacing={2}>
                    <Grid item xs={10}>
                        <Typography variant="p">{CardTitle}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Badge badgeContent={CardCount} color="error" />
                    </Grid>
                </Grid>
            </Card>
        </Grid>

    )
}
