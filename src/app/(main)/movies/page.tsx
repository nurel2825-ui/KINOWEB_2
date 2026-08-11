import { ShowsCarousel } from "~/components/show-carousel"
import { getShows } from "~/lib/client-fetchers"
import { ShowBg } from "../../../components/show-bg"
import { ShowHero } from "../../../components/show-hero"
import { pickRandomShow } from "~/lib/utils"

export default async function Movies() {
  const allShows = await getShows("movie")
  const randomShow = pickRandomShow(allShows.trending)

  return (
    <>
      <ShowBg show={randomShow} />
      <main>
        <ShowHero show={randomShow} />
        <div className="space-y-10">
          <ShowsCarousel title="В тренде" shows={allShows.trending} />
          <ShowsCarousel title="Высокий рейтинг" shows={allShows.topRated} />
          <ShowsCarousel
            title="Боевики и триллеры"
            shows={allShows.actionThriller}
          />
          <ShowsCarousel title="Комедии" shows={allShows.comedy} />
          <ShowsCarousel title="Ужасы" shows={allShows.horror} />
          <ShowsCarousel title="Мелодрамы" shows={allShows.romance} />
          <ShowsCarousel title="Документальные" shows={allShows.documentary} />
        </div>
      </main>
    </>
  )
}
