export default function separateParentsChildren(elements) {
  // Algorithm inspired by Wordpress's walk() function
  // Make two buckets -- parents and children
  var topLevelElements = []
  var childrenElements = []

  // if empty array or undefined, return empty buckets
  if (!elements) {
    return [topLevelElements, childrenElements]
  }

  // Loop through each element to place in a dedicated bucket
  elements.forEach(el => {
    if (!(el.parent === 0)) {
      // making a sparce array with key being id of a parent
      // if nested list already initialized on index, push another element
      if (
        childrenElements[el.parent] !== null &&
        typeof childrenElements[el.parent] == "object"
      ) {
        childrenElements[el.parent].push(el)
      } else {
        // create a nested list with element inside
        childrenElements[el.parent] = [el]
      }
    } else {
      topLevelElements.push(el)
    }
  })

  return [topLevelElements, childrenElements]
}
