#!/usr/bin/env -S tsx

import fs from 'fs/promises';
import path from 'path';
import { launch } from "puppeteer-core";
import { XMLParser } from 'fast-xml-parser';

// Helpers
const formatDate = (date = new Date()) => {
  const d = new Date(date);
  return d.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const getSlug = (url: string) => {
  const regex = new RegExp(/https:\/\/eduardoborges.dev\/posts\/(.*)\//);
  const match = url.match(regex);
  return match ? match[1] : '';
}

interface Post {
  title: string;
  slug: string;
  date: string;
  description: string;
  link: string;
}

const parser = new XMLParser();

// variables

(async () => {
  const height = 630;
  const width = 1200;
  const baseSvg = await fs.readFile(path.resolve('./static/base-thumb.svg'), 'utf-8');

  console.log("📄  Reading posts from XML file");
  const xmlPosts = await fs.readFile('./dist/index.xml', 'utf-8').catch(() => {
    console.log("❌  Error reading XML file")
    process.exit(1);
  });

  console.log("🔄  Parsing XML file");
  const xml = parser.parse(xmlPosts)

  const posts : Post[] = xml.rss.channel?.item.map((post: any) => {
    return {
      title: post.title as string,
      slug: getSlug(post.link as string),
      date: post.pubDate as string,
      description: post.description as string,
      link: post.link as string,
    };
  });

  console.log(JSON.stringify(posts, null, 2));

  console.log("🖼️  Generating thumbnails for", posts.length, "posts", '\n');
  Promise.all(posts.map(async (post) => {
    let svg = baseSvg;

    Object.entries(post).forEach(([key, value]) => {
      svg = svg.replace(`{{ ${key} }}`, key.includes('date') ? formatDate(value) : value);
    });

    console.log("🔄 ", post.title);

    const browser = await launch({
      args: ['--no-sandbox'],
      executablePath: process.env.PUPPETEER_EXEC_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      // headless: false,
    });
    const page = await browser.newPage();
    await page.setContent(svg);
    await page.setViewport({ width, height });
    await fs.mkdir('.tmp/thumbs', { recursive: true });
    await page.screenshot({ path: `.tmp/thumbs/${post.slug}.png`, type: 'png' });
    await page.close();
    console.log("✅ ", post.title);
    return browser.close();
  })).then(async () => {
    console.log("\n📁 Moving files to static folder  ");
    await fs.mkdir('./dist/thumbs', { recursive: true });
    const files = await fs.readdir('.tmp/thumbs');
    await Promise.all(files.map(file => fs.rename(path.join('.tmp/thumbs', file), path.join('./dist/thumbs', file))));
    console.log('✅ All Done! ✨')
  });
})()



