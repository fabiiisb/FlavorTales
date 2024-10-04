'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { HomeIcon, InboxIcon, UsersIcon, SettingsIcon, MenuIcon, XIcon, Microwave } from 'lucide-react'
import Image from 'next/image'
import logo from '@/img/logo1.png'

type SidebarProps = {
  children: React.ReactNode;
};

export default function Sidebar({ children }: SidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navItems = [
    { name: 'Inicio', icon: HomeIcon, href: '/' },
    { name: 'Bandeja de entrada', icon: InboxIcon, href: '/inbox' },
    { name: 'Usuarios', icon: UsersIcon, href: '/users' },
    { name: 'Configuración', icon: SettingsIcon, href: '/settings' },
    { name: 'Recetas guardadas', icon: Microwave, href: '/recetasguardadas' },
  ]

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside className={`bg-[#fff] border-r w-64 absolute inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition duration-200 ease-in-out z-30`}>
        <div className="h-full flex flex-col">
          <div
            className="px-4 py-3 border-b flex justify-between lg:justify-center items-center "
          >
            <Link
              href={'/'}
              className='flex lg:flex-col justify-center items-center'
            >
              <Image src={logo} alt='logo' className='w-8 h-8 mr-1 lg:w-16 lg:h-16 lg:mr-0' />
              <h2 className="text-lg font-semibold">
                {process.env.NEXT_PUBLIC_PAGE_NAME}
              </h2>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <XIcon className="h-4 w-4" />
            </Button>
          </div>
          <div className='flex flex-col gap-2 px-4 py-3 border-b  justify-center items-center'>
            <Link href={'/login'}>
              <Button
                className='w-40'
              >
                <UsersIcon className='h-5 w-5 mr-1' />
                Iniciar sesión
              </Button>
            </Link>

            <Link href={'/signup'}>
              <Button
                className='w-40'
                variant={'outline'}
              >
                <UsersIcon className='h-5 w-5 mr-1' />
                Unirse
              </Button>
            </Link>
          </div>
          <ScrollArea className="flex-grow">
            <nav className="space-y-2 p-4">
              {navItems.map((item) => (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              ))}
            </nav>
          </ScrollArea>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-background border-b flex items-center lg:hidden px-1 py-1">
          <Button
            className='text-muted-foreground hover:text-black'
            variant={'ghost'}
            size="icon"
            onClick={() => setSidebarOpen(true)}
          >
            <MenuIcon className="h-4 w-4" />
          </Button>
          <div className='w-full flex'>
            <Link href={'/'} className='inline-flex mx-auto items-center'>
              {process.env.NEXT_PUBLIC_PAGE_NAME}
            </Link>
            <div className='flex gap-1'>
              <Link href={navItems[4].href}>
                <Button
                  className='text-muted-foreground hover:text-black'
                  variant={'ghost'}
                  size="icon"
                >
                  <Microwave className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <main className='flex-1 overflow-auto'>
          {children}
        </main>
      </div>
    </>
  )
}
