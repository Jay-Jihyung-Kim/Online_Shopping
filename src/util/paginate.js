import _ from "lodash";

export function paginate(products, currentpage, ItemsPerPage) {
  const startIndex = (currentpage - 1) * ItemsPerPage;

  return _(products).slice(startIndex).take(ItemsPerPage).value();
}
