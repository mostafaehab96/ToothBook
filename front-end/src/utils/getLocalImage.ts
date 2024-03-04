import { backendUrl } from "../Services/api_client";

function getLocalImage(imageUrl: string) {
  if (!(imageUrl.startsWith("http://") || imageUrl.startsWith("https://"))) {
    if (imageUrl.startsWith("user")) {
      return `${backendUrl}/uploads/users/${imageUrl}`;
    }
    return `${backendUrl}/uploads/${imageUrl}`;
  }
  return imageUrl;
}

export default getLocalImage;
