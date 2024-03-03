function getLocalImage(imageUrl: string) {
  if (!(imageUrl.startsWith("http://") || imageUrl.startsWith("https://"))) {
    if (imageUrl.startsWith("user")) {
      return `https://toothbook.onrender.com/uploads/users/${imageUrl}`;
    }
    return `https://toothbook.onrender.com/uploads/${imageUrl}`;
  }
  return imageUrl;
}

export default getLocalImage;
