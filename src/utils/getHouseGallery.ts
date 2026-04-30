import fs from 'node:fs';
import path from 'node:path';

const MAX_GALLERY_IMAGES = 10;

export function getHouseGallery(slug: string) {
  const houseDir = path.join(process.cwd(), 'public', 'images', 'houses', slug);
  const gallery: string[] = [];

  const coverFilePath = path.join(houseDir, 'cover.webp');

  if (fs.existsSync(coverFilePath)) {
    gallery.push(`/images/houses/${slug}/cover.webp`);
  }

  for (let index = 1; index <= MAX_GALLERY_IMAGES; index += 1) {
    const fileName = `${String(index).padStart(2, '0')}.webp`;
    const filePath = path.join(houseDir, fileName);

    if (fs.existsSync(filePath)) {
      gallery.push(`/images/houses/${slug}/${fileName}`);
    }
  }

  return gallery;
}
