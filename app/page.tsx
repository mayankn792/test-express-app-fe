import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Link className='bg-blue-500 text-white font-bold py-2 px-4 rounded' href="/login">Login</Link>
    </>
  )
}
