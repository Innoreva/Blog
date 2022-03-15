import { useEffect, useState } from 'react';
import { Grid, Box , makeStyles} from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';

//components
import Post from './Post';

const useStyle = makeStyles({
    post:{textDecoration: 'none', color: 'inherit'}
})

const Posts = () => {

    const classes = useStyle();
 



    return (
        <>
           
                    <Grid item lg={3} sm={4} xs={12}  className={classes.post}>
                       
                            <Post />
                            <Post />
                            <Post />
                            <Post />
                            <Post />
                        
                    </Grid>
              
        </>
    )
}

export default Posts;