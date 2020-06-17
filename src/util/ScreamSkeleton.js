import React, { Fragment } from 'react';
import noImg from '../images/no-img.png';
import PropTypes from 'prop-types';

//MUI
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import withStyles from '@material-ui/core/styles/withStyles';

const styles = (theme) => ({
    ...theme.spreadThis,

    card: {
        display: 'flex',
        marginBottom: 20,
    },
    cardContent: {
        width: '100%',
        flexDirection: 'column',
        padding: '20px 15px'
    },
    coverImage: {
        minWidth: '200px',
        objectFit: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat' 
    },
    handle: {
        width: '60px',
        height: '18px',
        backgroundColor: theme.palette.primary.main,
        marginBottom: '8px'
    },
    date: {
        height: '14px',
        width: '100px',
        backgroundColor: 'rgba(0,0,0, 0.3)',
        marginBottom: '10px'
    },
    fullLine: {
        height: '15px',
        width: '90%',
        marginBottom: '10px',
        backgroundColor: 'rgba(0,0,0, 0.6)'

    },
    halfLine: {
        height: '15px',
        width: '50%',
        marginBottom: '10px',
        backgroundColor: 'rgba(0,0,0, 0.6)',
    },

})

const ScreamSkeleton = (props) => {
    const {classes} = props

    const content = Array.from({ length: 5})
        .map((item, index) => (
            <Card className={classes.card} key= {index}>
                <CardMedia className={classes.coverImage} image = {noImg} />
                
                <CardContent className={classes.cardContent}>
                    <div className={classes.handle}></div>
                    <div className={classes.date}></div>
                    <div className={classes.fullLine}></div>
                    <div className={classes.fullLine}></div>
                    <div className={classes.halfLine}></div>
                </CardContent>
            </Card>
        ))

    return (
        <Fragment>
            {content}
        </Fragment>
    )
} 

ScreamSkeleton.propTypes = {
    classes: PropTypes.object.isRequired,

};

export default withStyles(styles)(ScreamSkeleton);