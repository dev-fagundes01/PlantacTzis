'use client'

import { Menu, X } from 'lucide-react';

import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

import { useState } from 'react'

// const products = [
//   {
//     name: 'Artificiais',
//     description: 'Plantas artificiais de alta qualidade que trazem beleza sem a necessidade de cuidados constantes.',
//     href: '#'
//   },
//   {
//     name: 'Mudas',
//     description: 'Variedade de mudas frescas e saudáveis, prontas para plantar e cultivar em seu jardim.',
//     href: '#'
//   }
// ];

// const trimmedProducts = products.map(product => ({
//   ...product,
//   name: product.name.trim(),
//   description: product.description.trim()
// }))

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full px-2 z-20 bg-secondaryBackground fixed flex items-center justify-between md:px-4">
      <h1 className="text-white text-base font-bold md:text-2xl">DF-Plantas</h1>
      <nav aria-label="Global" className="max-w-7xl text-end relative">
        <button
          type="button"
          className="icon text-white md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <PopoverGroup className={`${isMenuOpen ? 'block' : 'hidden'} md:flex md:gap-x-4 items-baseline`}>
          <a href="#home" className='link'>Início</a>
          <a href="#product" className='link'>Produtos</a>

          {/* <Popover className="absolute bottom-[1.75rem] right-[-0.8rem] md:static">
            <PopoverButton className="mr-4 flex items-center text-xs font-semibold leading-6 text-secondaryForeground relative md:mr-0">
              <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none text-thirdForeground absolute right-[-15px] top-[3px] md:static" />
            </PopoverButton>

            <PopoverPanel
              transition
              className="absolute right-[0.5rem] top-full z-10 max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="w-32 p-1">
                {trimmedProducts.map((item) => (
                  <div
                    key={item.name}
                    className="relative flex items-center rounded-lg p-1 text-sm hover:bg-gray-50"
                  >
                    <div className="flex-auto">
                      <a href={item.href} className="text-semiBase leading-3 block font-semibold text-gray-900">
                        {item.name}
                      </a>
                      <p className="text-zx leading-[.5rem] text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </PopoverPanel>
          </Popover> */}

          <a href="#about" className='link'>Sobre</a>
          <a href="#contact" className='link'>Contato</a>
        </PopoverGroup>
      </nav>
    </header>
  )
}
