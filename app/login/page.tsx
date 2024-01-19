'use client';
import Link from "next/link";

export default function Home() {
    async function fun() {
        
        const response0 = await fetch('https://test-express-app-flame.vercel.app/u')
        const users = await response0.json()
        console.log(users)
        
        const data = {user: 'John', password: 'JJJJ'}
        const response = fetch('https://test-express-app-flame.vercel.app/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
        })

        const token = (await response).json()
        console.log(token)
    }
    return (
      <>
        <input placeholder="Enter Username"></input>
        <input placeholder="Enter Password"></input>
        <Link href="#" onClick={() => fun()}>Login</Link>
      </>
    )
  }