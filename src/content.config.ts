import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date().optional(),
    pubDate: z.coerce.date().optional(),
    tag: z.string().optional(),
    excerpt: z.string().optional(),
    description: z.string().optional(),
    author: z.string(),
  }),
});

export const collections = { blog };