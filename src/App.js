import rtl                           from 'jss-rtl'
import Main                          from './components/Main'
import theme                         from './theme'
import React                         from 'react'
import { create }                    from 'jss'
import { StylesProvider, jssPreset } from '@material-ui/core/styles'
import { 
  Box,
  CssBaseline, 
  ThemeProvider, 
} from '@material-ui/core'

const jss = create({ plugins: [...jssPreset().plugins, rtl()] })

export default function App() {

  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Box display='flex' flexDirection='column'>
            <Main/>
        </Box>
      </ThemeProvider>
    </StylesProvider>

  )
}





  //   style={{ 
  //     backgroundImage: `url(${bg_home})`, 
  //     minHeight: '90vh',
  //     backgroundPosition: 'center',
  //     backgroundRepeat: 'no-repeat',
  //     backgroundSize: 'cover'
  // }}