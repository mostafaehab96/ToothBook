function toTitleCase(str: string): string {
  const words = str.replace(/([A-Z]|\b_\b)/g, " $1").split(" ");

  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default toTitleCase;
