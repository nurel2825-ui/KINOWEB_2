import { CreditCard, ChevronRight } from "lucide-react"
import { Button } from "~/components/ui/button"
import Link from "next/link"
import { getAccountWithProfiles } from "~/lib/server-fetchers"

export default async function AccountPage() {
  const account = await getAccountWithProfiles()
  return (
    <main className="mt-[2.5%] flex justify-center ">
      <div className="space-y-5 md:w-[500px]">
        <section className="space-y-2">
          <h1 className="text-4xl">Аккаунт</h1>
          <p className="flex items-center gap-2 text-sm text-neutral-400">
            <CreditCard />
            Участник с: {account.createdAt.toDateString()}
          </p>
        </section>
        <div aria-label="divider" className="h-px w-full bg-white/25" />
        <p className="text-2xl text-neutral-400">ПОДПИСКА И ОПЛАТА</p>
        <p className="flex cursor-pointer justify-between">
          {account.email}
          <ChevronRight />
        </p>
        <div aria-label="divider" className="h-px w-full bg-white/25" />
        <p className="flex cursor-pointer justify-between">
          Обновить аккаунт
          <ChevronRight />
        </p>
        <div aria-label="divider" className="h-px w-full bg-white/25" />
      </div>
    </main>
  )
}
