import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';
import LikeButton from './LikeButton';

//MUI stuff
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';

//Redux
import { connect } from 'react-redux';

//icons
import ChatIcon from '@material-ui/icons/Chat';



const styles = {
    card: {
        display: 'flex',
        marginBottom: '25px',
        position: 'relative'

    },
    image: {
        minWidth: '200px',
        objectFit: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'

    },
    content: {
        padding: '20px 15px'
    }
}

class Scream extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scream: props.scream,
            user: props.user
        };
    }

    UNSAFE_componentWillReceiveProps(props) {
        this.setState({ scream: props.scream, user: props.user })
    }

    render() {
        dayjs.extend(relativeTime);


        const { classes

        } = this.props;
        const {
            scream: {
                body,
                createdAt,
                userImage,
                userHandle,
                screamId,
                likeCount,
                commentCount,
                comments
            },
            user: {
                authenticated,
                credentials: { handle }
            } } = this.state;

        const deleteButton = authenticated && userHandle === handle ? (
            <DeleteScream screamId={screamId} />
        ) : null


        return (
            <Card className={classes.card}>
                <CardMedia image={userImage}
                    title="Profile image"
                    className={classes.image}
                />

                <CardContent className={classes.content}>
                    <Typography
                        variant="h5"
                        component={Link}
                        to={`/users/${userHandle}`}
                        color="primary"
                    >
                        {userHandle}
                    </Typography>

                    {deleteButton}


                    <Typography variant="body2"
                        color="textSecondary"
                    >
                        {dayjs(createdAt).fromNow()}
                    </Typography>

                    <Typography
                        variant="body1"
                    >
                        {body}
                    </Typography>

                    <LikeButton screamId={screamId} />
                    <span> {likeCount} Likes </span>
                    <MyButton tip="comments">
                        <ChatIcon color="primary" />
                    </MyButton>
                    <span> {typeof comments !== 'undefined' ? comments.length : commentCount} comments </span>

                    <ScreamDialog screamId={screamId} userHandle={userHandle} openDialog={this.props.openDialog} />
                </CardContent>
            </Card>
        )
    }
}

Scream.propTypes = {
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
}

const mapStateToProps = (state) => ({
    user: state.user
});



export default connect(mapStateToProps, {})(withStyles(styles)(Scream))
// export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Scream));