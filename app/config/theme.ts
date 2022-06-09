import { extendTheme } from 'native-base';

const theme = extendTheme({
  colors: {
    primary: {
      50: '#E9FCF0',
      100: '#C1F6D6',
      200: '#99F0BC',
      300: '#71E9A1',
      400: '#49E387',
      500: '#22DD6D',
      600: '#1BB157',
      700: '#148541',
      800: '#0D592B',
      900: '#072C16',
    },
    secondary: {
      50: '#EAE5FF',
      100: '#C3B8FF',
      200: '#9D8AFF',
      300: '#775CFF',
      400: '#502EFF',
      500: '#2A00FF',
      600: '#2200CC',
      700: '#190099',
      800: '#110066',
      900: '#080033',
    },
  },
  components: {
    Button: {
      baseStyle: {
        rounded: 'lg',
      },
      defaultProps: {
        p: 4,
        size: 'lg',
        colorScheme: 'gray',
      },
      variants: {
        solid: {
          bgColor: 'black',
        },
        filled: {
          bgColor: '#FFEA00',
        },
        outline: {
          borderColor: 'black',
          _text: {
            color: 'black',
          },
        },
        disabled: {
          bgColor: 'gray.100',
          _text: {
            color: 'gray.400',
          },
        },
      },
    },
    Input: {
      baseStyle: {
        rounded: 'lg',
      },
      defaultProps: {
        p: 3,
        size: 'lg',
        colorScheme: 'gray',
        _focus: { borderColor: 'gray.400' },
      },
      variants: {
        filled: {
          bgColor: 'gray.100',
        },
      },
    },
    Select: {
      baseStyle: {
        rounded: 'lg',
        bgColor: 'gray.100',
      },
      defaultProps: {
        fontSize: 'sm',
        textAlign: 'center',
      },
      variants: {
        filled: {
          borderWidth: 0,
          bgColor: 'gray.100',
        },
      },
    },
  },
});

export default theme;
