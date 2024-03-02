function getLocalImage(imageUrl: string) {
  if (!(imageUrl.startsWith("http://") || imageUrl.startsWith("https://"))) {
    return `http://localhost:4000/uploads/${imageUrl}`;
  }
  return imageUrl;
}

export default getLocalImage;
