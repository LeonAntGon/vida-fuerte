import { useRouter } from "next/router"
import { useState, useEffect } from "react"

export default function TopLoadingLine() {
  const router = useRouter()
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    const handleStart = () => {
      setLoadingProgress(30) // arranca en 30 %
    }
    const handleComplete = () => {
      setLoadingProgress(100)
      setTimeout(() => setLoadingProgress(0), 500) // tras 500 ms desaparece
    }

    router.events.on("routeChangeStart", handleStart)
    router.events.on("routeChangeComplete", handleComplete)
    router.events.on("routeChangeError", handleComplete)

    return () => {
      router.events.off("routeChangeStart", handleStart)
      router.events.off("routeChangeComplete", handleComplete)
      router.events.off("routeChangeError", handleComplete)
    }
  }, [router.events])

  // ← Si el progreso es 0 no renderizo nada
  if (loadingProgress === 0) return null

  return (
    <div
      className="topLoadingLine"
      style={{ width: `${loadingProgress}%` }}
    />
  )
}
