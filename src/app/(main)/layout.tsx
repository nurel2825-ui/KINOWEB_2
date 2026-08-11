import Image from "next/image"
import Link from "next/link"
import { currentUser, SignedOut, auth, SignOutButton } from "@clerk/nextjs"
import { Suspense } from "react"
import { Button } from "\~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "\~/components/ui/dropdown-menu"
import { Skeleton } from "\~/components/ui/skeleton"
import { db } from "\~/db/client"
import { accounts, profiles } from "\~/db/schema"
import { eq } from "drizzle-orm"
import { ERR } from "\~/lib/utils"
import {
  Search,
  Bell,
  Youtube,
  Home,
  Clapperboard,
  Film,
  TrendingUp,
  List,
  Pencil,
  ArrowLeftRight,
  User,
  BadgeCheck,
} from "lucide-react"
import { LinkButton } from "\~/components/link-button"
import { getAccountWithActiveProfile } from "\~/lib/server-fetchers"
import { OverlayScrollbar } from "\~/components/overlay-scrollbar"

export default function ShowsLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <div className="container flex min-h-screen flex-col px-4 md:px-8">
      <Header />
      {children}
      {modal}
      <Footer />
      <OverlayScrollbar />
    </div>
  )
}

const NAVINFO = [
  { name: "Главная", href: "/", icon: <Home className="w-5" /> },
  {
    name: "Сериалы",
    href: "/tv-shows",
    icon: <Clapperboard className="w-5" />,
  },
  { name: "Фильмы", href: "/movies", icon: <Film className="w-5" /> },
  {
    name: "Новое",
    href: "/new-and-popular",
    icon: <TrendingUp className="w-5" />,
  },
  { name: "Мой список", href: "/my-list", icon: <List className="w-5" /> },
]

function Header() {
  return (
    <header className="flex h-16 justify-between">
      <div className="flex items-center gap-12">
        <Link href="/" className="hidden md:block">
          <Image
            src="/netflix-logo.svg"
            alt="kinoweb-logo"
            width={300}
            height={81}
            priority
            className="h-auto w-28 transition-opacity hover:opacity-80 active:opacity-100"
          />
        </Link>
        <MainMenu />
        <nav className="hidden gap-6 text-sm md:flex">
          {NAVINFO.map((el) =>
            el.name === "Мой список" ? (
              <LinkButton href={el.href} key={el.name}>
                {el.name}
              </LinkButton>
            ) : (
              <Link href={el.href} key={el.name}>
                {el.name}
              </Link>
            ),
          )}
        </nav>
      </div>
      <div className="flex items-center gap-6">
        <Link href="/search?keyword=" aria-label="search">
          <Search />
        </Link>
        <Bell />
        <Suspense fallback={<Skeleton className="h-8 w-8" />}>
          <CustomeUserButton />
        </Suspense>
        <SignedOut>
          <Button
            asChild
            className="bg-red-600 font-semibold text-white hover:bg-red-700 active:bg-red-800"
          >
            <Link href="/sign-in">Войти</Link>
          </Button>
        </SignedOut>
      </div>
    </header>
  )
}

