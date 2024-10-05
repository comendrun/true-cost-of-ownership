"use client";
import React, { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getAllBrands,
  getModelsByBrand,
  getYearsByBrandAndModel,
} from "@/data/cars-data";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// car brand, car model, car year, user interior score, user exterior score, purchase price, prepayment, remaining amount, interest rate, financing duration, initial price of the model, current used car price, depreciation amounted from the difference in prices, guarantee?, guarantee years?, service cost, offer on service costs, tires (winter, summer), tire costs (probably similar), TUV costs (probably similar), brakes change costs, insurance (vollkasko), taxes, fuel consumption, total planned KMs per year, extended warranty cost?, oil change costs (probably included in service costs)

const carFormSchema = z.object({
  brand: z
    .string()
    .min(1, { message: "Please select a car brand from the list." }),
  model: z
    .string()
    .min(1, { message: "Please select a car model from the list." }),

  year: z.number(),
  mileage: z.number(), // KM
  interiorScore: z
    .number()
    .min(1, "Value must be at least 1")
    .max(10, "Value must be at most 10")
    .optional(),
  exteriorScore: z
    .number()
    .min(1, "Value must be at least 1")
    .max(10, "Value must be at most 10")
    .optional(),
  purchasePrice: z.number(), // euros
  prepayment: z.number(), // euros
  remainingAmount: z.number(), // euros
  interestRate: z.number(), // percentage
  financingDuration: z.number().max(10), // years
  initialPrice: z.number(), // euros
  depreciationRate: z.number(), // percentage
  guaranteeYears: z.number(), // years
  serviceCosts: z.number(), // euros
  serviceIncludes: z.string(), // list of the services
  tiresCosts: z.number(), // euros, probably similar for different cars
  tuvCosts: z.number(), // euros, probably similar for different cars
  oilChangeCosts: z.number(), // euros, as an example of the costs associated to the car
  insuranceType: z.enum(["Minimum", "Partial", "Full"]),
  insuranceCost: z.number(), // euros, depends on the car
  taxes: z.number(), // yearly
  totalPlannedKMs: z.number(), // KMs, total number of KMs planned to drive the car yearly
  fuelConsumption: z.number(), // liters per 100KM
  offerOnExtendedWarranty: z.boolean().optional(),
  extendedWarrantyCost: z.number().optional(),
});

type CarFormValues = z.infer<typeof carFormSchema>;

const defaultValues: CarFormValues = {
  brand: "", // Initially empty; a brand must be selected
  model: "", // Initially empty; a model must be selected
  year: 0, // Current year as default
  mileage: 0, // Default to 0 km (brand new)
  interiorScore: 5, // Midpoint score (on a scale of 1-10)
  exteriorScore: 5, // Midpoint score (on a scale of 1-10)
  purchasePrice: 20000, // Example purchase price in euros
  prepayment: 0, // Example prepayment in euros
  remainingAmount: 0, // Calculated as purchase price - prepayment
  interestRate: 5, // Example interest rate in percentage
  financingDuration: 5, // Financing duration of 5 years
  initialPrice: 25000, // Initial price of the model (new price)
  depreciationRate: 15, // Example depreciation rate in percentage per year
  guaranteeYears: 2, // Example guarantee duration in years
  serviceCosts: 300, // Example service costs in euros per year
  serviceIncludes: "Regular maintenance, oil change", // Example list of included services
  tiresCosts: 400, // Example costs for tires in euros per year
  tuvCosts: 80, // Example Tüv costs in euros per year
  oilChangeCosts: 100, // Example oil change costs in euros
  insuranceType: "Full", // Default insurance type
  insuranceCost: 800, // Example insurance cost in euros per year
  taxes: 150, // Example yearly taxes in euros
  totalPlannedKMs: 15000, // Example total planned kilometers per year
  fuelConsumption: 6, // Example fuel consumption in liters per 100 km
  offerOnExtendedWarranty: false, // Default to not offering extended warranty
  extendedWarrantyCost: undefined, // No cost associated initially
};

