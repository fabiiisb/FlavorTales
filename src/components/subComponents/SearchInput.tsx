'use client'

import { useState } from "react"
import { Search, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SearchInput() {
  const [inputValue, setInputValue] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleSearch = () => {
    console.log(inputValue)
  }

  return (
    <div className="relative w-full max-w-sm text-white">

      <div className="absolute inset-0 backdrop-blur-md rounded-3xl bg-forest-50/70 shadow-md" />

      <Search className="absolute left-2 top-3 h-5 w-5 text-forest-800 z-10" />

      <Input
        className="text-forest-800 pl-8 pr-10 h-12 outline-none rounded-3xl bg-transparent relative z-20 text-md shadow-md border border-forest-400/20 !placeholder-forest-800"
        type="text"
        placeholder="Buscar..."
        value={inputValue}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter")
            handleSearch()
        }}
      />

      {inputValue.length > 0 && (
        <Button
          size="icon"
          className="absolute right-1 top-1 h-10 w-10 bg-forest-600 hover:bg-forest-500 rounded-full z-30 flex items-center justify-center p-0 group"
          onClick={handleSearch}
        >
          <ArrowRight
            className="h-4 w-4 text-forest-100 group-hover:h-5 group-hover:w-5 group-hover:text-white transition-all duration-100"
          />
        </Button>
      )}
    </div>
  )
}
