import z from "zod";
const jobSchema = z.object({
  company: z
    .string()
    .trim()
    .min(1, "Company name is requrired.")
    .min(5, "Atleast must have 5 characters."),
  position: z
    .string()
    .trim()
    .min(1, "Company position is required.")
    .min(4, "Atleast must have 4 characters."),
  location: z
    .string()
    .trim()
    .refine((val) => val === "" || val.length >= 5, {
      message: "Location must have 5 characters.",
    })
    .optional(),
  salary: z
    .string()
    .trim()
    .refine((val) => val === "" || val.length >= 3, {
      message: "Salary must have 3 characters.",
    })
    .optional(),
  jobUrl: z.string().trim().url("Enter valid url").optional(),
  notes: z
    .string()
    .trim()
    .refine((val) => val === "" || val.length === 10, {
      message: "Notes must have 10 characters.",
    })
    .optional(),
  tags: z.array(z.string().min(1, "Atleast must have one tag")).nonempty(),
});

export default jobSchema;
