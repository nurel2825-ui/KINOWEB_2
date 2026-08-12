import Link from "next/link"
import { Button } from "~/components/ui/button"

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-content-center space-y-5 text-center">
      <h2 className="text-3xl font-semibold">Страница не найдена</h2>
      <p>Запрашиваемый ресурс не существует</p>
      <Button asChild variant="outline" className="font-semibold">
        <Link href="/">На главную</Link>
      </Button>
    </main>
  )
}
