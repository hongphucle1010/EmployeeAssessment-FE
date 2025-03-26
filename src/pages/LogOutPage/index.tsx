import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AuthenticationService } from '../../services/authentication'

const LogOut: React.FC = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    AuthenticationService.logOut(dispatch)
    window.location.href = '/'
  })
  return <></>
}

export default LogOut
