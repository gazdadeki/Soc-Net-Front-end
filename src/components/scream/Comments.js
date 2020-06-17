import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

//MUI stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
    ...theme.spreadThis,

    commentImage: {
        maxWidth: '100%',
        height: '100px',
        objectFit: 'cover',
        borderRadius: '50%',
        marginLeft: '15px'


    },
    commentData: {
        marginLeft: '30px'
    }

})

class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: props.comments
        };
    }

    componentWillReceiveProps(props) {
        this.setState({ comments: props.comments });
    }

    render() {

        const { classes } = this.props;
        const { comments } = this.state;
        return (
            <Grid container>
                {comments.map(
                    (comment, index) => {
                        const {
                            body,
                            createdAt,
                            userImage,
                            userHandle
                        } = comment;
                        return (
                            <Fragment key={createdAt}>
                                <Grid item sm={12}>
                                    <Grid container>
                                        <Grid item sm={2}>
                                            <img
                                                src={userImage}
                                                alt="comment"
                                                className={classes.commentImage} />
                                        </Grid>
                                        <Grid item sm={9}>
                                            <div className={classes.commentData}>
                                                <Typography
                                                    variant="h5"
                                                    component={Link}
                                                    to={`/users/${userHandle}`}
                                                    color="primary"
                                                >
                                                    {userHandle}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="textSecondary"
                                                >
                                                    {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                                                </Typography>

                                                <hr className={classes.invisibleSeparator} />
                                                <Typography variant="body1">
                                                    {body}
                                                </Typography>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {index !== comments.length - 1 && (
                                    <hr className={classes.visibleSeparator} />
                                )}
                            </Fragment>
                        )
                    })}
            </Grid>
        )
    }
}

Comments.propTypes = {
    comments: PropTypes.array.isRequired
}

export default withStyles(styles)(Comments)
