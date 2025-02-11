import type { StyleFunctionProps } from '@chakra-ui/theme-tools';
import { mode, transparentize } from '@chakra-ui/theme-tools';

export default function getFormStyles(props: StyleFunctionProps) {
  return {
    input: {
      empty: {
        // there is no text in the empty input
        // color: ???,
        bgColor: props.bgColor || mode('white', 'gray.1200')(props),
        borderColor: mode('gray.100', 'transparent')(props),
      },
      hover: {
        color: mode('gray.800', 'gray.50')(props),
        bgColor: props.bgColor || mode('white', 'gray.1200')(props),
        borderColor: mode('gray.200', 'transparent')(props),
      },
      focus: {
        color: mode('gray.800', 'gray.50')(props),
        bgColor: props.bgColor || mode('white', 'gray.1200')(props),
        borderColor: mode('blue.400', 'transparent')(props),
      },
      filled: {
        color: mode('gray.800', 'gray.50')(props),
        bgColor: props.bgColor || mode('white', 'gray.1200')(props),
        borderColor: mode('gray.300', 'transparent')(props),
      },
      readOnly: {
        color: mode('gray.800', 'gray.50')(props),
        bgColor: mode('gray.200', 'gray.1200')(props),
        borderColor: mode('gray.200', 'transparent')(props),
      },
      // we use opacity to show the disabled state
      disabled: {
        opacity: 0.2,
      },
      error: {
        color: mode('gray.800', 'gray.50')(props),
        bgColor: props.bgColor || mode('white', 'gray.1200')(props),
        borderColor: mode('red.500', 'transparent')(props),
      },
    },
    placeholder: {
      'default': {
        color: mode('gray.500', 'gray.1000')(props),
      },
      disabled: {
        color: transparentize('gray.500', 0.2)(props.theme),
      },
      error: {
        color: mode('red.500', 'red.500')(props),
      },
    },
  };
}
