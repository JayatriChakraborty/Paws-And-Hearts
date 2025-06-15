
import * as z from "zod";

export const petFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  type: z.enum(["Dog", "Cat", "Other"]),
  age: z.enum(["Young", "Adult", "Senior"]),
  gender: z.enum(["Male", "Female"]),
  size: z.enum(["Small", "Medium", "Large"]),
  breed: z.string().min(2, "Breed must be at least 2 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  image: z.string().min(1, "An image is required."),
});

export type PetFormValues = z.infer<typeof petFormSchema>;
