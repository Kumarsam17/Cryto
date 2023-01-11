import { Button, Container, Heading, HStack, Image, Text, VStack,RadioGroup, Radio } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '../index';
import Loader from './Loader';
import Errorpage from './Errorpage';
import CoinCard from './CoinCard';


const Coins = () => {

  const [coins,setCoins]=useState([]);
  const [loader,setLoader]=useState(true);
  const [error,setError] =useState(false);
  const [page,setPage] =useState(1);
  const [currency,setCurrency] =useState("inr");

  const CurrenySymbol =currency==="inr"?"₹":currency==="eur" ? "€" :"$";
  const changePage =(page)=>{
    setPage(page)
    setLoader(true)
  }
  const btns =new Array(132).fill(1)

  useEffect(()=>{
    const fetchCoins =async()=>{
    try {
      
        const {data}= await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`)
  
        console.log(data)
        setCoins(data);
        setLoader(false);
      }
      
    catch (error) {
      setLoader(false);
      setError(true)
      alert("API fetch error")
      
    }}
    fetchCoins();
  },[currency,page])

  if(error) return <Errorpage />
  return (
    <Container maxW={"container.xl"}>
    {
      loader ?<Loader /> :<>
      <HStack p={"5"} spacing={"10"}>
      <RadioGroup  onChange={setCurrency}>
       <Radio value='inr'>₹</Radio>
       <Radio value='usd'>$</Radio>
       <Radio value='eur'>€</Radio>
      </RadioGroup>
      </HStack>
      <HStack wrap={"wrap"} >
        {coins.map((i)=>(
           <CoinCard
           id={i.id} 
           key={i.id}
           name={i.name}
           img={i.image}
           CurrenySymbol={CurrenySymbol}
           price={i.current_price}/>
        ))}
      </HStack>
      <HStack w="full" overflowX={"auto"} m={"5"}>
        {
          btns.map((item,index)=>(
            <Button key={index} bgColor={"black"} onClick={()=>changePage(index+1)}>{index+1}</Button>
          ))
        }
      </HStack>
      </>
    }
    </Container>
  )
}

export default Coins;

