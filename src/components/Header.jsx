'use client'

import { Menu, X } from 'lucide-react';

import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

import { useState } from 'react'

const products = [
  {
    name: 'Artificiais',
    description: 'Plantas artificiais de alta qualidade que trazem beleza sem a necessidade de cuidados constantes.',
    href: '#'
  },
  {
    name: 'Mudas',
    description: 'Variedade de mudas frescas e saudáveis, prontas para plantar e cultivar em seu jardim.',
    href: '#'
  }
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="px-4 bg-secondaryBackground flex items-center justify-between">
      <h1 className="text-white text-base font-bold md:text-2xl">DF-Plantas</h1>
      <nav aria-label="Global" className="p-2 max-w-7xl text-end">
        <button
          type="button"
          className="icon text-white md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <PopoverGroup className={`${isMenuOpen ? 'block' : 'hidden'} mt-4 md:mt-0 md:flex md:gap-x-4`}>
          <a href="#l" className="link">Início</a>
          <Popover className="relative ml-4">
            <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-secondaryForeground">
              Produtos
              <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
            </PopoverButton>

            <PopoverPanel
              transition
              className="absolute -left-8 top-full z-10 mt-3 w-80 max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="p-2">
                {products.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm leading-6 hover:bg-gray-50"
                  >
                    <div className="flex-auto">
                      <a href={item.href} className="block font-semibold text-gray-900">
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                      <p className="mt-1 text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </PopoverPanel>
          </Popover>
          <a href="#l" className="link">Sobre</a>
          <a href="#l" className="link">Contato</a>
        </PopoverGroup>
      </nav>
      <Dialog open={isMenuOpen} onClose={setIsMenuOpen}>

      </Dialog>
    </header>
  )
}
