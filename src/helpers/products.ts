export const getActualPrice = (qty: number, productPrice: Object) => {
  let amount = 0;
  let lastKey = '';
  for (let key in productPrice) {
    lastKey = key;
    let nums = key.split('-');
    if (parseInt(nums[0]) <= qty && qty <= parseInt(nums[1])) {
      // @ts-ignore
      amount += parseInt(productPrice[key]);
      break;
    }
  }
  if (amount == 0) {
    let highestOrder = parseInt(lastKey.split('-')[1]);
    // @ts-ignore
    let firstTotal = Math.floor(qty / highestOrder) * parseInt(productPrice[lastKey]);
    amount = firstTotal + getActualPrice(qty % highestOrder, productPrice);
  }
  return amount;
};