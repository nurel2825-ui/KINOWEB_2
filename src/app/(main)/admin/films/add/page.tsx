"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function AddFilmPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [form, setForm] = useState({
    title: "",
    description: "",
    posterUrl: "",
    vkVideoUrl: "",
    year: "",
    country: "",
    studio: "",
    type: "movie",
    episodesTotal: "",
    duration: "",
    announcement: "",
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Пока просто проверка, что обязательные поля заполнены
      if (!form.title || !form.vkVideoUrl) {
        setError("Название и ссылка на VK обязательны")
        setLoading(false)
        return
      }

      // Здесь позже подключим сохранение в базу
      console.log("Данные фильма:", form)
      alert("Форма работает! Данные пока выводятся в консоль. Следующий шаг — сохранение в базу.")
      
      // router.push("/admin/films")
    } catch (err) {
      setError("Ошибка при сохранении")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-8 flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Добавить фильм</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Название *</Label>
          <Input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Например: Re:Zero. Жизнь с нуля..."
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="vkVideoUrl">Ссылка на VK Video *</Label>
          <Input
            id="vkVideoUrl"
            name="vkVideoUrl"
            value={form.vkVideoUrl}
            onChange={handleChange}
            placeholder="https://vkvideo.ru/video-114653103_456239539"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="posterUrl">Ссылка на постер</Label>
          <Input
            id="posterUrl"
            name="posterUrl"
            value={form.posterUrl}
            onChange={handleChange}
            placeholder="https://..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Описание</Label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-md border border-white/20 bg-transparent px-3 py-2 text-sm"
            placeholder="Краткое описание фильма или сериала..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="year">Год</Label>
            <Input
              id="year"
              name="year"
              type="number"
              value={form.year}
              onChange={handleChange}
              placeholder="2026"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Страна</Label>
            <Input
              id="country"
              name="country"
              value={form.country}
              onChange={handleChange}
              placeholder="Япония"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="studio">Студия</Label>
            <Input
              id="studio"
              name="studio"
              value={form.studio}
              onChange={handleChange}
              placeholder="White Fox"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Тип</Label>
            <select
              id="type"
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full rounded-md border border-white/20 bg-transparent px-3 py-2 text-sm"
            >
              <option value="movie">Фильм</option>
              <option value="series">Сериал</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="episodesTotal">Всего серий</Label>
            <Input
              id="episodesTotal"
              name="episodesTotal"
              type="number"
              value={form.episodesTotal}
              onChange={handleChange}
              placeholder="12"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration">Длительность</Label>
            <Input
              id="duration"
              name="duration"
              value={form.duration}
              onChange={handleChange}
              placeholder="24 мин"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="announcement">Объявление (необязательно)</Label>
          <textarea
            id="announcement"
            name="announcement"
            value={form.announcement}
            onChange={handleChange}
            rows={3}
            className="w-full rounded-md border border-white/20 bg-transparent px-3 py-2 text-sm"
            placeholder="Сериал ушёл на перерыв до 12-го августа..."
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Сохранение..." : "Добавить фильм"}
        </Button>
      </form>
    </main>
  )
}
