import { Tooltip, chakra, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

import IconSvg from 'ui/shared/IconSvg';

import type { TxCourseType } from './utils';

interface Props {
  isLoading?: boolean;
  type: TxCourseType;
  className?: string;
}

const AddressFromToIcon = ({ isLoading, type, className }: Props) => {
  const styles = {
    'in': {
      color: useColorModeValue('green.500', '#00D4BF'),
      bgColor: useColorModeValue('green.50', '#001917'),
    },
    out: {
      color: useColorModeValue('yellow.600', '#F3B940'),
      bgColor: useColorModeValue('orange.50', '#282828'),
    },
    self: {
      color: useColorModeValue('blackAlpha.400', 'whiteAlpha.400'),
      bgColor: useColorModeValue('blackAlpha.50', 'whiteAlpha.50'),
    },
    unspecified: {
      color: useColorModeValue('gray.500', 'gray.1000'),
      bgColor: 'transparent',
    },
  };
  const labels = {
    'in': 'Incoming txn',
    out: 'Outgoing txn',
    self: 'Txn to the same address',
  };

  const icon = (
    <IconSvg
      name="arrows/east"
      { ...(styles[type]) }
      className={ className }
      isLoading={ isLoading }
      boxSize={ 5 }
      flexShrink={ 0 }
      borderRadius="sm"
    />
  );

  if (type === 'unspecified') {
    return icon;
  }

  return (
    <Tooltip label={ labels[type] }>
      { icon }
    </Tooltip>
  );
};

export default React.memo(chakra(AddressFromToIcon));
