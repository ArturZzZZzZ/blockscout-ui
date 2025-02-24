import { checkboxAnatomy as parts } from '@chakra-ui/anatomy';
import {
  createMultiStyleConfigHelpers,
  defineStyle,
  cssVar,
} from '@chakra-ui/styled-system';
import { mode } from '@chakra-ui/theme-tools';
import { runIfFn } from '@chakra-ui/utils';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const $size = cssVar('checkbox-size');

const baseStyleControl = defineStyle((props) => {
  const { colorScheme: c } = props;

  return {
    borderWidth: '1px',
    _checked: {
      bg: mode(`${ c }.500`, `transparent`)(props),
      borderColor: mode(`${ c }.500`, `green.500`)(props),
      _hover: {
        bg: mode(`${ c }.600`, `transparent`)(props),
        borderColor: mode(`${ c }.600`, `green.500`)(props),
      },
    },
    _indeterminate: {
      bg: mode(`${ c }.500`, `${ c }.300`)(props),
      borderColor: mode(`${ c }.500`, `${ c }.300`)(props),
    },
  };
});

const sizes = {
  sm: definePartsStyle({
    control: { [$size.variable]: 'sizes.3' },
    label: { fontSize: 'sm' },
    icon: { fontSize: '3xs' },
  }),
  md: definePartsStyle({
    control: { [$size.variable]: 'sizes.4' },
    label: { fontSize: 'md' },
    icon: { fontSize: '2xs' },
  }),
  lg: definePartsStyle({
    control: { [$size.variable]: 'sizes.5' },
    label: { fontSize: 'md' },
    icon: { fontSize: '2xs' },
  }),
};

const baseStyleLabel = defineStyle({
  _disabled: { opacity: 0.2 },
});

const baseStyle = definePartsStyle((props) => ({
  label: baseStyleLabel,
  control: runIfFn(baseStyleControl, props),
  icon: {
    color: 'green.500',
  },
}));

const Checkbox = defineMultiStyleConfig({
  baseStyle,
  sizes,
});

export default Checkbox;
