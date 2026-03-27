import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date().optional(),
    pubDate: z.coerce.date().optional(),
    tag: z.string().optional(),
    bannerImage: z.string().optional(),
    excerpt: z.string().optional(),
    description: z.string().optional(),
    author: z.string(),
  }),
});

const team = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    order: z.number(),
    email: z.string(),
    links: z
      .object({
        email: z.string().optional(),
        linkedin: z.string().optional(),
        'google-scholar': z.string().optional(),
        website: z.string().optional(),
        github: z.string().optional(),
        lab: z.string().optional(),
        'personal-page': z.string().optional(),
      })
      .optional(),
    image: z.string(),
    description: z.string().optional(),
    location: z.string().optional(),
    affiliation: z.string().optional(),
    research_group: z.string().optional(),
    research_interests: z.array(z.string()).optional(),
    publications: z.string().optional(),
    citations: z.string().optional(),
    typing_research_focus: z.array(z.string()).optional(),
    notable_projects: z.array(z.string()).optional(),
    affiliations: z.array(z.string()).optional(),
  }),
});

export const collections = { blog, team };