async function CustomeUserButton() {
  const { userId } = auth()
  if (!userId) return
  const existingAccount = await db.query.accounts.findFirst({
    where: eq(accounts.id, userId),
    with: { activeProfile: true },
  })
  const account = existingAccount ?? (await createAccountAndProfile())
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={account.activeProfile.profileImgPath}
          alt="user-image"
          height="32"
          width="32"
          className="rounded-sm"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{account.activeProfile.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/manage-profile">
          <DropdownMenuItem className="gap-1.5">
            <Pencil className="w-5" />
            Управление профилем
          </DropdownMenuItem>
        </Link>
        <Link href="/switch-profile">
          <DropdownMenuItem className="gap-1.5">
            <ArrowLeftRight className="w-5" />
            Сменить профиль
          </DropdownMenuItem>
        </Link>
        <Link href="/account">
          <DropdownMenuItem className="gap-1.5">
            <User className="w-5" />
            Аккаунт
          </DropdownMenuItem>
        </Link>
        <Link href="/subscription">
          <DropdownMenuItem className="gap-1.5">
            <BadgeCheck className="w-5" />
            Подписка
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem>
          <SignOutButton>
            <Button className="w-full font-semibold">Выйти</Button>
          </SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function MainMenu() {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="flex items-center gap-1.5 md:hidden">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-red-600">
          <path
            fill="currentColor"
            d="M5.398 0v.006c3.028 8.556 5.37 15.175 8.348 23.596 2.344.058 4.85.398 4.854.398-2.8-7.924-5.923-16.747-8.487-24zm8.489 0v9.63L18.6 22.951c-.043-7.86-.004-15.913.002-22.95zM5.398 1.05V24c1.873-.225 2.81-.312 4.715-.398v-9.22z"
          ></path>
        </svg>
        <h2 className="font-semibold">Меню</h2>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="flex gap-1.5">
          <svg viewBox="0 0 24 24" className="w-5 text-red-600">
            <path
              fill="currentColor"
              d="M5.398 0v.006c3.028 8.556 5.37 15.175 8.348 23.596 2.344.058 4.85.398 4.854.398-2.8-7.924-5.923-16.747-8.487-24zm8.489 0v9.63L18.6 22.951c-.043-7.86-.004-15.913.002-22.95zM5.398 1.05V24c1.873-.225 2.81-.312 4.715-.398v-9.22z"
            ></path>
          </svg>
          KINOWEB
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {NAVINFO.map((el) => (
          <Link href={el.href} key={el.name}>
            <DropdownMenuItem className="gap-1.5">
              {el.icon}
              {el.name}
            </DropdownMenuItem>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function Footer() {
  return (
    <footer className="mt-auto pb-3 pt-12 text-sm">
      <i className="flex gap-4 py-3">
        <Link
          href="https://vkvideo.ru/@kinowebonline"
          target="_blank"
          rel="noreferrer"
          aria-label="VK Video"
          className="hover:text-red-500"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="currentColor"
          >
            <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1.01-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .643.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z" />
          </svg>
        </Link>
        <Link
          href="https://youtube.com/@kinoweb_online?si=V8DQt9qrMspINfcV"
          target="_blank"
          rel="noreferrer"
          aria-label="YouTube"
          className="hover:text-red-500"
        >
          <Youtube className="h-6 w-6" />
        </Link>
      </i>
      <div className="grid grid-cols-2 justify-between gap-y-3 py-3 text-xs text-white/50 md:flex md:text-sm">
        <div className="flex flex-col gap-3">
          <Link href="/">О проекте</Link>
          <Link href="/">Правовая информация</Link>
        </div>
        <div className="flex flex-col gap-3">
          <Link href="/">Помощь</Link>
          <Link href="mailto:5282lerun@gmail.com">Поддержка</Link>
        </div>
        <div className="flex flex-col gap-3">
          <Link href="/">Условия использования</Link>
          <Link href="mailto:5282lerun@gmail.com">Контакты</Link>
        </div>
      </div>
      <div className="text-center font-semibold text-neutral-300">
        KINOWEB — смотри лучшее. Исходный код доступен на&nbsp;
        <a
          href="https://github.com/nurel2825-ui/KINOWEB_2"
          target="_blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-4"
        >
          GitHub
        </a>
      </div>
    </footer>
  )
}

async function createAccountAndProfile() {
  const user = await currentUser()
  if (!user) throw new Error(ERR.unauthenticated)
  await db
    .insert(accounts)
    .values({
      id: user.id,
      email: user.emailAddresses[0]!.emailAddress,
      activeProfileId: user.id + "-1",
    })
    .onConflictDoNothing()
  await db
    .insert(profiles)
    .values({
      id: user.id + "-1",
      accountId: user.id,
      profileImgPath: `https://api.dicebear.com/6.x/bottts-neutral/svg?seed=${
        user.username ?? user.firstName ?? user.emailAddresses[0]!.emailAddress
      }`,
      name:
        user.username ?? user.firstName ?? user.emailAddresses[0]!.emailAddress,
    })
    .onConflictDoNothing()
  return getAccountWithActiveProfile()
}