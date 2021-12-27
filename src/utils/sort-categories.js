export default function sortCategories(arr, parentId = null, result = [], prefixCount = 0) {
  arr.forEach((el) => {
    if (el.parent?._id === parentId || el.parent === parentId) {
      result.push({ ...el, title: "-".repeat(prefixCount).concat(" ", el.title) });
      sortCategories(arr, el.value, result, prefixCount + 1);
    }
  });
  return result;
}