export default function CarForm() {
  const form = useForm<CarFormValues>({
    resolver: zodResolver(carFormSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<CarFormValues> = (data) => {
    console.log("data", data);
  };

  const {
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    setValue,
  } = form;

  useEffect(() => {
    const values = getValues();
    const purchasePrice = values?.purchasePrice;
    const prepayment = values?.prepayment;
    const remainingAmount = Number(purchasePrice) - Number(prepayment);
    setValue("remainingAmount", remainingAmount);
  }, [getValues().purchasePrice, getValues().prepayment, getValues, setValue]);

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="m-auto mt-5 flex w-full flex-col gap-6 border p-5 xl:max-w-[50%]"
      >
        {/* list of the items in the page */}
        {/* Car Model */}
        <FormField
          control={control}
          name="brand"
          render={({ field }) => (
            <FormItem className="">
              <div className="grid grid-cols-4 items-center gap-4">
                <FormLabel className="col-span-1">Car Brand</FormLabel>
                <div className="col-span-3 flex w-full">
                  <FormControl>
                    <Select
                      {...field}
                      //   value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a Car Brand" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        {getAllBrands().map((brand, index) => (
                          <SelectItem key={index} value={brand}>
                            {brand}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <FormDescription>
                Select a car brand, from the list of the available options.
              </FormDescription>
              <FormMessage>{errors.brand?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="model"
          disabled={!getValues().brand}
          render={({ field }) => {
            const values = getValues();
            const brand = values?.brand;
            return (
              <FormItem>
                <div className="grid grid-cols-4 items-center gap-4">
                  <FormLabel>Car Model</FormLabel>
                  <div className="col-span-3 flex w-full">
                    <FormControl>
                      <Select
                        {...field}
                        // value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="">
                          <SelectValue placeholder="Select a Car Model" />
                        </SelectTrigger>
                        <SelectContent>
                          {getModelsByBrand(brand)?.map((model, index) => (
                            <SelectItem key={index} value={model}>
                              {model}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <FormDescription>
                  Please first select the car brand to be able to select Car
                  Model.
                </FormDescription>
                <FormMessage>{errors.model?.message}</FormMessage>
              </FormItem>
            );
          }}
        />

        {/* year */}
        <FormField
          control={control}
          name="year"
          disabled={!getValues().brand || !getValues().model}
          render={({ field }) => {
            const values = getValues();
            const brand = values?.brand;
            const model = values?.model;
            return (
              <FormItem>
                <div className="grid grid-cols-4 items-center gap-4">
                  <FormLabel>First Registration Year</FormLabel>
                  <div className="col-span-3 flex w-full">
                    <FormControl>
                      <Select
                        {...field}
                        value={field.value.toString()}
                        onValueChange={(value) => field.onChange(Number(value))}
                      >
                        <SelectTrigger className="">
                          <SelectValue placeholder="First Registration" />
                        </SelectTrigger>
                        <SelectContent>
                          {getYearsByBrandAndModel(brand, model)?.map(
                            (year, index) => (
                              <SelectItem key={index} value={year.toString()}>
                                {year}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <FormDescription>
                  Please select the year that the car was first registered in.
                </FormDescription>
                <FormMessage>{errors.year?.message}</FormMessage>
              </FormItem>
            );
          }}
        />

        {/* <FormField
          control={control}
          name="year"
          disabled={!getValues().brand}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel></FormLabel>
                <FormControl></FormControl>
                <FormDescription></FormDescription>
                <FormMessage>{errors.year?.message}</FormMessage>
              </FormItem>
            );
          }}
        /> */}

        {/* mileage */}
        <FormField
          control={control}
          name="mileage"
          disabled={!getValues().brand || !getValues().model}
          render={({ field }) => {
            return (
              <FormItem>
                <div className="grid grid-cols-4 items-center gap-4">
                  <FormLabel>Mileage</FormLabel>
                  <div className="col-span-3 flex w-full items-center gap-2">
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => {
                          const { value } = e?.target;
                          field.onChange(Number(value));
                        }}
                      />
                    </FormControl>
                    <p className="text-sm">Kilometers</p>
                  </div>
                </div>
                <FormDescription>
                  How many Kilometers has this car been used for?
                </FormDescription>
                <FormMessage>{errors.mileage?.message}</FormMessage>
              </FormItem>
            );
          }}
        />

        {/* interiorScore */}
        <FormField
          control={control}
          name="interiorScore"
          disabled={!getValues().brand || !getValues().model}
          render={({ field }) => {
            return (
              <FormItem>
                <div className="grid grid-cols-4 items-center gap-4">
                  <FormLabel>Interior Design</FormLabel>
                  <div className="col-span-3 flex w-full">
                    <FormControl>
                      <Select
                        {...field}
                        value={field?.value?.toString()}
                        onValueChange={(value) => field.onChange(Number(value))}
                      >
                        <SelectTrigger className="">
                          <SelectValue placeholder="Interior score" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]?.map(
                            (rate, index) => (
                              <SelectItem key={index} value={rate.toString()}>
                                {rate}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <FormDescription>
                  {" "}
                  How do you rate the Interior Design of the car?
                </FormDescription>
                <FormMessage>{errors.interiorScore?.message}</FormMessage>
              </FormItem>
            );
          }}
        />
        {/* exteriorScore */}
        <FormField
          control={control}
          name="exteriorScore"
          disabled={!getValues().brand || !getValues().model}
          render={({ field }) => {
            return (
              <FormItem>
                <div className="grid grid-cols-4 items-center gap-4">
                  <FormLabel>Exterior Design </FormLabel>
                  <div className="col-span-3 flex w-full">
                    <FormControl>
                      <Select
                        {...field}
                        value={field?.value?.toString()}
                        onValueChange={(value) => field.onChange(Number(value))}
                      >
                        <SelectTrigger className="">
                          <SelectValue placeholder="Exterior Design score" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]?.map(
                            (rate, index) => (
                              <SelectItem key={index} value={rate.toString()}>
                                {rate}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <FormDescription>
                  {" "}
                  How do you rate the Exterior Design of the car?
                </FormDescription>
                <FormMessage>{errors.exteriorScore?.message}</FormMessage>
              </FormItem>
            );
          }}
        />
        {/* purchasePrice */}
        <FormField
          control={control}
          name="purchasePrice"
          disabled={!getValues().brand || !getValues().model}
          render={({ field }) => {
            return (
              <FormItem>
                <div className="grid grid-cols-4 items-center gap-4">
                  <FormLabel>Original Initial Price</FormLabel>
                  <div className="col-span-3 flex w-full items-center gap-2">
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => {
                          const { value } = e?.target;
                          field.onChange(Number(value));
                        }}
                      />
                    </FormControl>
                    <p className="text-sm">Euros</p>
                  </div>
                </div>
                <FormDescription>
                  How much was the car originally sold for?
                </FormDescription>
                <FormMessage>{errors.initialPrice?.message}</FormMessage>
              </FormItem>
            );
          }}
        />
        {/* prepayment */}
        <FormField
          control={control}
          name="prepayment"
          disabled={!getValues().brand || !getValues().model}
          render={({ field }) => {
            return (
              <FormItem>
                <div className="grid grid-cols-4 items-center gap-4">
                  <FormLabel>Prepayment</FormLabel>
                  <div className="col-span-3 flex w-full items-center gap-2">
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => {
                          const { value } = e?.target;
                          field.onChange(Number(value));
                        }}
                      />
                    </FormControl>
                    <p className="text-sm">Euros</p>
                  </div>
                </div>
                <FormDescription>
                  How much are you planning on paying upfront?
                </FormDescription>
                <FormMessage>{errors.prepayment?.message}</FormMessage>
              </FormItem>
            );
          }}
        />
        {/* remainingAmount */}
        <FormField
          control={control}
          name="remainingAmount"
          disabled
          render={({ field }) => {
            return (
              <FormItem>
                <div className="grid grid-cols-4 items-center gap-4">
                  <FormLabel>Prepayment</FormLabel>
                  <div className="col-span-3 flex w-full items-center gap-2">
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        // value={remainingAmount}
                        // onChange={(e) => {
                        //   const { value } = e?.target;
                        //   field.onChange(Number(value));
                        // }}
                      />
                    </FormControl>
                    <p className="text-sm">Euros</p>
                  </div>
                </div>
                <FormDescription>The credit amount.</FormDescription>
                <FormMessage>{errors.remainingAmount?.message}</FormMessage>
              </FormItem>
            );
          }}
        />
        {/* interestRate */}
        <FormField
          control={control}
          name="interestRate"
          render={({ field }) => {
            return (
              <FormItem>
                <div className="grid grid-cols-4 items-center gap-4">
                  <FormLabel>Interest Rate</FormLabel>
                  <div className="col-span-3 flex w-full items-center gap-2">
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => {
                          const { value } = e?.target;
                          field.onChange(Number(value));
                        }}
                      />
                    </FormControl>
                    <p className="text-sm">%</p>
                  </div>
                </div>
                <FormDescription>
                  How much do you have to pay in interest for the taken credit?
                </FormDescription>
                <FormMessage>{errors.interestRate?.message}</FormMessage>
              </FormItem>
            );
          }}
        />
        {/* financingDuration */}
        <FormField
          control={control}
          name="financingDuration"
          render={({ field }) => {
            return (
              <FormItem>
                <div className="grid grid-cols-4 items-center gap-4">
                  <FormLabel>Financing Duration</FormLabel>
                  <div className="col-span-3 flex w-full items-center gap-2">
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => {
                          const { value } = e?.target;
                          field.onChange(Number(value));
                        }}
                      />
                    </FormControl>
                    <p className="text-sm">Years</p>
                  </div>
                </div>
                <FormDescription>
                  How much do you have to pay in interest for the taken credit?
                </FormDescription>
                <FormMessage>{errors.financingDuration?.message}</FormMessage>
              </FormItem>
            );
          }}
        />
        {/* initialPrice */}
        {/* depreciationRate */}
        {/* guaranteeYears */}
        {/* serviceCosts */}
        {/* serviceIncludes */}
        {/* tiresCosts */}
        {/* tuvCosts */}
        {/* oilChangeCosts */}
        {/* insuranceType */}
        {/* insuranceCost */}
        {/* taxes */}
        {/* totalPlannedKMs */}
        {/* fuelConsumption */}
        {/* offerOnExtendedWarranty */}
        {/* extendedWarrantyCost */}

        <Button type="submit">Add Car</Button>
      </form>
    </Form>
  );
}
