import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import ScreamSkeleton from '../util/ScreamSkeleton';



import Scream from '../components/scream/Scream';
import Profile from '../components/profile/Profile';

import { connect } from 'react-redux';
import { getScreams } from '../redux/actions/dataActions';

class home extends Component {
    /* Previous state
        state = {
            screams: null
        };
    */

    constructor(props) {
        super(props);
        this.state = {
            screams: props.data.screams
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({screams: nextProps.data.screams});
    }
    
    componentDidMount() {
        
        this.props.getScreams();

        /* Previous  
            axious
                .get('/screams')
                .then((res) => {
                    this.setState({
                        screams: res.data
                    });
                })
                .catch((err) => console.log(err));
        */
    }

    render() {
        const { loading } = this.props.data;
        const { screams } = this.state;
        console.log(screams)
        let recentScreamsMarkup = !loading ? (
            screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
        ) : (
                <ScreamSkeleton />
            );
        return (<Grid container spacing={4} >
            <Grid item sm={8} xs={12} > {recentScreamsMarkup}
            </Grid>
            <Grid item sm={4} xs={12} >
                <Profile />
            </Grid>

        </Grid>
        );
    }
}

home.propTypes = {
    getScreams: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data
    
})


export default connect(mapStateToProps, { getScreams })(home);