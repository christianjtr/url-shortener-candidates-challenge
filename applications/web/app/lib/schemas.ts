import { z } from "zod"

export const shortenFormSchema = z.object({
  url: z.string().min(1, "URL is required").url("Please include a valid URL"),
})

export type ShortenFormSchema = z.infer<typeof shortenFormSchema>
