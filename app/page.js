import Link from 'next/link'
import React from 'react'

const Home = () => {
  return (
    <div>
      <Link href={"/"}>
        Home
      </Link>
      <Link href={"/about"}>
        about
      </Link>
      <Link href={"/contact"}>
        contact
      </Link>
    </div>
  )
}

export default Home