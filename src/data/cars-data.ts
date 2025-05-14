export type CarModel = {
  name: string
  availableYears: number[]
  image?: string
}

export type CarBrand = {
  name: string
  models: CarModel[]
}

export const cars: CarBrand[] = [
  {
    name: 'Volkswagen',
    models: [
      {
        name: 'Passat',
        availableYears: [
          2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024
        ],
        image: 'volkswagen-passat.png'
      },
      {
        name: 'Golf',
        availableYears: [
          2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024
        ],
        image: 'volkswagen-golf.png'
      }
    ]
  },
  {
    name: 'Audi',
    models: [
      {
        name: 'A3',
        availableYears: [
          2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024
        ],
        image: 'audi-a3.png'
      },
      {
        name: 'A4 Avant',
        availableYears: [
          2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024
        ],
        image: 'audi-a4-avant.png'
      }
    ]
  },
  {
    name: 'BMW',
    models: [
      {
        name: '3 Series',
        availableYears: [
          2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024
        ],
        image: 'bmw-3-series.png'
      },
      {
        name: '5 Series',
        availableYears: [
          2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024
        ],
        image: 'bmw-5-series.png'
      }
    ]
  },
  {
    name: 'Mercedes-Benz',
    models: [
      {
        name: 'A250',
        availableYears: [
          2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024
        ],
        image: 'mercedes-benz.jpg'
      },
      {
        name: 'B250',
        availableYears: [
          2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024
        ],
        image: 'mercedes-benz.jpg'
      },
      {
        name: 'CLA180',
        availableYears: [
          2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024
        ],
        image: 'mercedes-benz.jpg'
      },
      {
        name: 'CLA220',
        availableYears: [
          2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024
        ],
        image: 'mercedes-benz.jpg'
      }
    ]
  },
  {
    name: 'Cupra',
    models: [
      {
        name: 'Formentor',
        availableYears: [2020, 2021, 2022, 2023, 2024],
        image: 'cupra-formentor.jpg'
      }
    ]
  },
  {
    name: 'Seat',
    models: [
      {
        name: 'Leon',
        availableYears: [
          2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024
        ],
        image: 'seat-logo.png'
      }
    ]
  },
  {
    name: 'Toyota',
    models: [
      {
        name: 'Corolla',
        availableYears: [
          2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024
        ],
        image: 'toyota-corolla.png'
      },
      {
        name: 'Avensis',
        availableYears: [2014, 2015, 2016, 2017, 2018],
        image: 'toyota-avensis.png'
      }
    ]
  }
]

export const getCarModelsByBrand = (
  brandName: string
): CarModel[] | undefined => {
  const brand = cars.find(brand => brand.name === brandName)
  return brand ? brand.models : undefined
}

// Get a list of all car brands
export const getAllBrands = (): string[] => {
  return cars.map(brand => brand.name)
}

// Get all models for a specific brand
export const getModelsByBrand = (brandName: string): string[] | undefined => {
  const brand = cars.find(brand => brand.name === brandName)
  return brand ? brand.models.map(model => model.name) : undefined
}

// Get available years for a specific model under a specific brand
export const getYearsByBrandAndModel = (
  brandName: string,
  modelName: string
): number[] | undefined => {
  const brand = cars.find(car => car.name === brandName)
  const model = brand?.models.find(car => car.name === modelName)
  return model ? model.availableYears : undefined
}

// Get all models and available years for a specific brand
export const getAllModelsAndYearsByBrand = (
  brandName: string
): { modelName: string; years: number[] }[] | undefined => {
  const brand = cars.find(brand => brand.name === brandName)
  return brand
    ? brand.models.map(model => ({
        modelName: model.name,
        years: model.availableYears
      }))
    : undefined
}

// Get all brands and models with available years
export const getAllBrandsModelsAndYears = (): {
  brandName: string
  models: { modelName: string; years: number[] }[]
}[] => {
  return cars.map(brand => ({
    brandName: brand.name,
    models: brand.models.map(model => ({
      modelName: model.name,
      years: model.availableYears
    }))
  }))
}

export const getCarImageByBrandAndModel = (
  brandName: string,
  modelName: string
) => {
  const brand = cars.find(car => car.name === brandName)
  const model = brand?.models.filter(
    model => model.name === modelName
  )?.[0] as CarModel
  const image = model.image
  console.log('image', image)

  return image
}
