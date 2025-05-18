import React from 'react'
import {Typography, Button} from '@mui/material';
import { Container,PageNumber, Buttonn } from './styles';

const Pagination = ({currentPage, totalPages, setPage}) => {
   
   const handlePrev=()=>{
    if(currentPage!= 1)
    setPage((prevpage)=>prevpage-1);
   }
   const handleNext=()=>{
    if(currentPage!=totalPages)
    setPage((prevpage)=>prevpage+1);


   }
  return (
    <Container >
        <Buttonn onClick={handlePrev} variant="contained" color="primary" type="button">Prev</Buttonn>
        <PageNumber variant='h4' >{currentPage}</PageNumber>
        <Buttonn onClick={handleNext} variant="contained" color="primary" type="button">Next</Buttonn>
    </Container>
  )
}

export default Pagination