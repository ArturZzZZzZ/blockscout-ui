import type { ColorMode } from '@chakra-ui/react';
import type { Size, ChakraStylesConfig } from 'chakra-react-select';

import type { Option } from './types';

import theme from 'theme/theme';
import getFormStyles from 'theme/utils/getFormStyles';

function getValueContainerStyles(size?: Size) {
  switch (size) {
    case 'sm':
    case 'md': {
      return {
        paddingLeft: 4,
      };
    }
    case 'lg': {
      return {
        paddingLeft: 6,
      };
    }
    default: {
      return {};
    }
  }
}

function getSingleValueStyles(size?: Size) {
  switch (size) {
    case 'sm':
    case 'md': {
      return {
        top: '26px',
      };
    }
    case 'lg': {
      return {
        top: '38px',
      };
    }
    default: {
      return {};
    }
  }
}

const getChakraStyles: (colorMode: ColorMode) => ChakraStylesConfig<Option> = (colorMode) => {
  const formColor = getFormStyles({ colorMode, colorScheme: 'blue', theme });

  return {
    control: (provided, state) => ({
      ...provided,
      // eslint-disable-next-line no-nested-ternary
      borderColor: state.menuIsOpen ? 'green.500!important' : state.hasValue ? formColor.input.filled.borderColor : formColor.input.empty.borderColor,
      borderRadius: '16px',
    }),
    inputContainer: (provided) => ({
      ...provided,
      py: 0,
      mx: 0,
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      ...getValueContainerStyles(state.selectProps.size),
      py: 0,
    }),
    singleValue: (provided, state) => ({
      ...provided,
      mx: 0,
      transform: 'none',
      ...getSingleValueStyles(state.selectProps.size),
    }),
    menuList: (provided) => ({ ...provided, bg: 'gray.1200', borderRadius: '12px', border: '1px solid', borderColor: 'gray.1400' }),
    option: (provided, state) => {

      return { ...provided,
        bg: state.isSelected ? '#112B29' : 'gray.1200',
        color: state.isSelected ? 'green.500' : 'gray.1100',
        cursor: 'pointer', borderRadius: '12px',
        _hover: { bg: 'gray.1300', color: 'green.500' } };
    },
  };
};

export { getChakraStyles };
