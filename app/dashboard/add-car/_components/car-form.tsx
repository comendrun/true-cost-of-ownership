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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import NumberFormField from "@/components/ui/form/NumberFormField";

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
  fuelType: z.enum([
    "Diesel",
    "Petrol",
    "Hybrid/Diesel",
    "Hybrid/Petrol",
    "Electric",
  ]),
  averageFuelCost: z.number(),
  tco: z.number(),
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
  fuelType: "Petrol",
  averageFuelCost: 0,
  tco: 0,
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

  useEffect(() => {
    const values = getValues();
    const purchasePrice = values?.purchasePrice;
    const initialPrice = values?.initialPrice;
    const carFirstRegistration = values?.year;
    const carAge = new Date().getFullYear() - carFirstRegistration;
    const depreciationRate =
      (((initialPrice - purchasePrice) / purchasePrice) * 100) / carAge;
    console.log("depreciationRate", depreciationRate);

    if (depreciationRate > 0)
      setValue("depreciationRate", Number(depreciationRate.toFixed(2)));
  }, [
    getValues().initialPrice,
    getValues().purchasePrice,
    getValues,
    setValue,
  ]);

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="m-auto mt-5 flex w-full flex-col gap-8 divide-y-2 border p-5"
      >
        <div className="my-5 flex flex-col gap-4">
          <p className="mt-4">General Information</p>

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
                          onValueChange={(value) =>
                            field.onChange(Number(value))
                          }
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

          {/* mileage */}
          {/* <FormField
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
                          type="text"
                          {...field}
                          onChange={(e) => {
                            const { value } = e?.target;

                            if (/^\d*\.?\d{0,2}$/.test(value))
                              field.onChange(Number(value));
                          }}
                          suffix="Kilometers"
                        />
                      </FormControl>
                    </div>
                  </div>
                  <FormDescription>
                    How many Kilometers has this car been used for?
                  </FormDescription>
                  <FormMessage>{errors.mileage?.message}</FormMessage>
                </FormItem>
              );
            }}
          /> */}
          <NumberFormField
            control={control}
            errors={errors}
            disabled={!getValues().brand || !getValues().model}
            label="Mileage"
            inputSuffix="Kilometers"
            name="mileage"
            formDescription="How many Kilometers has this car been used for?"
          />
        </div>

        <div className="my-5 flex flex-col gap-4">
          <p className="mt-4">Personal Opinion</p>

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
                          onValueChange={(value) =>
                            field.onChange(Number(value))
                          }
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
                          onValueChange={(value) =>
                            field.onChange(Number(value))
                          }
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
        </div>

        <div className="my-5 flex flex-col gap-4">
          <p className="mt-4">Finance</p>
          {/* purchasePrice */}
          <FormField
            control={control}
            name="purchasePrice"
            disabled={!getValues().brand || !getValues().model}
            render={({ field }) => {
              return (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel>Price</FormLabel>
                    <div className="col-span-3 flex w-full items-center gap-2">
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => {
                            const { value } = e?.target;
                            field.onChange(Number(value));
                          }}
                          suffix="Euros"
                        />
                      </FormControl>
                    </div>
                  </div>
                  <FormDescription>
                    How much does the vehicle in total costs?
                  </FormDescription>
                  <FormMessage>{errors.purchasePrice?.message}</FormMessage>
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
                          suffix="Euros"
                          type="number"
                          {...field}
                          onChange={(e) => {
                            const { value } = e?.target;
                            field.onChange(Number(value));
                          }}
                        />
                      </FormControl>
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
                    <FormLabel>Remaining amount</FormLabel>
                    <div className="col-span-3 flex w-full items-center gap-2">
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          suffix="Euros"
                          // value={remainingAmount}
                          // onChange={(e) => {
                          //   const { value } = e?.target;
                          //   field.onChange(Number(value));
                          // }}
                        />
                      </FormControl>
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
                          suffix="Percentage"
                        />
                      </FormControl>
                    </div>
                  </div>
                  <FormDescription>
                    How much do you have to pay in interest for the taken
                    credit?
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
                          suffix="Years"
                        />
                      </FormControl>
                    </div>
                  </div>
                  <FormDescription>
                    How much do you have to pay in interest for the taken
                    credit?
                  </FormDescription>
                  <FormMessage>{errors.financingDuration?.message}</FormMessage>
                </FormItem>
              );
            }}
          />
        </div>

        <div className="my-5 flex flex-col gap-4">
          <p className="mt-4">The Car Depreciation Fields</p>
          {/* initialPrice */}
          <FormField
            control={control}
            name="initialPrice"
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
                          suffix="Euros"
                        />
                      </FormControl>
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
          {/* depreciationRate */}
          <FormField
            control={control}
            name="depreciationRate"
            disabled
            render={({ field }) => {
              return (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel>The car price depreciation rate</FormLabel>
                    <div className="col-span-3 flex w-full items-center gap-2">
                      <FormControl>
                        <Input type="number" {...field} suffix="Percentage" />
                      </FormControl>
                    </div>
                  </div>
                  <FormDescription>
                    How much the car has depreciated, per year.
                  </FormDescription>
                  <FormMessage>{errors.depreciationRate?.message}</FormMessage>
                </FormItem>
              );
            }}
          />
        </div>

        <div className="my-5 flex flex-col gap-4">
          <p className="mt-4">Guarantee and Service</p>
          {/* guaranteeYears */}
          <FormField
            control={control}
            name="guaranteeYears"
            disabled={!getValues().brand || !getValues().model}
            render={({ field }) => {
              return (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel>
                      How many years of Warranty does the car have?
                    </FormLabel>
                    <div className="col-span-3 flex w-full items-center gap-2">
                      <FormControl>
                        <Input type="number" {...field} suffix="Years" />
                      </FormControl>
                    </div>
                  </div>
                  <FormDescription></FormDescription>
                  <FormMessage>{errors.guaranteeYears?.message}</FormMessage>
                </FormItem>
              );
            }}
          />
          {/* serviceCosts */}
          <FormField
            control={control}
            name="serviceCosts"
            disabled={!getValues().brand || !getValues().model}
            render={({ field }) => {
              return (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel>
                      How much on average the car service costs?
                    </FormLabel>
                    <div className="col-span-3 flex w-full items-center gap-2">
                      <FormControl>
                        <Input type="number" {...field} suffix="Years" />
                      </FormControl>
                    </div>
                  </div>
                  <FormDescription>
                    There might be a difference between the service done at the
                    manufacturer and in private shops.
                  </FormDescription>
                  <FormMessage>{errors.serviceCosts?.message}</FormMessage>
                </FormItem>
              );
            }}
          />
          {/* serviceIncludes */}
          <FormField
            control={control}
            name="serviceIncludes"
            disabled={!getValues().brand || !getValues().model}
            render={({ field }) => {
              return (
                <FormItem>
                  <div className="mt-4 grid grid-cols-4 items-start gap-4">
                    <FormLabel className="mt-2">
                      Which services are included in the company regular service
                      checks?
                    </FormLabel>
                    <div className="col-span-3 flex w-full items-center gap-2">
                      <FormControl>
                        <Textarea rows={4} placeholder="Service Package" />
                      </FormControl>
                    </div>
                  </div>
                  <FormDescription>
                    In case the company is offering a regular service, which
                    items are being inspected and checked on each visit?
                  </FormDescription>
                  <FormMessage>{errors.serviceIncludes?.message}</FormMessage>
                </FormItem>
              );
            }}
          />
          {/* oilChangeCosts */}
          <FormField
            control={control}
            name="oilChangeCosts"
            disabled={!getValues().brand || !getValues().model}
            render={({ field }) => {
              return (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel>
                      How much on average changing the car oil costs?
                    </FormLabel>
                    <div className="col-span-3 flex w-full items-center gap-2">
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                    </div>
                  </div>
                  <FormDescription></FormDescription>
                  <FormMessage>{errors.oilChangeCosts?.message}</FormMessage>
                </FormItem>
              );
            }}
          />

          {/* offerOnExtendedWarranty */}
          <FormField
            control={control}
            name="offerOnExtendedWarranty"
            disabled={!getValues().brand || !getValues().model}
            render={({ field }) => {
              return (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel>
                      Does company allow for extending the warranty?
                    </FormLabel>
                    <div className="col-span-3 flex w-full items-center gap-2">
                      <FormControl>
                        <Checkbox
                          type="button"
                          checked={field.value}
                          onCheckedChange={(value) => {
                            console.log("e", value);
                            if (!value)
                              setValue("extendedWarrantyCost", undefined);
                            field.onChange(value);
                          }}
                          name={field.name}
                          ref={field.ref}
                          onBlur={field.onBlur}
                        />
                      </FormControl>
                    </div>
                  </div>
                  <FormDescription></FormDescription>
                  <FormMessage>
                    {errors.offerOnExtendedWarranty?.message}
                  </FormMessage>
                </FormItem>
              );
            }}
          />

          {/* extendedWarrantyCost */}
          <FormField
            control={control}
            name="extendedWarrantyCost"
            disabled={
              !getValues().brand ||
              !getValues().model ||
              !getValues().offerOnExtendedWarranty
            }
            render={({ field }) => {
              return (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel>
                      How much extending car guarantee by the manufacturer
                      costs?
                    </FormLabel>
                    <div className="col-span-3 flex w-full items-center gap-2">
                      <FormControl>
                        <Input type="number" {...field} suffix="Euros" />
                      </FormControl>
                    </div>
                  </div>
                  <FormDescription>
                    If the manufacturer is offering such possibility.
                  </FormDescription>
                  <FormMessage>
                    {errors.extendedWarrantyCost?.message}
                  </FormMessage>
                </FormItem>
              );
            }}
          />
        </div>

        <div className="my-5 flex flex-col gap-4">
          <p className="mt-4">Efficiency</p>
          {/* totalPlannedKMs */}
          <FormField
            control={control}
            name="totalPlannedKMs"
            disabled={!getValues().brand || !getValues().model}
            render={({ field }) => {
              return (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel>Planned traveling distance per year?</FormLabel>
                    <div className="col-span-3 flex w-full items-center gap-2">
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => {
                            const { value } = e?.target;
                            field.onChange(Number(value));
                          }}
                          suffix="Kilometers"
                        />
                      </FormControl>
                    </div>
                  </div>
                  <FormDescription>
                    How many Kilometers are you planning to drive this car, per
                    year?
                  </FormDescription>
                  <FormMessage>{errors.totalPlannedKMs?.message}</FormMessage>
                </FormItem>
              );
            }}
          />
          {/* fuelConsumption */}
          <FormField
            control={control}
            name="totalPlannedKMs"
            disabled={!getValues().brand || !getValues().model}
            render={({ field }) => {
              return (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel>Fuel per 100KM?</FormLabel>
                    <div className="col-span-3 flex w-full items-center gap-2">
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => {
                            const { value } = e?.target;
                            field.onChange(Number(value));
                          }}
                          suffix="Kilometers"
                        />
                      </FormControl>
                    </div>
                  </div>
                  <FormDescription>
                    How much fuel does the car burn per 100 Kilometers of
                    travel?
                  </FormDescription>
                  <FormMessage>{errors.totalPlannedKMs?.message}</FormMessage>
                </FormItem>
              );
            }}
          />
          {/* fuelType */}
          <FormField
            control={control}
            name="fuelType"
            disabled={!getValues().brand || !getValues().model}
            render={({ field }) => {
              return (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel>Fuel Type</FormLabel>
                    <div className="col-span-3 flex w-full">
                      <FormControl>
                        <Select
                          {...field}
                          value={field?.value?.toString()}
                          onValueChange={(value) => field.onChange(value)}
                        >
                          <SelectTrigger className="">
                            <SelectValue placeholder="Fuel Type" />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              "Diesel",
                              "Petrol",
                              "Hybrid/Diesel",
                              "Hybrid/Petrol",
                              "Electric",
                            ]?.map((fuelType, index) => (
                              <SelectItem
                                key={index}
                                value={fuelType.toString()}
                              >
                                {fuelType}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  <FormDescription></FormDescription>
                  <FormMessage>{errors.fuelType?.message}</FormMessage>
                </FormItem>
              );
            }}
          />
          {/* averageFuelCost */}
          <FormField
            control={control}
            name="averageFuelCost"
            disabled={!getValues().brand || !getValues().model}
            render={({ field }) => {
              return (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel>Average Fuel cost?</FormLabel>
                    <div className="col-span-3 flex w-full items-center gap-2">
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => {
                            const { value } = e?.target;
                            field.onChange(Number(value));
                          }}
                          suffix="Euros"
                        />
                      </FormControl>
                    </div>
                  </div>
                  <FormDescription>
                    How much a liter of the fuel type cost? for electric
                    vehicles, put the cost of each full charge.
                  </FormDescription>
                  <FormMessage>{errors.averageFuelCost?.message}</FormMessage>
                </FormItem>
              );
            }}
          />
        </div>

        <div className="my-5 flex flex-col gap-4">
          <p className="mt-4">Insurance</p>

          {/* insuranceType */}
          <FormField
            control={control}
            name="insuranceType"
            disabled={!getValues().brand || !getValues().model}
            render={({ field }) => {
              return (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel>Insurance Type</FormLabel>
                    <div className="col-span-3 flex w-full">
                      <FormControl>
                        <Select
                          {...field}
                          value={field?.value?.toString()}
                          onValueChange={(value) => field.onChange(value)}
                        >
                          <SelectTrigger className="">
                            <SelectValue placeholder="Fuel Type" />
                          </SelectTrigger>
                          <SelectContent>
                            {["Minimum", "Partial", "Full"]?.map(
                              (type, index) => (
                                <SelectItem key={index} value={type.toString()}>
                                  {type}
                                </SelectItem>
                              ),
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  <FormDescription></FormDescription>
                  <FormMessage>{errors.insuranceType?.message}</FormMessage>
                </FormItem>
              );
            }}
          />
          {/* insuranceCost */}
          <FormField
            control={control}
            name="insuranceCost"
            disabled={!getValues().brand || !getValues().model}
            render={({ field }) => {
              return (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel>Insurance Cost</FormLabel>
                    <div className="col-span-3 flex w-full items-center gap-2">
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => {
                            const { value } = e?.target;
                            field.onChange(Number(value));
                          }}
                          suffix="Euros"
                        />
                      </FormControl>
                    </div>
                  </div>
                  <FormDescription>Per Year.</FormDescription>
                  <FormMessage>{errors.insuranceCost?.message}</FormMessage>
                </FormItem>
              );
            }}
          />
        </div>

        <div className="my-5 flex flex-col gap-4">
          <p className="mt-4">Other</p>
          {/* tuvCosts */}
          <FormField
            control={control}
            name="tuvCosts"
            disabled={!getValues().brand || !getValues().model}
            render={({ field }) => {
              return (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel>TÜV Costs</FormLabel>
                    <div className="col-span-3 flex w-full items-center gap-2">
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => {
                            const { value } = e?.target;
                            field.onChange(Number(value));
                          }}
                          suffix="Euros"
                        />
                      </FormControl>
                    </div>
                  </div>
                  <FormDescription>Per Year.</FormDescription>
                  <FormMessage>{errors.tuvCosts?.message}</FormMessage>
                </FormItem>
              );
            }}
          />
          {/* tiresCosts */}
          <FormField
            control={control}
            name="tiresCosts"
            disabled={!getValues().brand || !getValues().model}
            render={({ field }) => {
              return (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel>Tires Costs</FormLabel>
                    <div className="col-span-3 flex w-full items-center gap-2">
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => {
                            const { value } = e?.target;
                            field.onChange(Number(value));
                          }}
                          suffix="Euros"
                        />
                      </FormControl>
                    </div>
                  </div>
                  <FormDescription>
                    Per Year. (Probably the same number for different cars
                    depending on the wheel size)
                  </FormDescription>
                  <FormMessage>{errors.tiresCosts?.message}</FormMessage>
                </FormItem>
              );
            }}
          />
          {/* taxes */}
          <FormField
            control={control}
            name="taxes"
            disabled={!getValues().brand || !getValues().model}
            render={({ field }) => {
              return (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel>Taxes</FormLabel>
                    <div className="col-span-3 flex w-full items-center gap-2">
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => {
                            const { value } = e?.target;
                            field.onChange(Number(value));
                          }}
                          suffix="Euros"
                        />
                      </FormControl>
                    </div>
                  </div>
                  <FormDescription>Per Year.</FormDescription>
                  <FormMessage>{errors.taxes?.message}</FormMessage>
                </FormItem>
              );
            }}
          />
        </div>

        <div className="flex w-full items-center justify-center gap-2">
          <Button className="w-full" type="submit">
            Save The Car
          </Button>
          <Button variant="outline" className="w-full">
            Create a PIE Chart
          </Button>
        </div>
      </form>
    </Form>
  );
}
