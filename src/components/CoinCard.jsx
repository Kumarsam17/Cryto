import React from 'react';
import {Text,Heading,VStack,Image} from '@chakra-ui/react';
import { Link } from 'react-router-dom';


const CoinCard = ({id,name,img,price,symbol,CurrenySymbol="₹"}) => {
  return (<>
  
        <Link to={`/coins/${id}`} >
          <VStack w={"52"} p={"8"} shadow={"lg"} borderRadius={"lg"} transition={"scale(1.1)"} m={"4"}>
            <Image src={img} w={"100"} h={"100"} objectFit={"contain"} alt={"Exchanges"}/>
            <Heading size={"md"} noOfLines={1}>
              {symbol}
            </Heading>
            
            <Text noOfLines={1}>{name}</Text>
            <Text noOfLines={1}>{price ? `${CurrenySymbol} ${price}`:"NA"}</Text>
            
          </VStack>
        </Link>
        </>

  )
}


export default CoinCard;