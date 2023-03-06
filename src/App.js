import React, {useState, useEffect, Fragment, useCallback, memo} from "react";
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
  Badge
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { grey, blueGrey, teal } from '@material-ui/core/colors';
import { sizing } from '@material-ui/system';
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { ltrTheme } from "./utils/theme";
import { DndProvider, useDrag , useDrop, DragPreviewImage } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import { HTML5Backend } from 'react-dnd-html5-backend';

//css
import "./app.css";

const theme = ltrTheme;
const useDemoPart = false;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    //textAlign: 'center'
  },
  large: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  height100: {
    height: '100%',
  },
  grey: {
    color: theme.palette.getContrastText(grey[500]),
    backgroundColor: grey[500],
  },
  blueG: {
    color: theme.palette.getContrastText(blueGrey[500]),
    backgroundColor: blueGrey[500],
  }
}));


// Item types of draggable components which now are only one type
const ItemTypes = {
  OPPONENT: 'opponent',
  POT: 'pot',
  PLAYER: 'player',
}

export default function App() {
  const isTouchScreen = () => {
    return ( 'ontouchstart' in window ) ||
           ( navigator.maxTouchPoints > 0 ) ||
           ( navigator.msMaxTouchPoints > 0 );
  }

  const classes = useStyles();
  const tokens = 10;
  const isTouch = isTouchScreen();
  console.log(isTouch);
  const [boxes, setBoxes] = useState(
    [
      {name: ItemTypes.OPPONENT , amount : 0, accepts: [ItemTypes.POT, ItemTypes.PLAYER]},
      {name: ItemTypes.POT , amount : tokens, accepts: [ItemTypes.PLAYER, ItemTypes.OPPONENT]},
      {name: ItemTypes.PLAYER , amount : 0, accepts: [ItemTypes.POT, ItemTypes.OPPONENT]},
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

  const renderBoxes = () => {
    var dndBackend = isTouchScreen() ? TouchBackend : HTML5Backend;
    console.log(dndBackend);
    return (
      <Grid item container spacing={3}  alignItems='stretch' justifyContent='space-between' className='boxes-container'>
        <DndProvider backend={dndBackend} options={isTouchScreen()?{enableMouseEvents: true}:{}}>
          {boxes.map(({name, amount, accepts}, index) => (
            <RepositoryBox
              accept={accepts}
              name={name}
              amount={amount}
              onDrop={(item) => handleDrop(name, item)}
              key={index}
            />
          ))}
        </DndProvider>
      </Grid>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <div>
        <CssBaseline />

        <LinearProgress variant="determinate" />

        <Container maxWidth="sm" className="study-container">
          <Grid container spacing={2} direction="column" justifyContent="flex-start" alignItems="stretch">
            <Grid item>
              <Paper className="view-container">
                {/* Here the study view starts */}
                <Fragment>
                  <Grid container direction='column' spacing={2} alignItems='stretch' justifyContent='flex-start' className='ultimatum-container'>
                    <Grid item>
                      <Typography variant="body2">opus irum doctorn ista manis ores fiendorus asten vaskaris</Typography>
                    </Grid>
                    {!useDemoPart && renderBoxes() }

                    <Grid item container direction='row' justifyContent="space-around" alignItems='center'>
                      <Grid item><Grid container direction='column' justifyContent="space-around" alignItems='center'>
                        <Typography color='textSecondary' variant='caption'>Trial 1 of 3</Typography>
                      </Grid></Grid>

                      <Grid item><Grid container direction='column' justifyContent="space-around" alignItems='center'>
                        <Button size='large' color='primary' variant='outlined' onClick={()=> {console.log('finish')}}>Collect</Button>
                      </Grid></Grid>

                      <Grid item><Grid container direction='column' justifyContent="space-around" alignItems='center'>
                        <Typography variant="body1">Total: 12</Typography>
                      </Grid></Grid>
                    </Grid>
                  </Grid>
                </Fragment>
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
  const classes = useStyles(theme);
  const style = {
    lineHeight: 'normal',
    height: '128px',
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
    backgroundColor = blueGrey[800]
  }

  const tokensList = [];
  for(let i=0; i < amount; i++) {
    tokensList.push(<MonetizedToken type={name} name={name+i.toString()} key={name+i.toString()} boxName={name} />);
  }

  return (
    <Grid item xs={12}>
      <Paper ref={drop} className={classes.paper} style={{ ...style, backgroundColor }} elevation={3} >
        <Grid container alignItems="center" justifyContent="center" direction="row" className={classes.height100}>
          <Grid item xs={4}>
            {name === ItemTypes.OPPONENT &&
              <OpponentInfoBar />
            }
            {name !== ItemTypes.OPPONENT &&
              <Typography>{name}</Typography>
            }
          </Grid>
          <Grid item xs={7}>
            <Grid container direction="row" justifyContent="flex-start" alignItems="center">
              {tokensList}
            </Grid>
          </Grid>
          <Grid item xs={1}>
              {/* <Typography variant="caption" color="textSecondary">Total <br /></Typography> */}
              <Avatar className={[classes.small,classes.grey].join(' ')}>{amount}</Avatar>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
})

const OpponentInfoBar = memo(function OpponentInfoBar(){
  const classes = useStyles();
  return (
    <>
      <Avatar alt="Marry Stone" src="/images/avatars/marry-avatar.jpg" className={classes.large} />
      <Typography variant="body1" color="textPrimary" component="p"> Marry Stone</Typography>
      <Typography variant="body2" color="textSecondary" component="p">27 years old</Typography>
      <Typography variant="body2" color="textSecondary" component="p">Nurse</Typography>
    </>
  );
})
/***
 * Component which renders coin tokens and handles dragging events
 */
const MonetizedToken = memo(function MonetizedToken({type, name, boxName}) {
  const classes = useStyles(theme);
  const style = {
    cursor: 'move',
    backgroundColor: 'rbga(0,0,0,0)'
  }

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type,
      item: { name, boxName },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [name],
  )
  return (
    <Grid item>
      <DragPreviewImage connect={preview} src={process.env.PUBLIC_URL + "/images/token.png"} />
      <span ref={drag} role="Handle" className='token-span' style={{ ...style, opacity: isDragging ? 0.5 : 1,}}> <MonetizationOnIcon /> </span>
    </Grid>
  );
})
