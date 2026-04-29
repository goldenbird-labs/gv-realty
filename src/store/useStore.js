import { create } from 'zustand'
import { properties } from '../data/properties'

export const useStore = create((set, get) => ({
  // All properties (will be replaced by Supabase)
  properties,
  filteredProperties: properties,
  loading: false,

  // Filters
  filters: {
    type: 'all',       // all | sale | rent | commercial
    propertyType: 'all',
    minPrice: 0,
    maxPrice: 25000000,
    beds: 'any',
    city: '',
    query: '',
  },

  setFilter: (key, value) => {
    set(state => ({
      filters: { ...state.filters, [key]: value },
    }))
    get().applyFilters()
  },

  resetFilters: () => {
    set({
      filters: {
        type: 'all',
        propertyType: 'all',
        minPrice: 0,
        maxPrice: 25000000,
        beds: 'any',
        city: '',
        query: '',
      },
    })
    set({ filteredProperties: properties })
  },

  applyFilters: () => {
    const { filters } = get()
    const result = properties.filter(p => {
      if (filters.type !== 'all' && p.type !== filters.type) return false
      if (filters.propertyType !== 'all' && p.propertyType !== filters.propertyType) return false
      if (p.price < filters.minPrice || p.price > filters.maxPrice) return false
      if (filters.beds !== 'any' && p.beds < parseInt(filters.beds)) return false
      if (filters.city && !p.city.toLowerCase().includes(filters.city.toLowerCase())) return false
      if (filters.query) {
        const q = filters.query.toLowerCase()
        if (!p.title.toLowerCase().includes(q) &&
            !p.description.toLowerCase().includes(q) &&
            !p.city.toLowerCase().includes(q) &&
            !p.address.toLowerCase().includes(q)) return false
      }
      return true
    })
    set({ filteredProperties: result })
  },

  // Saved/favourites
  saved: [],
  toggleSaved: (id) => set(state => ({
    saved: state.saved.includes(id)
      ? state.saved.filter(s => s !== id)
      : [...state.saved, id],
  })),
}))
