export function getFilterSelectorWidth(filterName: string): string {
  const extraSpace = 44;
  const dynamicSpace = filterName.length * 9;
  return `${extraSpace + dynamicSpace}px`;
}
export function getFilterSelectorTransitionTime(filterName: string): string {
  return `${filterName.length * 0.03}s`;
}
