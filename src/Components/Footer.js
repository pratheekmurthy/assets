import { Paper, Typography } from "@mui/material";

export default function Footer() {
    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: 'gray' ,zIndex: 1}} elevation={3}>
            <Typography variant="body1" color="inherit" align="center" sx={{ p: 1 }}>
                © 2022 GRSSL
            </Typography>
        </Paper>
    )
}