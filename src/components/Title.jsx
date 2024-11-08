import { twMerge } from "tailwind-merge"

function Title({ children, className }) {
  return (
    <h1 className={twMerge('text-secondaryForeground text-center font-normal md:text-4xl', className)}>
      {children}
    </h1>
  )
}

export default Title