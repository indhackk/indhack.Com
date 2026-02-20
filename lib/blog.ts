import fs from "fs";
import path from "path";
import matter from "gray-matter";

const blogDirectory = path.join(process.cwd(), "content/blog");

export interface BlogPost {
    slug: string;
    title: string;
    description: string;
    date: string;
    category: string;
    image: string;
    author: string;
    content: string;
    keywords: string[];
    draft?: boolean;
}

export function getAllPosts(): BlogPost[] {
    const fileNames = fs.readdirSync(blogDirectory);
    const allPosts = fileNames.map((fileName) => {
        const slug = fileName.replace(/\.md$/, "");
        const fullPath = path.join(blogDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);

        return {
            slug,
            content,
            title: data.title,
            description: data.description,
            date: data.date,
            category: data.category,
            image: data.image,
            author: data.author,
            keywords: data.keywords || [],
            draft: data.draft || false,
        };
    });

    return allPosts
        .filter(post => !post.draft)
        .sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | null {
    try {
        const fullPath = path.join(blogDirectory, `${slug}.md`);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);

        // Return null for draft posts (404)
        if (data.draft) {
            return null;
        }

        return {
            slug,
            content,
            title: data.title,
            description: data.description,
            date: data.date,
            category: data.category,
            image: data.image,
            author: data.author,
            keywords: data.keywords || [],
            draft: false,
        };
    } catch (e) {
        return null;
    }
}
