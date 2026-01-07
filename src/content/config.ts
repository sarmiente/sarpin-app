import { defineCollection, z } from 'astro:content';


const blog = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.any(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		heroImage: z.string().optional(),
		category: z.string().optional(),
		categoryName: z.string().optional(),
		author: z.string().optional(),
		draft: z.boolean().default(false),
		read: z.number().optional(),
	}),
});



export const collections = { blog };
