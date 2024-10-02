import type { FC } from 'react'
import type { NextPage } from 'next'

import { useState } from 'react'
import { createData,uploadImages } from '../graphql/client'

import Button from '@mui/material/Button';
import {ArrowBackIos,ArrowForwardIos,PhotoCamera} from '@mui/icons-material';
import { Typography,TextareaAutosize,Stack,Card,CardContent } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2';

import ReactMarkdown from 'react-markdown';

import { ImageUploader } from '../components/ImageUploader';

type CardsProps={
  setFront:(value:string)=>void,
  setBack:(value:string)=>void,
  getFront:()=>string,
  getBack:()=>string,
}
const Cards:FC<CardsProps>=({setFront,setBack,getFront,getBack})=>(
<>
<Grid container spacing={2}>
<Grid maxWidth="sm" width="50%">

  <TextareaAutosize
  minRows={4}
  aria-label="frontside textarea"
  placeholder="frontside card"
  onChange={e=>setFront(e.target.value)}
  style={{width:"100%"}}
/>
</Grid>

<Grid maxWidth="sm" width="50%">
<Card>
  <ReactMarkdown>
{getFront()}
</ReactMarkdown>
</Card>
</Grid>
</Grid>

<Grid container spacing={2}>
<Grid maxWidth="sm" width="50%">
<TextareaAutosize
  minRows={4}
aria-label="backside textarea"
placeholder="backside card"
onChange={e=>setBack(e.target.value)}
style={{width:"100%"}}
/>
</Grid>
<Grid maxWidth="sm" width="50%">
<Card>
  <ReactMarkdown>
{getBack()}
</ReactMarkdown>
</Card>
</Grid>
</Grid>
</>
)

type ConctrolProps={
  stepBack:()=>void,
  createNote:()=>void,
  deleteNote:()=>void,
  stepForward:()=>void,
}
const Control:FC<ConctrolProps>=({stepBack,createNote,deleteNote,stepForward})=>(
  <Stack 
  direction="row"
  >
    <Button variant="outlined" onClick={createNote}>
    <Typography>new</Typography>
    </Button>
    <Button variant="outlined" onClick={deleteNote}>
    <Typography>delete</Typography>
    </Button>
    <Button variant="outlined" onClick={stepForward}>
    <ArrowBackIos/>
    </Button>
    <Button variant="outlined" onClick={stepBack}>
    <ArrowForwardIos/>
    </Button>
</Stack>
)

const Home: NextPage = () => {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');

  const stepBack=()=>{}
  const stepForward=()=>{}
  const createNote=()=>{
    createData({front,back})
  }
  const deleteNote=()=>{}
  return (
    <>
<Button variant="contained" color="primary" href="/work">
取り組む
</Button>
    <Stack
    direction="column"
    justifyContent="center"
    alignItems="center"
  >
    <ImageUploader setImages={uploadImages}></ImageUploader>
    <Cards setFront={setFront} setBack={setBack} getFront={()=>front} getBack={()=>back}></Cards>
    <Control
    stepBack={stepBack} stepForward={stepForward}
    createNote={createNote}  deleteNote={deleteNote}
    ></Control>

  </Stack>
  </>
  )
}

export default Home
