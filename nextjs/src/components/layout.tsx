"use client"
import * as React from 'react'
import type { ReactNode } from 'react'

import Head from 'next/head'
import Image from 'next/image'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography,Stack,Divider,Box } from '@mui/material'

export default function Layout({ children }:{children:ReactNode}) {
  return (
    <>
    <html lang="en">
        <title>シンプル単語帳</title>
<meta name="description" content="simple memorization training" />
<link rel="icon" href="/favicon.ico" />
      <body>

<main>
  <AppRouterCacheProvider>
  <Stack
  
  divider={<Divider orientation="vertical" flexItem />}
  spacing={5}
  >
<Box>

<Accordion>
<AccordionSummary
  expandIcon={<ExpandMoreIcon />}
  aria-controls="panel1a-content"
  id="panel1a-header"
>
  <Typography>setting</Typography>
</AccordionSummary>
<AccordionDetails>
  <></>
</AccordionDetails>
</Accordion>
</Box>
<Box>

{children}
</Box>
</Stack>
</AppRouterCacheProvider>
</main>
</body>
    </html>
        </>
  )
}
