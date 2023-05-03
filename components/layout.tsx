import Link from "next/link"
import { useRouter } from "next/router"

export default function Layout({ children }) {
  const router = useRouter()

  return (
    <>
      <div>
        <h1>Docker GUI</h1>

      </div>
      {children}
      <div className="site-footer">
        <p>Baseem Missaghi, all rights reserved &copy;</p>
      </div>
    </>
  )
}
