import {Navigate} from 'react-router-dom'

function UserPublic(props) {
      if(localStorage.getItem('KanbanToken')){
        return <Navigate to='/'/>
      }else{
        <Navigate to='/login'/>
        return props.children
      }
    }

export default UserPublic