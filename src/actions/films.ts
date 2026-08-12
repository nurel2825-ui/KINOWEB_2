"use server"

import { db } from "~/db/client"
import { films } from "~/db/schema"
import { revalidatePath } from "next/cache"

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-а-яё]+/gi, "")
    .replace(/\-\-+/g, "-")
}

export async function createFilm(data: {
  title: string
  description?: string
  posterUrl?: string
  vkVideoUrl: string
  year?: number
  country?: string
  studio?: string
  type?: string
  episodesTotal?: number
  duration?: string
  announcement?: string
}) {
  try {
    if (!data.title || !data.vkVideoUrl) {
      return { error: "Название и ссылка на VK обязательны" }
    }

    const slug = slugify(data.title) + "-" + Date.now().toString().slice(-6)

    await db.insert(films).values({
      title: data.title,
      slug,
      description: data.description || null,
      posterUrl: data.posterUrl || null,
      vkVideoUrl: data.vkVideoUrl,
      year: data.year || null,
      country: data.country || null,
      studio: data.studio || null,
      type: data.type || "movie",
      episodesTotal: data.episodesTotal || null,
      duration: data.duration || null,
      announcement: data.announcement || null,
      isPublished: true,
    })

    revalidatePath("/")
    revalidatePath("/admin/films")

    return { success: true }
  } catch (error) {
    console.error(error)
    return { error: "Ошибка при сохранении фильма" }
  }
}
