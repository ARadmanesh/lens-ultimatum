import React from "react";
//import ReactDOM from "react-dom";
import {
  Typography,
  Container,
  ThemeProvider,
  CssBaseline,
  LinearProgress,
  Grid,
  Paper,
  Button,
  Avatar,
  Box,
  Badge
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { ltrTheme } from "./utils/theme";

const theme = ltrTheme;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    //textAlign: 'center'
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <div>
        <CssBaseline />

        <LinearProgress variant="determinate" />

        <Container maxWidth="sm" className="study-container">
          <Grid
            container
            spacing={2}
            direction="column"
            justify="flex-start"
            alignItems="stretch"
          >
            <Grid item>
              <Paper className="view-container">
                {/* Here the study view starts */}
                <Grid container direction='column' spacing={2} alignItems='stretch' justify-contents='flex-start' className='ultimatum-container'>
                  <Grid item>
                    <Typography variant="h4">rule description</Typography>
                  </Grid>
                  <Grid item container direction='row' justify="space-around" alignItems='center'>
                    <Grid item><Grid container direction='column' justify="space-around" alignItems='center'>
                      <Typography color='textSecondary' variant='caption'>Trial: 1 of 3</Typography>
                    </Grid></Grid>
                  </Grid>
                  {/* Box */}
                    <Grid item xs={12} spacing={2}>
                      <Paper className={classes.paper} elevation={3}>
                        <Grid container direction='row' justifyContent="space-around" alignItems='center'>
                          <Grid item>
                            <Typography aligin>Player (12)</Typography>
                          </Grid>
                        </Grid>    
                        <Grid container direction="row">
                          <Grid item xs={4}>
                            <Avatar alt="Marry Stone" src="/images/avatars/marry-avatar.jpg" className={classes.large} />
                            <Typography variant="body1" color="textPrimary" component="p"> Marry Stone</Typography>
                            <Typography variant="body2" color="textSecondary" component="p">27 years old</Typography>
                            <Typography variant="body2" color="textSecondary" component="p">Nurse</Typography>
                          </Grid>
                          <Grid item xs={8}  justifyContent="center" alignItems="center">
                            <Box height={1}>
                              <MonetizationOnIcon key="1" />
                              <MonetizationOnIcon key="2" />
                              <MonetizationOnIcon key="3" />
                              <MonetizationOnIcon key="4" />
                              <MonetizationOnIcon key="5" />
                              <MonetizationOnIcon key="6" />
                              <MonetizationOnIcon key="7" />
                              <MonetizationOnIcon key="8" />
                              <MonetizationOnIcon key="9" />
                              <MonetizationOnIcon key="10" />
                              <Badge badgeContent={2} color="primary">
                                <AttachMoneyIcon />
                              </Badge>

                            </Box>
                          </Grid>
                        </Grid>
                        <Grid container direction='row' justifyContent="space-around" alignItems='center'>
                          <Grid item>
                            <Typography aligin>Total: 12</Typography>
                          </Grid>
                        </Grid>    
                      </Paper>
                    </Grid>
                  {/* Box */}
                    <Grid item xs={12}>
                      <Paper className="">
                        <Grid container>
                          <Grid item xs={12}>
                            <Typography>Pot (4)</Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <div>
                              <MonetizationOnIcon key="1" />
                              <MonetizationOnIcon key="2" />
                              <MonetizationOnIcon key="3" />
                              <MonetizationOnIcon key="4" />
                            </div>
                          </Grid>
                          <Grid item xs={12}>
                            Total: 4
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                  {/* Box */}
                    <Grid item xs={12}>
                      <Paper className="">
                        <Grid container>
                          <Grid item xs={12}>
                            <Typography>Opponent (2)</Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <div>
                              <MonetizationOnIcon key="1" />
                              <MonetizationOnIcon key="2" />
                            </div>
                          </Grid>
                          <Grid item xs={12}>
                            Total: 2
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>

                  <Grid item container direction="row" justify="space-around" alignItems='center'>
                    <Button size='large' color='primary' variant='outlined' onClick={()=> {console.log('finish')}}>finish</Button>
                  </Grid>
                </Grid>
                {/* study view ends */}

              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
}
export default App;
