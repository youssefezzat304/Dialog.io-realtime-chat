import sharp from "sharp";

export async function processImage(file: Buffer): Promise<Buffer> {
  const processedImage = await sharp(file)
    .resize(800, 800, {
      fit: sharp.fit.inside,
      withoutEnlargement: true,
    })
    .toFormat("jpeg", { quality: 80 })
    .toBuffer();

  return processedImage;
}
