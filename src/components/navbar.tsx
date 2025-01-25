"use client"

import { Filter, Plus } from "lucide-react"
import { Button } from "./ui/button"

interface NavbarProps {
  onAddClick: () => void
  onFilterClick: () => void
}

export function Navbar({ onAddClick, onFilterClick }: NavbarProps) {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4">
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1">
            <h1 className="text-xl font-bold">Inventory Management</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={onFilterClick}>
              <Filter className="h-4 w-4" />
            </Button>
            <Button onClick={onAddClick}>
              <Plus className="mr-2 h-4 w-4" /> Add Item
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

