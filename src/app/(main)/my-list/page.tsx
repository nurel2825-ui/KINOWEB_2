import { ShowScroller } from "./infinite-scroller"
import { getMyShows } from "~/lib/server-fetchers"

export default async function MyShowPage() {
  const LIMIT = 30
  const data = await getMyShows(LIMIT)
  return (
    <main className="pt-8">
      {!data.shows.length && (
        <div className="mb-4 space-y-3">
          <p className="text-3xl font-semibold">Ваш список пуст</p>
          <p className="text-white/60">
            Добавляйте фильмы и сериалы в список, чтобы посмотреть их позже
          </p>
        </div>
      )}
      <ShowScroller
        initialShows={data.shows}
        initialHasNextPage={data.hasNextPage}
        limit={LIMIT}
      />
    </main>
  )
}
