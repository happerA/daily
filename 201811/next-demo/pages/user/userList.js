import {connect} from 'react-redux'
import UserList from '../../components/user/userList'
import { loadData } from '../../redux/actions'

UserList.getInitialProps = async (props) => {
  const { store, isServer } = props.ctx;
  if (!store.getState().userData) {
    store.dispatch(loadData());
  }
  return { isServer };
};

const mapStateToProps = ({ userData }) => ({ userData });

export default connect(mapStateToProps)(UserList);