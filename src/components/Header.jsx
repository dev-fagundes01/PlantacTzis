'use client'

import { Menu, X } from 'lucide-react';

import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
// import { ChevronDownIcon } from '@heroicons/react/20/solid'

import { useState } from 'react'

const menu = [
  {
    name: 'Início',
    href: '#home'
  },
  {
    name: 'Produtos',
    href: '#product'
  },
  {
    name: 'Sobre',
    href: '#about'
  },
  {
    name: 'Contato',
    href: '#contact'
  },
];

const trimmedMenu = menu.map(product => ({
  ...product,
  name: product.name.trim(),
}))

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full px-2 z-20 bg-secondaryBackground fixed flex items-center justify-between md:px-4">
      <h1 className="text-white text-base font-bold md:text-2xl">DF-Plantas</h1>
      <nav aria-label="Global" className="text-end">
        <PopoverGroup>
          <Popover>

            <PopoverButton className='text-white md:hidden'
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={15} /> : <Menu size={15} />}
            </PopoverButton>

            <PopoverPanel
              transition
              className="transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
            >
              {trimmedMenu.map((item) => (
                <a
                  key={item.name}
                  href={item.href} className="link">
                  {item.name}
                </a>
              ))}
            </PopoverPanel>

          </Popover>
        </PopoverGroup>

        <div className='dm:hidden flex gap-2'>
          {trimmedMenu.map((item) => (
            <a
              key={item.name}
              href={item.href} className="link">
              {item.name}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}
