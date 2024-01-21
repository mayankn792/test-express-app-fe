'use client';
import { useRef, useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  ChakraProvider
} from '@chakra-ui/react'

export default function Home() {

  // fetch user creds
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

  // handle user auth
  const usernameRef = useRef(null)
  const passwordRef = useRef(null)
  const [accessToken, setAccessToken] = useState([])
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
        setAccessToken(data.access_token)
        console.log(data)
      })
      .catch((error) => {
        console.log(error)
      })

  }

  //handle token validation
  const tokenRef = useRef(null)
  const handleValidation = (event: any) => {
    event.preventDefault()
    var token = ''
    if (tokenRef.current) {
      token = (tokenRef.current as { value: string }).value;
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
    <ChakraProvider>
      <form onSubmit={handleSumbit}>
        <input
          type="text"
          ref={usernameRef}
          placeholder="Enter username"
          className="shadow appearance-none border border-red-500 rounded w-auto py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        />

        <input
          type="text"
          ref={passwordRef}
          placeholder="Enter password"
          className="shadow appearance-none border border-red-500 rounded w-auto   py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        />

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">generate access token</button>
      </form>

      <br></br>

      <form onSubmit={handleValidation}>
        <input
          type="text"
          value={accessToken}
          ref={tokenRef}
          placeholder="Enter access token"
          className="shadow appearance-none border border-red-500 rounded w-1/2 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        />

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">validate access token</button>
      </form>

      <br></br>
      <br></br>

      {/* <div>
        <span className="mr-5">Username</span>
        <span className="">Password</span>
        {users.map(user => (
          <div key={(user as { id: string }).id}>
            <div>
              <span className="mr-5">{(user as { name: string }).name}</span>

              <span>{(user as { password: string }).password}</span>
            </div>
          </div>
        ))}
      </div> */}

      <TableContainer m={10} p={5} border='1px' borderColor='gray' borderRadius={10}>
        <Table variant='striped'>
          <Thead>
            <Tr>
              <Th>_ID</Th>
              <Th>Username</Th>
              <Th>Password</Th>
              <Th>Phone</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map(user => (
              <Tr key={(user as { id: string }).id}>
                <Td>{(user as { _id: string })._id}</Td>
                <Td>{(user as { name: string }).name}</Td>
                <Td>{(user as { password: string }).password}</Td>
                <Td>{(user as { phone: string }).phone}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* <input placeholder="Enter Username"></input>
        <input placeholder="Enter Password"></input>
        <Link href="#" onClick={() => fun()}>Login</Link> */}
    </ChakraProvider>
  )
}