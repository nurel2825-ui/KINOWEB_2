"use client"

import { useEffect } from "react"
import { Button } from "~/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="container grid min-h-screen place-content-center space-y-5 text-center">
      <h1 className="text-3xl font-semibold">Произошла ошибка</h1>
      <p>{error.message}</p>
      <section className="space-x-8">
        <Button onClick={() => reset()} className="font-semibold">
          Попробовать снова
        </Button>
        <Button asChild variant="secondary" className="font-semibold">
          <a href="/">На главную</a>
        </Button>
      </section>
    </main>
  )
}
