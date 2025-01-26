// the pages of the application

import {
  UserCarsTableInsert,
  UserCarsTableRow
} from '@/app/dashboard/add-car/_types/types'
import { SquareTerminal, Library } from 'lucide-react'

// dashboard, login, register, my-cars, add-cars, advanced, simple, home

export const routes = (car?: { id?: number; name?: string } | null) => ({
  dashboard: {
    title: 'Dashboard',
    url: '/dashboard'
  },
  'my-cars': {
    title: 'My Cars',
    url: '/dashboard/my-cars'
  },
  'add-car': {
    title: 'Add a New Car',
    url: '/dashboard/add-car'
  },
  settings: {
    title: 'User Settings',
    url: '/dashboard/settings'
  },
  simple: {
    title: 'Simple Form',
    url: '/dashboard/add-car/simple'
  },
  advanced: {
    title: 'Advanced Form',
    url: '/dashboard/add-car/advanced'
  },
  [`${car?.id}`]: {
    title: `Car (${car?.name || car?.id})`,
    url: `/dashboard/my-cars/${car?.id}`
  },
  // define a new breadcrumb route which would be the `/dashboard/my-cars/${car?.id}`/analysis
  analysis: {
    title: `Car Analysis (${car?.name || car?.id})`,
    url: `/dashboard/my-cars/${car?.id}/analysis`
  }
})

export const navItems = (cars?: UserCarsTableRow[] | null) => ({
  //   dashboard: {
  //     title: 'Dashboard',
  //     url: '/dashboard',
  //     icon: ''
  //   },
  navMain: {
    title: 'Dashbaord',
    mainItems: [
      {
        title: 'Dashboard',
        url: '/dashboard',
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: 'My Cars',
            url: '/dashboard/my-cars'
          },
          {
            title: 'Add a New Car',
            url: '/dashboard/add-car'
          },
          {
            title: 'Settings',
            url: '/dashboard/settings'
          }
        ]
      },
      {
        title: 'Forms',
        url: '/dashboard/add-car',
        icon: Library,
        isActive: false,
        items: [
          {
            title: 'Simple Form',
            url: '/dashboard/add-car/simple'
          },
          {
            title: 'Advanced Form',
            url: '/dashboard/add-car/advanced'
          }
        ]
      }
    ]
  },
  cars: {
    title: 'Recently Saved Cars',
    mainItems: cars?.map(car => ({
      name: car.name,
      url: `/dashboard/my-cars/${car.id}`,
      brand: car.brand,
      model: car.model,
      year: car.year
      // icon: Library
    }))
  }
})
