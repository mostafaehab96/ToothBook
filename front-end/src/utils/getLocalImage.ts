function getLocalImage(imageUrl: string) {
  if (!(imageUrl.startsWith("http://") || imageUrl.startsWith("https://"))) {
    if (imageUrl.startsWith("user")) {
      return `http://localhost:4000/uploads/users/${imageUrl}`;
    }
    return `http://localhost:4000/uploads/${imageUrl}`;
  }
  return imageUrl;
}

export default getLocalImage;
