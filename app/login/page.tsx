'use client';
import { error } from "console";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://test-express-app-flame.vercel.app/u')
    .then(response => response.json())
    .then(users => setUsers(users))
    .catch(error => console.log(error)) 
  }, [])


  async function fun() {

    const response0 = await fetch('https://test-express-app-flame.vercel.app/u')
    const users = await response0.json()
    console.log(users)

    //auth 
    const data = { username: 'John', password: 'JJJJ' }
    const response1 = await fetch('https://test-express-app-flame.vercel.app/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })

    const token = await response1.json()
    console.log(token)

    //autherization 
    const response = await fetch('https://test-express-app-flame.vercel.app/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token.access_token
      },
    })

    const user = await response.json()
    console.log(user)
  }
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSumbit = (event: any) => {
    event.preventDefault()
    var user: string = ''
    var pass: string = ''

    if (usernameRef.current) {
      user = (usernameRef.current as { value: string }).value;
    }

    if (passwordRef.current) {
      pass = (passwordRef.current as { value: string }).value;
    }

    console.log(user)
    console.log(pass)

    const data = { username: user, password: pass }
    fetch('https://test-express-app-flame.vercel.app/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.log(error)
      })

  }

  const tokenRef = useRef(null)
  const handleValidation = (event: any) => {
    event.preventDefault()
    var token = ''
    if (tokenRef.current) {
      token = (tokenRef.current as {value: string}).value;
    }

    fetch('https://test-express-app-flame.vercel.app/users', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then(response => response.json())
    .then((user) => {
      user = user[0]
      const msg = 'User : ' + user.id + '\n Name : ' + user.name
      alert(msg)
    })
    .catch((error) => {
      console.log(error)
    })

  }

  return (
    <>
      <form onSubmit={handleSumbit}>
        <input
          type="text"
          ref={usernameRef}
          placeholder="Enter username"
        />

        <input
          type="text"
          ref={passwordRef}
          placeholder="Enter password"
        />

        <button type="submit">Submit</button>
      </form>

      <br></br>

      <form onSubmit={handleValidation}>
        <input
          type="text"
          ref={tokenRef}
          placeholder="Enter access token "
        />

        <button type="submit">validate</button>
      </form>

      <br></br>
      <br></br>

      <div>
        {users.map(user => (
          <div key={(user as {id: string}).id}>
            <div>
              <span className="mr-5">{(user as {name: string}).name}</span>

              <span>{(user as {password: string}).password}</span>
            </div>
          </div>
        ))}
      </div>

      {/* <input placeholder="Enter Username"></input>
        <input placeholder="Enter Password"></input>
        <Link href="#" onClick={() => fun()}>Login</Link> */}
    </>
  )
}