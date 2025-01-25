"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { AddItemModal } from "@/components/add-item-model"
import { FilterModal } from "@/components/filter-model"
import { InventoryTable } from "@/components/inventory-table"
import type { Category } from "@/types/inventory"

export default function Home() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])

  const handleCategoryChange = (category: Category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const handleResetFilters = () => {
    setSelectedCategories([])
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar onAddClick={() => setIsAddModalOpen(true)} onFilterClick={() => setIsFilterModalOpen(true)} />
      <main className="container mx-auto py-4">
        <InventoryTable selectedCategories={selectedCategories} />
      </main>

      <AddItemModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        selectedCategories={selectedCategories}
        onCategoryChange={handleCategoryChange}
        onReset={handleResetFilters}
      />
    </div>
  )
}

