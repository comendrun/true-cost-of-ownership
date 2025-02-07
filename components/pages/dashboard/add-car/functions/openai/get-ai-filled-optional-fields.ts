'use server'

import OpenAI from 'openai'
import {
  CarFormFields,
  CarFormOptionalFields,
  CarFormOptionalFieldsSchema,
  UserCarsTableRow
} from '../../types/types'
import { zodResponseFormat } from 'openai/helpers/zod.mjs'
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function getAIFilledOptionalFields(
  car: CarFormFields
): Promise<CarFormOptionalFields | null> {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: generateGetAIFilledOptionalFieldsMessages(car),
      max_tokens: 16384,
      response_format: zodResponseFormat(CarFormOptionalFieldsSchema, 'schema')
    })

    const { content } = completion.choices?.[0].message

    console.log('content', content)
    console.log('type of content', typeof content)

    const cleanedContent: string = content
      ?.replace(/```(?:json)?/g, '')
      .replace(/```$/, '')
      .trim() as string

    console.log('cleanedContent', cleanedContent)
    console.log('type of cleanedContent', typeof cleanedContent)

    const aiResponse: CarFormOptionalFields = JSON.parse(cleanedContent)

    console.log('aiResponse', aiResponse)
    console.log('type of aiResponse', typeof aiResponse)

    return aiResponse
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(
      error.message ||
        'There was an error while trying to [Get AI Filled Optional Fields]'
    )
  }
}

