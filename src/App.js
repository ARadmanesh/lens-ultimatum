import React, {useState, useEffect, useCallback, memo} from "react";
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
import { DndProvider, useDrag , useDrop} from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

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

// Item types of draggable components which now are only one type
const ItemTypes = {
  OPPONENT: 'opponent',
  POT: 'pot',
  PLAYER: 'player',
}

export default function App() {
  const classes = useStyles();
  const tokens = 10;
  const [boxes, setBoxes] = useState(
    [
      {name: ItemTypes.PLAYER , amount : 0, accepts: [ItemTypes.POT, ItemTypes.OPPONENT]},
      {name: ItemTypes.POT , amount : tokens, accepts: [ItemTypes.PLAYER, ItemTypes.OPPONENT]},
      {name: ItemTypes.OPPONENT , amount : 0, accepts: [ItemTypes.POT, ItemTypes.PLAYER]},
    ]
  );

  /***
   * token has been moved by player to a different box
   */
  const handleDrop = useCallback(
    (name, item) => {
      // item is the entity that is dropped and has {name, boxName}
      // name is the name of the repositoryBox that entity has been dropped into
      const fromBox = item.boxName;
      const destBox = name;
      //console.log('dropped on: ',destBox);
      //console.log('from : ',fromBox);
      setBoxes(boxes.map(item => {
        if(item.name === fromBox){
          return {...item, amount: item.amount-1};
        }else if(item.name === destBox){
          return {...item, amount: item.amount+1};
        }else{
          return item;
        }
      }));
    },
    [boxes],
  )

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
                  <DndProvider backend={HTML5Backend}>
                    {boxes.map(({name, amount, accepts}, index) => (
                      <RepositoryBox
                        accept={accepts}
                        name={name}
                        amount={amount}
                        onDrop={(item) => handleDrop(name, item)}
                        key={index}
                      />
                    ))}

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
                            <Box height={1}  justifyContent="center" alignItems="center">
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
                  </DndProvider>

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

/***
 * Container box for monetized entities and their interactions
 */
const RepositoryBox = memo(function RepositoryBox({
  name,
  amount,
  onDrop,
  accept,
})
{
  const style = {
    lineHeight: 'normal',
  }

  const [{ canDrop, isOver }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      //connectDropTarget: connect.dropTarget()
    }),
  })

  const isActive = canDrop && isOver
  let backgroundColor = '#222'
  if (isActive) {
    backgroundColor = 'darkgreen'
  } else if (canDrop) {
    backgroundColor = 'darkkhaki'
  }

  const tokensList = [];
  for(let i=0; i < amount; i++) {
    tokensList.push(<MonetizedToken type={name} name={name+i.toString()} key={name+i.toString()} boxName={name} />);
  }

  return (
    <Grid ref={drop} item xs={12} style={{ ...style, backgroundColor }} data-test-id={"repository"+name} >
      <Paper className='view-container'>
        <Grid container>
          <Grid item xs={12}>
            <Typography>{name} ({amount})</Typography>
            {isActive ? 'release to drop' : ''}
          </Grid>
          <Grid item xs={12}>
              {tokensList}
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
})

/***
 * Component which renders coin tokens and handles dragging events
 */
const MonetizedToken = memo(function MonetizedToken({type, name, boxName}) {

  const style = {
    cursor: 'move',
    color: 'black'
  }

  const [{ opacity }, drag] = useDrag(
    () => ({
      type,
      item: { name, boxName },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [name],
  )
  return (
    <span ref={drag} data-test-id={`token`}>
      <MonetizationOnIcon style={{ ...style, opacity }} />
    </span>
  )

})
