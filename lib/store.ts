import { carFormDefaultValues } from "@/data/consts";
import { CarFormValues } from "@/types";
import { create } from "zustand";

export type State = {
  carFormValues: CarFormValues;
};

export type Actions = {
  updateState: (values: CarFormValues) => void;
};

export const useCarFormStore = create<State & Actions>()((set) => ({
  carFormValues: carFormDefaultValues,
  updateState: (values: CarFormValues) =>
    set(() => ({
      carFormValues: values,
    })),
}));
