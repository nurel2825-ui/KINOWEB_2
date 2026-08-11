import { Check } from "lucide-react"
import { PlanSelector } from "./plan-selector"
import { getAccount } from "~/lib/server-fetchers"

export default async function SubscriptionPage() {
  const account = await getAccount()
  return (
    <main className="mt-8 space-y-8 md:px-24">
      <h1 className="text-3xl font-bold sm:text-4xl">
        Выберите подходящий план
      </h1>
      <div className="space-y-3 text-zinc-400">
        <div className="flex gap-1.5">
          <Check stroke="red" />
          <p>Смотрите на телефоне, планшете, ноутбуке и телевизоре</p>
        </div>
        <div className="flex gap-1.5">
          <Check stroke="red" />
          <p>Неограниченное количество фильмов и сериалов</p>
        </div>
        <div className="flex gap-1.5">
          <Check stroke="red" />
          <p>Меняйте или отменяйте план в любое время</p>
        </div>
      </div>
      <PlanSelector activeSubscription={account.membership} />
      <div className="space-y-3 text-sm text-zinc-300">
        <p>
          Доступность HD (720p), Full HD (1080p), Ultra HD (4K) и HDR зависит
          от вашего интернет-соединения и возможностей устройства. Не весь
          контент доступен во всех разрешениях. Подробнее см. в{" "}
          <span className="cursor-pointer text-blue-500">Условиях использования</span>.
        </p>
        <p>
          Аккаунтом могут пользоваться только люди, проживающие с вами.
          Смотрите одновременно на 4 устройствах с Premium, на 2 — со Standard
          и на 1 — с Basic и Mobile.
        </p>
      </div>
    </main>
  )
}
