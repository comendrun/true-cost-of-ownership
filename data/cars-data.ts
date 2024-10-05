export type CarModel = {
  name: string;
  availableYears: number[];
};

export type CarBrand = {
  name: string;
  models: CarModel[];
};

export const cars: CarBrand[] = [
  {
    name: "Volkswagen",
    models: [
      {
        name: "Passat",
        availableYears: [
          2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
        ],
      },
      {
        name: "Golf",
        availableYears: [
          2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
        ],
      },
    ],
  },
  {
    name: "Audi",
    models: [
      {
        name: "A3",
        availableYears: [
          2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
        ],
      },
      {
        name: "A4 Avant",
        availableYears: [
          2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
        ],
      },
    ],
  },
  {
    name: "BMW",
    models: [
      {
        name: "3 Series",
        availableYears: [
          2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
        ],
      },
      {
        name: "5 Series",
        availableYears: [
          2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
        ],
      },
    ],
  },
  {
    name: "Mercedes-Benz",
    models: [
      {
        name: "A250",
        availableYears: [
          2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
        ],
      },
      {
        name: "B250",
        availableYears: [
          2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
        ],
      },
      {
        name: "CLA180",
        availableYears: [
          2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
        ],
      },
      {
        name: "CLA220",
        availableYears: [
          2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
        ],
      },
    ],
  },
  {
    name: "Cupra",
    models: [
      {
        name: "Formentor",
        availableYears: [2020, 2021, 2022, 2023, 2024], // newer model
      },
    ],
  },
  {
    name: "Seat",
    models: [
      {
        name: "Leon",
        availableYears: [
          2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
        ],
      },
    ],
  },
  {
    name: "Toyota",
    models: [
      {
        name: "Corolla",
        availableYears: [
          2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
        ],
      },
      {
        name: "Avensis",
        availableYears: [2014, 2015, 2016, 2017, 2018], // discontinued in some markets after 2018
      },
    ],
  },
];

export const getCarModelsByBrand = (
  brandName: string,
): CarModel[] | undefined => {
  const brand = cars.find((brand) => brand.name === brandName);
  return brand ? brand.models : undefined;
};

// Get a list of all car brands
export const getAllBrands = (): string[] => {
  return cars.map((brand) => brand.name);
};

// Get all models for a specific brand
export const getModelsByBrand = (brandName: string): string[] | undefined => {
  const brand = cars.find((brand) => brand.name === brandName);
  return brand ? brand.models.map((model) => model.name) : undefined;
};

// Get available years for a specific model under a specific brand
export const getYearsByBrandAndModel = (
  brandName: string,
  modelName: string,
): number[] | undefined => {
  const brand = cars.find((brand) => brand.name === brandName);
  const model = brand?.models.find((model) => model.name === modelName);
  return model ? model.availableYears : undefined;
};

// Get all models and available years for a specific brand
export const getAllModelsAndYearsByBrand = (
  brandName: string,
): { modelName: string; years: number[] }[] | undefined => {
  const brand = cars.find((brand) => brand.name === brandName);
  return brand
    ? brand.models.map((model) => ({
        modelName: model.name,
        years: model.availableYears,
      }))
    : undefined;
};

// Get all brands and models with available years
export const getAllBrandsModelsAndYears = (): {
  brandName: string;
  models: { modelName: string; years: number[] }[];
}[] => {
  return cars.map((brand) => ({
    brandName: brand.name,
    models: brand.models.map((model) => ({
      modelName: model.name,
      years: model.availableYears,
    })),
  }));
};
