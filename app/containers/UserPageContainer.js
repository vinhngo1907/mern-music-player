import React from 'react';
import { connect } from 'react-redux';
import { Pages } from '../components';
import { logout } from '../actions/auth';
import { isAuthenticated } from '../HOC';

class UserPageContainer extends Component {
    componentDidMount() {
        const { authenticated, params, user, redirectTo } = this.props;
    }

    render(){
        return (
            <Pages.UserPage
            
            />
        )
    }
}

function mapStateToProps({ playlistState, songData }) {
    return { playlists: playlistState.playlists, songData: songData.data };
}

export default connect(mapStateToProps)(isAuthenticated(UserPageContainer));