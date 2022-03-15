
import { AppBar, Toolbar, Typography, makeStyles, Button } from '@material-ui/core'; 
import { Link } from 'react-router-dom';



// makeStyles is used to handle CSS in material-UI
const useStyle = makeStyles({
    component: {
        background: '#FFFFFF',
        color: 'black'
    },
    container: {
        justifyContent: 'center',
        '&  >*': {
            padding: '20',
            color: 'black',
            textDecoration: 'none'
        }
    }
})

const Header = () => {
    const classes = useStyle();

    return (
        // AppBar acts as navBar
        <AppBar className={classes.component}>
            <Toolbar className={classes.container}>
                <Link to='/'>HOME</Link>
                <Link to='/about'>ABOUT</Link>
                <Link to='/contact'>CONTACT</Link>
                <Link>Login</Link>
            </Toolbar>
        </AppBar>
    )
}

export default Header;