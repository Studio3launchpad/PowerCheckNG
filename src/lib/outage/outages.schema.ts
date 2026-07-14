import { z } from "zod";

export const FormSchema = z.object({
  area: z.string().min(2),
  discoCode: z.string().min(2),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),

  status: z.enum([
    "POWER_OFF",
    "POWER_ON",
    "NOT_SURE",
  ]),

  description: z.string().optional(),
});

export type FormValues = z.infer<typeof FormSchema>;