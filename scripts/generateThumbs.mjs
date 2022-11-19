#!/usr/bin/env zx
import 'zx/globals';
import { spinner } from 'zx/experimental'
import fs from 'fs/promises';
import { launch } from "puppeteer-core";
import { parse } from 'csv-parse/sync';

// Helpers
const formatDate = (date = new Date()) => {
  const d = new Date(date);
  return d.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// variables
const height = 630;
const width = 1200;
const baseSvg = await fs.readFile(path.resolve('./static/base-thumb.svg'), 'utf-8');

const csvPosts = await $`hugo list all`.quiet();
const posts = parse(csvPosts.toString(), {
  columns: true,
  skip_empty_lines: true
});

console.log("🖼️  Generating thumbnails for", posts.length, "posts", '\n');

Promise.all(posts.map(async (post) => {
  let svg = baseSvg;

  Object.entries(post).forEach(([key, value]) => {
    svg = svg.replace(`{{ ${key} }}`, key.includes('Date') ? formatDate(value) : value);
  });

  console.log("🔄 ", post.title);

  const browser = await launch({ args: ['--no-sandbox'],
    executablePath: process.env.PUPPETEER_EXEC_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    // headless: false,
  });
  const page = await browser.newPage();
  await page.setContent(svg);
  await page.setViewport({ width, height });
  await $`mkdir -p .tmp/thumbs`.quiet();
  await page.screenshot({ path: `.tmp/thumbs/${post.slug}.png`, type: 'png' });
  await page.close();
  console.log("✅ ", post.title);
  return browser.close();
})).then(async () => {
  console.log("\n📁 Moving files to static folder  ");
  await $`mkdir -p ./dist/thumbs`.quiet();
  await $`mv -f .tmp/thumbs/* ./dist/thumbs/`.quiet();
  console.log('✅ All Done! ✨')
})