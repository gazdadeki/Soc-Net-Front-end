export default {
  palette: {
    primary: {
      light: '#33c9dc',
      main: '#00bcd4',
      dark: '#008394',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff6333',
      main: '#ff3d00',
      dark: '#b22a00',
      contrastText: '#fff'
    }
  },
  spreadThis: {
    typography: {
      useNextVariants: true,
    },
    form: {
      textAlign: 'center',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      justifyContent: 'center',
      margin: 'auto'
    },
    logo: {
      maxWidth: '220px',
      margin: '25px auto 20px auto'
    },
    pageTitle: {
      margin: '15px auto',
      textTransform: 'uppercase',
      fontWeight: '500',
      letterSpacing: '12px'

    },
    textField: {
      margin: '7px auto',
      textAlign: 'left'
    },
    loginButton: {
      margin: '10px 0 5px 0',
      padding: '6px 12px',
      position: 'relative'
    },
    customError: {
      color: 'red',
      fontSize: '0.8rem',
      marginTop: '5px'
    },
    signupButton: {
      margin: '10px 0 5px 0',
      padding: '6px 12px',
      position: 'relative'
    },
    signupText: {
      display: 'block',
      margin: '15px auto'
    },
    signupLink: {
      textDecoration: 'none',
      display: 'inline-block',
      color: 'blue'
    },
    progress: {
      position: 'absolute'

    },
    invisibleSeparator: {
      border: 'none',
      margin: '4px'
    },
    visibleSeparator: {
      width: '100%',
      borderBottom: '1px solid rgba(0,0,0,0.1)',
      marginBottom: '20px'
    }

  }

}