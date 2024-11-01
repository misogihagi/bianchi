import type {ChangeEvent,FC} from 'react'

import Button from '@mui/material/Button';
import {PhotoCamera} from '@mui/icons-material';

const filesToBuffer=(files:FileList):ArrayBuffer[]=>{
  const fileReader = new FileReader();
  let result=[] as ArrayBuffer[]
  for ( let i = 0; i < files.length; i++ ) {
      fileReader.readAsArrayBuffer( files[i] );
      fileReader.onload = function() {
        result.push(fileReader.result as ArrayBuffer)
      };
  }
  return result
}


type ImageUploaderProps={
    setImages:(images:ArrayBuffer[])=>void
}

export const ImageUploader:FC<ImageUploaderProps>=({setImages})=>(
    <>
    <input
accept="image/*"
id="image-files"
multiple
type="file"
style={{display:'none'}}
onChange={(e:ChangeEvent<HTMLInputElement>)=>{
  if(e.target.files)
    setImages(filesToBuffer(e.target.files))
}}
/>
<label htmlFor="image-files">
       <Button variant="contained" color="primary" component="span">
<PhotoCamera />
  Upload
</Button>
</label>
</>
)