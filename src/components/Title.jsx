import { twMerge } from "tailwind-merge"

function Title({ children, className }) {
  return (
    <h1 className={twMerge('mx-auto text-2xl text-secondaryForeground text-center font-normal dm:w-56 md:w-[25rem] md:text-4xl', className)}>
      {children}
    </h1>
  )
}

export default Title