function generateGetAIFilledOptionalFieldsMessages(
  car: CarFormFields
): ChatCompletionMessageParam[] {
  const messages: ChatCompletionMessageParam[] = [
    {
      role: 'system',
      content: `
        You are an expert in calculating the Total Cost of Ownership (TCO) for private car owners, with specialized knowledge in car-related expenses in Germany. Your role is to:
            1. Suggest logical, data-driven values for optional fields based on the user's inputs, ensuring consistency and accuracy.
            2. Dynamically update dependent fields (e.g., remainingAmount, totalInterestPaid) when relevant inputs (e.g., purchasePrice, prepayment, interestRate) are provided or updated.
            3. Respect user-provided values—do NOT override or suggest changes for fields already filled unless inconsistencies are detected.
            4. Flag inconsistencies or missing inputs that could lead to inaccurate calculations.

        **Rules**:
            1. For fields with no value, suggest a logical default based on:
                - The field's description and constraints.
                - Other filled fields in the context.
                - Your expertise in car-related expenses.
            2. Ensure calculations are correct and align with Germany's automotive and financial norms.
            3. Provide all responses in structured JSON format with brief explanations for each generated value.

        **Additional Notes**:
            - Avoid repetitive or vague responses. Tailor your output to the user's car, financing details, and local factors.
            - Always explain the reasoning behind each suggestion or adjustment.
            - Check for logical inconsistencies (e.g., financing duration exceeding ownership years) and flag them with actionable feedback.
            When calculating TCO:
            - Factor in the planned years of ownership to prorate costs such as depreciation, insurance, and loan payments.
            - If ownership years are shorter than financing duration, flag the inconsistency and calculate TCO based only on the ownership years.
        `
    },

    {
      role: 'user',
      name: 'car-data-structure',
      content: `
      we would like to get a proper recommended value for the optional fields of the user car, in case the field is not filled by the user.
      Let me give you an overview of the fields and their values and what do they mean.
      Please suggest a proper value for the optional fields, based on their definition and the description.
            const carFormFields = {
                name: {description: "identifying name for user car", optional: true, value: ${car.name}, type: "string", recommendIfEmpty: true},
                brand: {description: "car brand", optional: false, value: ${car.brand}, type: "string", recommendIfEmpty: false},
                model: {description: "car model", optional: false, value: ${car.model}, type: "string", recommendIfEmpty: false},
                variant: {description: "specific model variant", optional: true, value: ${car.variant}, type: "string", recommendIfEmpty: true},
                year: {description: "manufacture or registration year", optional: false, value: ${car.year}, type: "number", recommendIfEmpty: false},
                mileage: {description: "total distance traveled", optional: false, value: ${car.mileage}, type: "number", recommendIfEmpty: false},
                plannedYearsOfOwnership: {description: "planned ownership duration", optional: false, value: ${car.plannedYearsOfOwnership}, type: "number", recommendIfEmpty: false},
                drivingExperienceYears: {description: "years of driving experience", optional: false, value: ${car.drivingExperienceYears}, type: "number", recommendIfEmpty: false},
                driverAgeRange: {description: "driver age range", optional: false, value: ${car.driverAgeRange}, type: "enum", options: ['18-25', '25-35', '35-55', '55+'], recommendIfEmpty: false},
                interiorScore: {description: "interior rating", optional: true, value: ${car.interiorScore}, type: "number", recommendIfEmpty: false},
                exteriorScore: {description: "exterior rating", optional: true, value: ${car.exteriorScore}, type: "number", recommendIfEmpty: false},
                purchasePrice: {description: "purchase price", optional: false, value: ${car.purchasePrice}, type: "number", recommendIfEmpty: false},
                prepayment: {description: "upfront payment", optional: false, value: ${car.prepayment}, type: "number", recommendIfEmpty: false},
                interestRate: {description: "loan interest rate", optional: true, value: ${car.interestRate}, type: "number", recommendIfEmpty: true},
                financingDuration: {description: "loan duration", optional: true, value: ${car.financingDuration}, type: "number", recommendIfEmpty: true},
                remainingAmount: {description: "remaining loan amount", optional: true, value: ${car.remainingAmount}, type: "number", recommendIfEmpty: true},
                totalInterestPaid: {description: "total interest paid", optional: true, value: ${car.totalInterestPaid}, type: "number", recommendIfEmpty: true},
                truePurchasePrice: {description: "true purchase price", optional: true, value: ${car.truePurchasePrice}, type: "number", recommendIfEmpty: true},
                initialPrice: {description: "initial sale price", optional: true, value: ${car.initialPrice}, type: "number", recommendIfEmpty: true},
                depreciationRate: {description: "depreciation rate", optional: true, value: ${car.depreciationRate}, type: "number", recommendIfEmpty: true},
                guaranteeYears: {description: "guarantee duration", optional: true, value: ${car.guaranteeYears}, type: "number", recommendIfEmpty: true},
                serviceCosts: {description: "annual service costs", optional: true, value: ${car.serviceCosts}, type: "number", recommendIfEmpty: true},
                serviceIncludes: {description: "included services", optional: true, value: ${car.serviceIncludes}, type: "string", recommendIfEmpty: true},
                tiresCosts: {description: "annual tire costs", optional: true, value: ${car.tiresCosts}, type: "number", recommendIfEmpty: true},
                oilChangeCosts: {description: "oil change cost", optional: true, value: ${car.oilChangeCosts}, type: "number", recommendIfEmpty: true},
                offerOnExtendedWarranty: {description: "extended warranty offer", optional: true, value: ${car.offerOnExtendedWarranty}, type: "boolean", recommendIfEmpty: true},
                extendedWarrantyCost: {description: "extended warranty cost", optional: true, value: ${car.extendedWarrantyCost}, type: "number", recommendIfEmpty: true},
                totalPlannedKMs: {description: "annual planned kilometers", optional: false, value: ${car.totalPlannedKMs}, type: "number", recommendIfEmpty: false},
                fuelConsumption: {description: "fuel consumption (L/100KM)", optional: true, value: ${car.fuelConsumption}, type: "number", recommendIfEmpty: true},
                fuelType: {description: "fuel type", optional: false, value: ${car.fuelType}, type: "enum", options: ['Diesel', 'Petrol', 'Hybrid/Diesel', 'Hybrid/Petrol', 'Electric'], recommendIfEmpty: false},
                averageFuelCost: {description: "average fuel cost", optional: true, value: ${car.averageFuelCost}, type: "number", recommendIfEmpty: true},
                insuranceType: {description: "insurance type", optional: false, value: ${car.insuranceType}, type: "enum", recommendIfEmpty: false},
                insuranceCost: {description: "annual insurance cost", optional: true, value: ${car.insuranceCost}, type: "number", recommendIfEmpty: true},
                tuvCosts: {description: "technical inspection cost", optional: true, value: ${car.tuvCosts}, type: "number", recommendIfEmpty: true},
                taxes: {description: "annual taxes", optional: true, value: ${car.taxes}, type: "number", recommendIfEmpty: true},
                parkingCosts: {description: "annual parking costs", optional: true, value: ${car.parkingCosts}, type: "number", recommendIfEmpty: true},
                estimatedResaleValue: {description: "estimated resale value", optional: true, value: ${car.estimatedResaleValue}, type: "number", recommendIfEmpty: true},
                resaleValueAfterYears: {description: "resale value after ownership", optional: true, value: ${car.resaleValueAfterYears}, type: "number", recommendIfEmpty: true},
                regularMaintenanceCosts: {description: "regular maintenance costs", optional: true, value: ${car.regularMaintenanceCosts}, type: "number", recommendIfEmpty: true},
                unexpectedRepairCosts: {description: "unexpected repair costs", optional: true, value: ${car.unexpectedRepairCosts}, type: "number", recommendIfEmpty: true},
                maintenanceFrequency: {description: "maintenance frequency", optional: true, value: ${car.maintenanceFrequency}, type: "string", recommendIfEmpty: true},
                emissions: {description: "car emissions", optional: true, value: ${car.emissions}, type: "number", recommendIfEmpty: true},
                ecoTax: {description: "eco tax", optional: true, value: ${car.ecoTax}, type: "number", recommendIfEmpty: true},
                tco: {description: "total cost of ownership", optional: true, type: "number", recommendIfEmpty: true}
            }
        `
    },

    {
      role: 'user',
      name: 'first-part-of-data-structure-explanation',
      content: `
      we would like to get a proper recommended value for the optional fields of the user car, in case the field is not filled by the user.
      Let me give you an overview of the fields and their values and what do they mean.
      Please suggest a proper value for the optional fields, based on their definition and the description.
        const carFormFields = {
            name: {
                description: "the field is defined to give an identifying name for the entity for the user to be able to recognise the car later on",
                optional: true,
                value: ${car.name},
                expectedValueType: "string",
                shouldBeRecommendedByAIIncaseEmpty: true
            },
            brand: {
                description: "It's the brand of the car that the user is trying to get the tco for.",
                optional: false,
                value: ${car.brand},
                expectedValueType: "string",
                shouldBeRecommendedByAIIncaseEmpty: false
            },
            model: {
                description: "It's the model of the car so it will in the end be ${car.model} of ${car.brand} brand",
                optional: false,
                value: ${car.model},
                expectedValueType: "string",
                shouldBeRecommendedByAIIncaseEmpty: false
            },
            variant: {
                description: "In case the car is a specific model which the user can define it here as a variant.",
                optional: true,
                value: ${car.variant},
                expectedValueType: "string",
                shouldBeRecommendedByAIIncaseEmpty: true
            },
            year: {
                description: "the year the car was manufactured or had its first registration.",
                optional: false,
                value: ${car.year},
                expectedValueType: "number",
                shouldBeRecommendedByAIIncaseEmpty: false
            },
            mileage: {
                description: "the total distance the car has traveled up until the time of purchase.",
                optional: false,
                value: ${car.mileage},
                expectedValueType: "number",
                shouldBeRecommendedByAIIncaseEmpty: false
            },
            plannedYearsOfOwnership: {
                description: "the number of years the user plans to own the car.",
                optional: false,
                value: ${car.plannedYearsOfOwnership},
                expectedValueType: "number",
                shouldBeRecommendedByAIIncaseEmpty: false
            },
            drivingExperienceYears: {
                description: "the number of years the user has been driving and is holder of a driving licence.",
                optional: false,
                value: ${car.drivingExperienceYears},
                expectedValueType: "number",
                shouldBeRecommendedByAIIncaseEmpty: false
            },
            driverAgeRange: {
                description: "the age range of the driver",
                optional: false,
                value: ${car.driverAgeRange},
                expectedValueType: "enum" (['18-25', '25-35', '35-55', '55+']),
                shouldBeRecommendedByAIIncaseEmpty: false
            },
            interiorScore: {
                description: "the user's rating of the car's interior",
                optional: true,
                value: ${car.interiorScore},
                expectedValueType: "number",
                shouldBeRecommendedByAIIncaseEmpty: false
            },
            exteriorScore: {
                description: "the user's rating of the car's exterior",
                optional: true,
                value: ${car.exteriorScore},
                expectedValueType: "number",
                shouldBeRecommendedByAIIncaseEmpty: false
            },
            purchasePrice: {
                description: "the price at which the car was purchased or will be purchased.",
                optional: false,
                value: ${car.purchasePrice},
                expectedValueType: "number",
                shouldBeRecommendedByAIIncaseEmpty: false
            },
            prepayment: {
                description: "the amount paid upfront for the car",
                optional: false,
                value: ${car.prepayment},
                expectedValueType: "number",
                shouldBeRecommendedByAIIncaseEmpty: false
            },
            interestRate: {
                description: "the interest rate on the car loan based on the local rates in the region (by default Germany)",
                optional: true,
                value: ${car.interestRate},
                expectedValueType: "number",
                shouldBeRecommendedByAIIncaseEmpty: true
            },
            financingDuration: {
                description: "the duration of the car loan",
                optional: true,
                value: ${car.financingDuration},
                expectedValueType: "number",
                shouldBeRecommendedByAIIncaseEmpty: true
            },
            remainingAmount: {
                description: "the remaining amount to be paid on the car loan, which is purchasePrice - prepayment",
                optional: true,
                value: ${car.remainingAmount},
                expectedValueType: "number",
                shouldBeRecommendedByAIIncaseEmpty: true
            },
            totalInterestPaid: {
                description: "the total interest paid on the car loan. This should be calculated based on the loan amount and financingDuration and the Interest rate.",
                optional: true,
                value: ${car.totalInterestPaid},
                expectedValueType: "number",
                shouldBeRecommendedByAIIncaseEmpty: true
            },
            truePurchasePrice: {
                description: "the true purchase price of the car after all costs which is going to be the purchasePrice + totalInterestPaid",
                optional: true,
                value: ${car.truePurchasePrice},
                expectedValueType: "number",
                shouldBeRecommendedByAIIncaseEmpty: true
            },
            initialPrice: {
                description: "the initial price of the vehicle when it was first sold as new. This should be calculated or estimated based on the number of factors, including the region (by default Germany), the year the car was manufactured (${car.year}), the brand  (${car.brand})and the model (${car.model}) ",
                optional: true,
                value: ${car.initialPrice},
                expectedValueType: "number",
                shouldBeRecommendedByAIIncaseEmpty: true
            },
            depreciationRate: {
                description: "the rate at which the car depreciates in value. This should be determined by the other values provided by the user and should be determined by the AI based on the other similar cars' avaialble data",
                optional: true,
                value: ${car.depreciationRate},
                expectedValueType: "number",
                shouldBeRecommendedByAIIncaseEmpty: true
            },
            guaranteeYears: {
                description: "the number of years the car is guaranteed by the manufacturer or the dealership",
                optional: true,
                value: ${car.guaranteeYears},
                expectedValueType: "number",
                shouldBeRecommendedByAIIncaseEmpty: true
            },
            serviceCosts: {
                description: "the annual regular service costs for the car",
                optional: true,
                value: ${car.serviceCosts},
                expectedValueType: "number",
                shouldBeRecommendedByAIIncaseEmpty: true
            },
            serviceIncludes: {
                description: "the services included in the annual service costs. it should usually include the oil change and etc which should be specific to the brands and their service as well. so the AI should determine this in case its empty based on the the brand  (${car.brand})and the model (${car.model})",
                optional: true,
                value: ${car.serviceIncludes},
                expectedValueType: "string",
                shouldBeRecommendedByAIIncaseEmpty: true
            },
            tiresCosts: {
                description: "the average annual cost of replacing the tires of the cars. of course the tires should not be changed annually, but the overall price of the tires (per 2-3 years) can be divided to get the amount for one year.",
                optional: true,
                value: ${car.tiresCosts},
                expectedValueType: "number",
                shouldBeRecommendedByAIIncaseEmpty: true
            },
            oilChangeCosts: {
                description: "the cost of an oil change",
                optional: true,
                value: ${car.oilChangeCosts},
                expectedValueType: "number",
                shouldBeRecommendedByAIIncaseEmpty: true
            },
            offerOnExtendedWarranty: {
                description: "whether an extended warranty is offered by the manufacturer or the dealership",
                optional: true,
                value: ${car.offerOnExtendedWarranty},
                expectedValueType: "boolean",
                shouldBeRecommendedByAIIncaseEmpty: true
            },
            extendedWarrantyCost: {
                description: "the cost of the extended warranty in case its offered",
                optional: true,
                value: ${car.extendedWarrantyCost},
                expectedValueType: "number",
                shouldBeRecommendedByAIIncaseEmpty: true
            },
            totalPlannedKMs: {
                description: "the total number of KMs planned to drive the car yearly by the user.",
                optional: false,
                value: ${car.totalPlannedKMs},
                expectedValueType: "number",
                shouldBeRecommendedByAIIncaseEmpty: false
            },
            ... TO_BE_CONTINUED_IN_THE_SECOND_PART_SYSTEM

        }
      `
    },

    {
      role: 'user',
      name: 'second-part-of-data-structure-explanation',
      content: `
       fuelConsumption: {
                description: "the fuel consumption of the car in liters per 100KM",
                optional: true,
                value: ${car.fuelConsumption},
                expectedValueType: "number",
                shouldBeRecommendedByAIIncaseEmpty: true
            },
            fuelType: {
                description: "the type of fuel the car uses",
                optional: false,
                value: ${car.fuelType},
                expectedValueType: "enum",
                [
                'Diesel',
                'Petrol',
                'Hybrid/Diesel',
                'Hybrid/Petrol',
                'Electric'
                ]
                shouldBeRecommendedByAIIncaseEmpty: false
            },
            averageFuelCost: {
                description: "the average cost of fuel, depending on the region and the fuel type: ${car.fuelType} and the region (default: Germany)",
                optional: true,
                value: ${car.averageFuelCost},
                expectedValueType: "number",
                shouldBeRecommendedByAIIncaseEmpty: true
            },
            insuranceType: {
                description: "the type of insurance for the car",
                optional: false,
                value: ${car.insuranceType},
                expectedValueType: "enum",
                shouldBeRecommendedByAIIncaseEmpty: false
            },
            insuranceCost: {
                description: "the cost of insurance for the car annually based on the type of the insurance (${car.insuranceType}) and the Fuel Type (${car.fuelType}) and the car brand (${car.brand}) and model (${car.model}) on average",
                optional: true,
                value: ${car.insuranceCost},
                expectedValueType: "number",
                shouldBeRecommendedByAIIncaseEmpty: true
            },
            tuvCosts: {
                description: "the cost of the technical inspection (by default in Germany). please consider that this cost if meant to be annualy. and for your information the tuv in germany for the new cars is issued for 3 years and after that for 2 years. so when calculating this please consider the planned years of ownership (${car.plannedYearsOfOwnership} years) and first registration (${car.year}) and current year (${new Date().getFullYear()}). for example if the car is 3 years old, and we are planning on keeping the car for 3 years, we will only have to get the TUV for the car ONCE, and so on. And each time doing tuv would cost around 120 euros (get updated price for Germany online). so in this case it will only cost 120 euros for the User in the course of their ownership.",
                optional: true,
                value: ${car.tuvCosts},
                expectedValueType: "number",
                shouldBeRecommendedByAIIncaseEmpty: true
            },
            taxes: {
                description: "the annual taxes for the car (by default in Germany)",
                optional: true,
                value: ${car.taxes},
                expectedValueType: "number",
                shouldBeRecommendedByAIIncaseEmpty: true
            },
            parkingCosts: {
                description: "the cost of an average rented parking space in the region (by default in Germany)",
                optional: true,
                value: ${car.parkingCosts},
                expectedValueType: "number",
                shouldBeRecommendedByAIIncaseEmpty: true
            },
            estimatedResaleValue: {
                description: "the estimated resale value of the car based on the depriciation rate and the market predicitons.",
                optional: true,
                value: ${car.estimatedResaleValue},
                expectedValueType: "number",
                shouldBeRecommendedByAIIncaseEmpty: true
            },
            resaleValueAfterYears: {
                description: "the resale value of the car after a certain number of years, this is most probably same as the planned years of ownership (${car.plannedYearsOfOwnership})",
                optional: true,
                value: ${car.resaleValueAfterYears},
                expectedValueType: "number",
                shouldBeRecommendedByAIIncaseEmpty: true
            },
            regularMaintenanceCosts: {
                description: "the regular maintenance costs for the car",
                optional: true,
                value: ${car.regularMaintenanceCosts},
                expectedValueType: "number",
                shouldBeRecommendedByAIIncaseEmpty: true
            },
            unexpectedRepairCosts: {
                description: "the cost of unexpected repairs",
                optional: true,
                value: ${car.unexpectedRepairCosts},
                expectedValueType: "number",
                shouldBeRecommendedByAIIncaseEmpty: true
            },
            maintenanceFrequency: {
                description: "the frequency of maintenance for the car",
                optional: true,
                value: ${car.maintenanceFrequency},
                expectedValueType: "string",
                shouldBeRecommendedByAIIncaseEmpty: true
            },
            emissions: {
                description: "the emissions of the car",
                optional: true,
                value: ${car.emissions},
                expectedValueType: "number",
                shouldBeRecommendedByAIIncaseEmpty: true
            },
            ecoTax: {
                description: "the eco tax for the car, (by default in Germany)",
                optional: true,
                value: ${car.ecoTax},
                expectedValueType: "number",
                shouldBeRecommendedByAIIncaseEmpty: true
            },
            tco: {
                description: "the total cost of ownership for the car over the span of (${car.plannedYearsOfOwnership}) year and based on the resale value ${car.estimatedResaleValue} (which should be deducted from the overall amount of costs) and the other costs involved. this value should be the value predicted for the whole duration of the ownership for ${car.plannedYearsOfOwnership} years. To get the annual average number I will divide it myself. So we need to get the sum of all the possible costs that we have so far for this car (tires, service, tuv, insurance, interest, etc) and then deduct the resale value, then we get the Total cost of ownership for the period of ownership for this owner. feel free to include or exclude the items as you may think they should be included in the overall costs or not. this is the most important value for us, so take more time and consideration calculating this.
                The values should be coming from: (TOTAL_COSTS_PER_YEAR * plannedYearsOfOwnership (${car.plannedYearsOfOwnership}) ) - ESTIMATED_RESALE_VALUE (${car.estimatedResaleValue})

                basically we can say that we can calculate the tco like this:
                TCO = (Purchase Price - Prepayment + Financing Costs) 
                    + (Insurance Cost x Planned Years of Ownership) 
                    + (Fuel Consumption Costs x Planned Years of Ownership) 
                    + (Maintenance Costs x Planned Years of Ownership) 
                    + (Taxes x Planned Years of Ownership) 
                    + (Parking Costs x Planned Years of Ownership) 
                    + Other Costs (e.g., TÜV, eco-tax, etc.) 
                    - Resale Value
                ",
                optional: true,
                value: ,
                expectedValueType: "number",
                shouldBeRecommendedByAIIncaseEmpty: true
            }
       `
    },

    {
      role: 'user',
      name: 'provided-full-set-of-data',
      content: `
      Please generate the missing information from the car object in the requested format. Please generate a unique result based on the new values each time.
        Please review the car's details and suggest appropriate values for any optional fields based on the structure of the data that is provided in the first-part-of-data-structure-explanation and second-part-of-data-structure-explanation message structures:
      
      car: ${JSON.stringify(car, null, 2)}

    - Cross-check dependencies like remainingAmount, totalInterestPaid, and plannedYearsOfOwnership.
    - Highlight inconsistencies or gaps in inputs.
      `
    },

    {
      role: 'developer',
      content: `Please return the data in the following structure: 
        The return structure must be:
        {
            "name": "",
            "interestRate": "",
            "financingDuration": "",
            "remainingAmount": "",
            "totalInterestPaid": "",
            "truePurchasePrice": "",
            "initialPrice": "",
            "depreciationRate": "",
            "guaranteeYears": "",
            "serviceCosts": "",
            "serviceIncludes": "",
            "tiresCosts": "",
            "oilChangeCosts": "",
            "fuelConsumption": "",
            "averageFuelCost": "",
            "insuranceCost": "",
            "tuvCosts": "",
            "taxes": "",
            "parkingCosts": "",
            "estimatedResaleValue": "",
            "resaleValueAfterYears": "",
            "regularMaintenanceCosts": "",
            "unexpectedRepairCosts": "",
            "maintenanceFrequency": "",
            "emissions": "",
            "ecoTax": "",
            "tco": ""
        }

        when calculating and generating the final response, please considert he following points about the type of the accepted values and the description, but dont include any of this in the final object
        {
            "name": {
            "type": "string",
            "description": "Name of the car you want to analyze. Optional field."
            },
            "interestRate": {
            "type": "number",
            "description": "Interest rate for financing, represented as a percentage. Acceptable values range from 0 to 100."
            },
            "financingDuration": {
            "type": "number",
            "description": "Financing duration in years. This should be a number between 1 and 10."
            },
            "remainingAmount": {
            "type": "number",
            "description": "Remaining amount of financing to be paid, represented in Euros. This is an optional field."
            },
            "totalInterestPaid": {
            "type": "number",
            "description": "Total interest paid over the financing period, represented in Euros. Optional field."
            },
            "truePurchasePrice": {
            "type": "number",
            "description": "True purchase price after financing adjustments, represented in Euros. Optional field."
            },
            "initialPrice": {
            "type": "number",
            "description": "Initial price of the vehicle when it was first sold as brand new back in the manufactured year. This is an optional field, and the value should be in Euros."
            },
            "depreciationRate": {
            "type": "number",
            "description": "Depreciation rate of the vehicle, represented as a percentage. The value should range from 0 to 100."
            },
            "guaranteeYears": {
            "type": "number",
            "description": "Number of years of warranty provided for the vehicle. This field should be a positive integer."
            },
            "serviceCosts": {
            "type": "number",
            "description": "Annual service costs for the car, represented in Euros. Optional field."
            },
            "serviceIncludes": {
            "type": "string",
            "description": "Description of the services included in the annual service package. Optional field."
            },
            "tiresCosts": {
            "type": "number",
            "description": "Cost of tires, represented in Euros. This field is optional."
            },
            "oilChangeCosts": {
            "type": "number",
            "description": "Cost of oil changes, represented in Euros. Optional field."
            },
            "fuelConsumption": {
            "type": "number",
            "description": "Fuel consumption of the car in liters per 100 kilometers. This is an optional field."
            },
            "averageFuelCost": {
            "type": "number",
            "description": "Average cost of fuel per liter, represented in Euros. Optional field."
            },
            "insuranceCost": {
            "type": "number",
            "description": "Annual insurance cost, represented in Euros. Optional field."
            },
            "tuvCosts": {
            "type": "number",
            "description": "Costs for TÜV (vehicle inspection) in Euros. This is an optional field."
            },
            "taxes": {
            "type": "number",
            "description": "Yearly tax amount for the vehicle, represented in Euros. Optional field."
            },
            "parkingCosts": {
            "type": "number",
            "description": "Annual parking costs for the vehicle, represented in Euros. Optional field."
            },
            "estimatedResaleValue": {
            "type": "number",
            "description": "Estimated resale value of the car after a certain period, represented in Euros. This field is optional."
            },
            "resaleValueAfterYears": {
            "type": "number",
            "description": "Estimated resale value of the car after a specified number of years, represented in Euros. Optional."
            },
            "regularMaintenanceCosts": {
            "type": "number",
            "description": "Estimated regular maintenance costs, represented in Euros. This is an optional field."
            },
            "unexpectedRepairCosts": {
            "type": "number",
            "description": "Estimated costs for unexpected repairs, represented in Euros. Optional field."
            },
            "maintenanceFrequency": {
            "type": "string",
            "description": "Frequency of regular maintenance for the car, such as annually or every few years. Optional."
            },
            "emissions": {
            "type": "number",
            "description": "Emissions level of the vehicle in grams per kilometer. Optional field."
            },
            "ecoTax": {
            "type": "number",
            "description": "Eco tax amount for the vehicle, represented in Euros. Optional field."
            },
            "tco": {
            "type": "number",
            "description": "Total cost of ownership (TCO) for the vehicle, including purchase price, financing, fuel, and maintenance based on the number of the planned ownership years. but the estimated resale value should be deducted from this. This is an optional field."
            }
        }

        Respond with the appropriate values for each field based on the provided car data.
        - I dont need anything else, just return the object as provided and dont forget to calculate the values with care and accuracy as it is extremely important for me.
        `
    }
  ]

  console.log('messages', messages)

  return messages
}
