import { useState } from 'react'

export default function useUser() {

  const getUser = () => {
    return JSON.parse(localStorage.getItem('user'))
  }

  const [user, setUser] = useState(getUser())

  const saveUser = user => {
    localStorage.setItem('user', JSON.stringify(user))
    setUser(user)
  }

  return {
    setUser: saveUser,
    user
  }
}