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
import { sizing } from '@material-ui/system';
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { ltrTheme } from "./utils/theme";
import { DndProvider, useDrag , useDrop} from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend'

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
  }
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

  const renderBoxes = () => {
    return (
      <Grid item container spacing={3}  alignItems='stretch' justifyContent='space-between' className='boxes-container'>
        <DndProvider backend={TouchBackend} options={{enableMouseEvents: true}}>
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

  const renderDemoBoxes = () => {
    return (
      <Fragment>
        <Grid item xs={12}>
          <Paper className={classes.paper} elevation={3} >
            <Grid container direction="row">
              <Grid item xs={4}>
                  <Avatar alt="Marry Stone" src="/images/avatars/marry-avatar.jpg" className={classes.large} />
                  <Typography variant="body1" color="textPrimary" component="p"> Marry Stone</Typography>
                  <Typography variant="body2" color="textSecondary" component="p">27 years old</Typography>
                  <Typography variant="body2" color="textSecondary" component="p">Nurse</Typography>
              </Grid>
              <Grid item xs={8}>
                <Grid container direction="row" justifyContent="felx-start" alignItems="center" className={classes.height100}>
                  <Grid item><MonetizationOnIcon role="Handle" data-test-id={`token`} /> </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container direction='row' justifyContent="flex-end" alignItems='center'>
              <Grid item>
                <Typography variant="body2" color="textSecondary" component="span">Total: 12</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        {/* BOX */}
        <Grid item xs={12}>
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
              <Grid item xs={8} className={classes.height100}>
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
                  <span class="stack-badge">
                    <Badge badgeContent={2} color="primary">
                      <AttachMoneyIcon />
                    </Badge>
                  </span>
              </Grid>
            </Grid>
            <Grid container direction='row' justifyContent="space-around" alignItems='center'>
              <Grid item>
                <Typography aligin>Total: 12</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        {/* BOX */}
        <Grid item xs={12} spacing={2}>
          <Paper className={classes.paper} elevation={3}>
            <Grid container direction='row'>
              <Grid item xs={12}>
                <Avatar alt="Marry Stone" src="/images/avatars/marry-avatar.jpg" className={classes.large} />
                <Typography variant="body1" color="textPrimary" component="p"> Marry Stone</Typography>
                <Typography variant="body2" color="textSecondary" component="p">27 years old</Typography>
                <Typography variant="body2" color="textSecondary" component="p">Nurse</Typography>
                <Typography align='right'>Player (12)</Typography>
              </Grid>
              <Grid item  xs={12}>
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
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        {/* Box */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
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
      </Fragment>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <div>
        <CssBaseline />

        <LinearProgress variant="determinate" />

        <Container maxWidth="sm" className="study-container">
          <Grid container spacing={2} direction="column" justify="flex-start" alignItems="stretch">
            <Grid item>
              <Paper className="view-container">
                {/* Here the study view starts */}
                <Fragment>
                  <Grid container direction='column' spacing={2} alignItems='stretch' justifyContent='flex-start' className='ultimatum-container'>
                    <Grid item>
                      <Typography variant="body2">opus irum doctorn ista manis ores fiendorus asten vaskaris</Typography>
                    </Grid>
                    {!useDemoPart && renderBoxes() }
                    {useDemoPart && renderDemoBoxes() }

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
  const classes = useStyles();
  const style = {
    lineHeight: 'normal',
    height: '130px',
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
    <Grid item xs={12}>
      <Paper ref={drop} className={classes.paper} style={{ ...style, backgroundColor }} elevation={3} >
        <Grid container alignItems="center" direction="row" className={classes.height100}>
          <Grid item xs={4}>
            {name === ItemTypes.OPPONENT &&
              <OpponentInfoBar />
            }
            {name !== ItemTypes.OPPONENT &&
              <Typography>{name}</Typography>
            }
          </Grid>
          <Grid item xs={7}>
            <Grid container direction="row" justifyContent="felx-start" alignItems="center">
              {tokensList}
            </Grid>
          </Grid>
          <Grid item xs={1}>
            <Grid container direction="column" justifyContent="center" alignItems="center">
              {/* <Typography variant="caption" color="textSecondary">{t('ultimatum.box.total_label', { amount: amount })}</Typography> */}
              <Badge color="secondary" badgeContent={amount} showZero>
                <MonetizationOnIcon color={name === ItemTypes.PLAYER ? "primary" : "disabled"} fontSize="large" />
              </Badge>
            </Grid>
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
  const classes = useStyles();
  const style = {
    cursor: 'move',
    color: 'black'
  }

  const [collected, drag, dragPreview] = useDrag(
    () => ({
      type,
      item: { name, boxName },
    })
  )
  return collected.isDragging ? (
   <Grid item><MonetizationOnIcon ref={dragPreview} style={{ opacity: 0.5}} /></Grid>
  ) : (
    <Grid item><MonetizationOnIcon ref={drag} {...collected} role="Handle" data-test-id={`token`} /> </Grid>
  )
    {/*
    <span ref={dragPreview} style={...style,{ opacity: isDragging ? 0.5 : 1}}>
      <span ref={drag} role="Handle" data-test-id={`token`}>
        <MonetizationOnIcon  />
      </span>
    </span>
    */}

})
