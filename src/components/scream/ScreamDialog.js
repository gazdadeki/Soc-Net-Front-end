import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm'
//MUI stuff

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

//Icons 
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';

//Redux stuff
import { connect } from 'react-redux';
import { getScream, clearErrors } from '../../redux/actions/dataActions';


const styles = (theme) => ({
    ...theme.spreadThis,


    dialogImage: {
        width: '200px',
        height: '200px',
        objectFit: 'cover',
        borderRadius: '50%',


    },
    dialogContent: {
        padding: '30px'
    },
    closeButton: {
        position: 'absolute',
        left: '90%'
    },
    expandButton: {
        position: 'absolute',
        left: '90%'
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    }

})
class ScreamDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            oldPath: '',
            newPath: '',
            scream: props.scream
        };
    }

    componentDidMount() {
        if (this.props.openDialog) {
            this.handleOpen();
        }
    }

    UNSAFE_componentWillReceiveProps(props) {
        this.setState({ scream: props.scream });
    }

    handleOpen = () => {
        let oldPath = window.location.pathname;

        const { userHandle, screamId } = this.props;

        const newPath = `/users/${userHandle}/scream/${screamId}`;

        if (oldPath === newPath) {
            oldPath = `/users/${userHandle}`;
        }

        window.history.pushState(null, null, newPath);


        this.setState({
            open: true,
            oldPath,
            newPath
        });

        this.props.getScream(this.props.screamId)
    }

    handleClose = () => {
        window.history.pushState(null, null, this.state.oldPath);

        this.setState({
            open: false
        })
        this.props.clearErrors();
    }

    render() {
        const {
            classes,
            UI: {
                loading
            }
        } = this.props;
        const {
            scream: {
                screamId,
                body,
                createdAt,
                likeCount,
                commentCount,
                userImage,
                userHandle,
                comments
            }
        } = this.state;


        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={200} thickness={2} />
            </div>
        ) : (
                <Grid container spacing={8}>
                    <Grid item sm={5}>
                        <img src={userImage} alt="Proflie" className={classes.dialogImage} />
                    </Grid>
                    <Grid item sm={7}>
                        <Typography
                            component={Link}
                            color="primary"
                            variant="h5"
                            to={`/users/${userHandle}`}
                        >
                            @{userHandle}
                        </Typography>
                        <hr className={classes.invisibleSeparator} />
                        <Typography
                            variant="body2"
                            color="textSecondary">
                            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                        </Typography>
                        <hr className={classes.invisibleSeparator} />
                        <Typography variant="body1">
                            {body}
                        </Typography>
                        
                        <LikeButton screamId={screamId} />
                        <span> {likeCount} Likes </span>
                        <MyButton tip="comments">
                            <ChatIcon color="primary" />
                        </MyButton>
                        <span> {typeof comments !== 'undefined' ? comments.length : commentCount} comments </span>
                    </Grid>
                    <hr className={classes.visibleSeparator} />
                    <CommentForm screamId={screamId} />
                    <Comments comments={comments} />
                </Grid>
            )

        return (
            <Fragment>
                <MyButton
                    onClick={this.handleOpen}
                    tip="Expand Scream"
                    tipClassName={classes.expandButton}
                >
                    <UnfoldMore color="primary" />
                </MyButton>

                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm" >

                    <MyButton
                        tip="Close"
                        onClick={this.handleClose}
                        tipClassName={classes.closeButton}
                    >
                        <CloseIcon />
                    </MyButton>

                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }


}

ScreamDialog.propTypes = {
    clearErrors: PropTypes.func.isRequired,
    getScream: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    scream: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired

}

const mapStateToProps = (state) => ({
    scream: state.data.scream,
    UI: state.UI

});

export default connect(mapStateToProps, { getScream, clearErrors })(withStyles(styles)(ScreamDialog))