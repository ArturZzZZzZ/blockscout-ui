import { chakra } from '@chakra-ui/react';
import React from 'react';

import getDefaultTransitionProps from 'theme/utils/getDefaultTransitionProps';

const COUNTER_OVERLOAD = 50;

type Props = {
  count?: number | null;
  isActive?: boolean;
};

const TabCounter = ({ count, isActive }: Props) => {

  // const zeroCountColor = useColorModeValue('blackAlpha.400', 'whiteAlpha.400');

  if (count === undefined || count === null) {
    return null;
  }

  return (
    <chakra.span
      fontSize="10px"
      color={ isActive ? 'black' : 'white' }
      bg={ isActive ? 'white' : '#131414' }
      p="5px"
      borderRadius="full"
      ml={ 1 }
      { ...getDefaultTransitionProps() }
    >
      { count > COUNTER_OVERLOAD ? `${ COUNTER_OVERLOAD }+` : count }
    </chakra.span>
  );
};

export default TabCounter;
