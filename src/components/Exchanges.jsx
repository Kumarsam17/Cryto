import { Container, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '../index';
import Loader from './Loader';
import Errorpage from './Errorpage';


const Exchanges = () => {

  const [exchanges,setExchanges]=useState([]);
  const [loader,setLoader]=useState(true);
  const [error,setError] =useState(false);

  useEffect(()=>{
    const fetchURL =async()=>{
    try {
      
        const {data}= await axios.get(`${server}/exchanges`)
  
        
        setExchanges(data);
        setLoader(false);
      }
      
    catch (error) {
      setLoader(false);
      setError(true)
      alert("API fetch error")
      
    }}
    fetchURL();
  },[])

  if(error) return <Errorpage />
  return (
    <Container maxW={"container.xl"}>
    {
      loader ?<Loader /> :<>
      <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
        {exchanges.map((i)=>(
           <a href={i.url} key={i.id} target="blank">
           <VStack w={"52"} shadow={"lg"} borderRadius={"lg"} transition={"all 0.3"} m={"4"}
           css={{
            "&:hover":{transform:"scale()1.1"}
           }} >
             <Image src={i.image} w={"10"} h={"10"} objectFit={"contain"} alt={"Exchanges"}/>
             <Heading size={"md"} noOfLines={1}>
               {i.rank}
             </Heading>
             <Text noOfLines={1}>
               {i.name}
             </Text>
             
           </VStack>
         </a>
        ))}
      </HStack>
      </>
    }
    </Container>
  )
}

export default Exchanges;

export const ExchangeCard =({name,image,rank,url})=>{
  <a href={url} target="blank">
    <VStack>
      <Image src={image} w={"10"} h={"10"} objectFit={"contain"} alt={"Exchanges"}/>
      <Heading size={"md"} noOfLines={1}>
        {rank}
      </Heading>
      <Text noOfLines={1}>
        {name}
      </Text>
      {console.Console("mounted")}
    </VStack>
  </a>
}