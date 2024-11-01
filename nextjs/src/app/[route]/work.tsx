"use client"
import * as React from 'react'
import type { FC } from 'react'
import type { Card  as Data} from '../../../../interface/graphql'

import { useState } from 'react'
import { readData } from '../../graphql/client'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import ReactCardFlip from 'react-card-flip';
import {ArrowBackIos,ArrowForwardIos} from '@mui/icons-material';
import { Typography } from '@mui/material'

type Props={
  toggleIsFlipped:()=>void,
  stepBack:()=>void,
  stepForward:()=>void,
  text:string,
  progress:string,
}

const Note:FC<Props>=(props)=>{
  const spotEvent=(cbFn:()=>void)=>(e:React.MouseEvent<Element, MouseEvent>)=>{
    e.stopPropagation()
    cbFn()
  }
return <Card variant="outlined"  onClick={()=>props.toggleIsFlipped()}>
  <CardContent sx={{
    display: 'flex',
    justifyContent: 'center' ,
    alignItems: 'center',
    minWidth: 600,
    minHeight: 600,
    maxWidth:1200,
    maxHeight:1200,
    "borderBottom":1
  }}>
    {props.text}
  </CardContent>
  <Box sx={{
    display: 'flex',
    justifyContent: 'space-around'
  }}>
  <CardActions>
    <Button variant="outlined" onClick={spotEvent(props.stepBack)}>
      <ArrowBackIos/>
    </Button>
  </CardActions>
  <Typography>{props.progress}</Typography>
  <CardActions>
    <Button variant="outlined" onClick={spotEvent(props.stepForward)}>
      <ArrowForwardIos/>
    </Button>
  </CardActions>
  </Box>
</Card>
}

export function Page(){
  const [isFlipped, setIsFlipped] = useState(false);
  const [data, setData] = useState([] as Data[]);
  const [index, setIndex] = useState(0);

  readData().then(setData)

  const stepBack=()=>{
    if(index>0)setIndex(index-1)
  }
  const stepForward=()=>{
    if(index<data.length-1)setIndex(index+1)
  }

  return (
    <>
<Button variant="contained" color="primary" href="/edit">
編集へ
</Button>
      <Box sx={{
            display: 'flex',
            justifyContent: 'center' ,        
      }}>
        <ReactCardFlip isFlipped={isFlipped} 
          flipSpeedBackToFront={0.1}
          flipSpeedFrontToBack={0.1}
        >
          <Note progress={((index+1)+'/'+data.length)} text={data[index]?.front} toggleIsFlipped={()=>{setIsFlipped(!isFlipped)}} stepBack={stepBack} stepForward={stepForward}/>
          <Note progress={((index+1)+'/'+data.length)} text={data[index]?.back} toggleIsFlipped={()=>{setIsFlipped(!isFlipped)}}  stepBack={stepBack} stepForward={stepForward}/>
      </ReactCardFlip>
      </Box>
  </>
  )
}

export default Page
