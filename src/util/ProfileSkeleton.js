import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import noImg from '../images/no-img.png';

//MUI stuff
import Paper from '@material-ui/core/Paper';

//Icons 

import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';


const styles = (theme) => ({
    ...theme.spreadThis,
    paper: {
        padding: 20
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& button': {
                position: 'absolute',
                top: '80%',
                left: '70%'
            }
        },
        '& .profile-image': {
            width: 200,
            height: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'
        },
        '& .profile-details': {
            textAlign: 'center',
            '& span, svg': {
                verticalAlign: 'middle'
            },
            '& a': {
                color: '#00bcd4'
            }
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        },
        '& svg.button': {
            '&:hover': {
                cursor: 'pointer'
            }
        }
    },
    handle: {
        height: '20px',
        backgroundColor: theme.palette.primary.main,
        width: '60px',
        margin: '0px auto 8px auto'
    },
    fullLine: {
        height: "15px",
        backgroundColor: 'rgba(0,0,0, 0.6)',
        width: '100%',
        marginBottom: '10px',
    },
    halfLine: {
        height: "15px",
        backgroundColor: 'rgba(0,0,0, 0.6)',
        width: '50%',
        marginBottom: '10px',
    }


})

const ProfileSkeleton = (props) => {
    const { classes } = props;

    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img src={noImg} alt="Profile" className="profile-image" />
                </div>
                <hr />
                <div className="profile-details">
                    <div className={classes.handle}></div>
                    <hr />
                    <div className={classes.fullLine}></div>
                    <div className={classes.fullLine}></div>
                    <hr />
                    <LocationOn color="primary" /> <span>Location</span>

                    <hr />

                    <LinkIcon color="primary" /> <span>https://website.com</span>
                    <hr />

                    <CalendarToday color="primary" /> <span>Joined Date</span>

                </div>
            </div>
        </Paper>
    )
}

ProfileSkeleton.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ProfileSkeleton)
