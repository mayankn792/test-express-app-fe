'use client';
import Link from "next/link";
import { useRef } from "react";

export default function Home() {
    async function fun() {
        
        const response0 = await fetch('https://test-express-app-flame.vercel.app/u')
        const users = await response0.json()
        console.log(users)
        
        //auth 
        const data = {username: 'John', password: 'JJJJ'}
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
        user = (usernameRef.current as {value: string}).value;
      }

      if (passwordRef.current) {
        pass = (passwordRef.current as {value: string}).value;
      }

      console.log(user)
      console.log(pass)
      
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
        
        {/* <input placeholder="Enter Username"></input>
        <input placeholder="Enter Password"></input>
        <Link href="#" onClick={() => fun()}>Login</Link> */}
      </>
    )
  }