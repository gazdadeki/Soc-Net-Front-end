import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import propTypes from 'prop-types';
import socNetIcon from '../images/socNetIcon.png';
import { Link } from 'react-router-dom';

//MUI stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

//Redux
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

const styles = (theme) => ({
    ...theme.spreadThis
})

class signup extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            errors: {}
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            console.log('componentWillReceiveProps', nextProps);
            this.setState({ errors: nextProps.UI.errors.data });
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        };
        this.props.signupUser(newUserData, this.props.history);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        const { classes, UI: { loading } } = this.props;
        const { errors } = this.state;
        return (
            <Grid container className={classes.form} >
                <Grid item sm />
                <Grid item sm>
                    <img src={socNetIcon} alt="socNet" className={classes.logo} />

                    <Typography variant="h4" className={classes.pageTitle}>
                        Signup
                    </Typography>

                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            label="Email..."
                            className={classes.textField}
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            value={this.state.email}
                            onChange={this.handleChange}
                            fullWidth />

                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            label="Password..."
                            className={classes.textField}
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            value={this.state.password}
                            onChange={this.handleChange}
                            fullWidth />

                        <TextField
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            label="Confirm Password..."
                            className={classes.textField}
                            helperText={errors.confirmPassword}
                            error={errors.confirmPassword ? true : false}
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                            fullWidth />

                        <TextField
                            id="handle"
                            name="handle"
                            type="text"
                            label="Handle..."
                            className={classes.textField}
                            helperText={errors.handle}
                            error={errors.handle ? true : false}
                            value={this.state.handle}
                            onChange={this.handleChange}
                            fullWidth />


                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button type="submit" variant="contained" color="primary" className={classes.signupButton} disabled={loading} >Signup {loading && (
                            <CircularProgress size={22} className={classes.progress} />
                        )} </Button>

                        <small className={classes.signupText}> Allready have an account?  Login <Link to="/login" className={classes.signupLink}>HERE</Link></small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>


        )
    }
}

signup.propTypes = {
    classes: propTypes.object.isRequired,
    user: propTypes.object.isRequired,
    UI: propTypes.object.isRequired,
    signupUser: propTypes.func.isRequired

}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

export default connect(mapStateToProps, { signupUser })(withStyles(styles)(signup));