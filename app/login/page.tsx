'use client';
import Link from "next/link";

export default function Home() {
    async function fun() {
        
        const response = await fetch('https://test-express-app-flame.vercel.app/u')
        const users = response.json()
        console.log(response)
        alert(users);
    }
    return (
      <>
        <input placeholder="Enter Username"></input>
        <input placeholder="Enter Password"></input>
        <Link href="#" onClick={() => fun()}>Login</Link>
      </>
    )
  }