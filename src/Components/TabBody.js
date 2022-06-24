import CardWithBadge from './CardWithBadge';
import { Divider, Grid, Typography, Box } from '@mui/material';

export default function TabBody({ CardTitleArray }) {
    return (
        <>{
            CardTitleArray.title.map((card, i) => (
                <>
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" align="center" sx={{ p: 2 }} >{card}</Typography>
                        <Divider />
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                            {
                                CardTitleArray.cardTitle.map((item, j) => (
                                    <CardWithBadge key={Math.random()} CardCount={CardTitleArray.counts[i][j]} CardTitle={item} />
                                ))
                            }
                        </Grid>
                    </Box>
                </>
            ))
        }


        </>
    )
}
