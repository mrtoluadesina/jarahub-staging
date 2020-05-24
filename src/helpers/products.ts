export const getActualPrice = (qty: number, productPrice: Object) => {
  let amount = 0;
  // initialize a lastkey to hold quantity range in productPrice
  /**
   eg. productPrice = {
     "1-20": 500,
     "21-40": 480
   }
   */
  let lastKey = '';
  for (let key in productPrice) {
    lastKey = key;
    let nums = key.split('-');
    if (parseInt(nums[0]) <= qty && qty <= parseInt(nums[1])) {
      // @ts-ignore
      amount += parseInt(productPrice[key]); // evaluate amount and add to actual amount
      break;
    }
  }
  // if amount is not found, means that quantity exceeds the range so take out all possible range { greedy algo }
  if (amount == 0) {
    let highestOrder = parseInt(lastKey.split('-')[1]);
    // @ts-ignore
    let firstTotal =
      //@ts-ignore
      Math.floor(qty / highestOrder) * parseInt(productPrice[lastKey]);
    amount = firstTotal + getActualPrice(qty % highestOrder, productPrice);
  }
  return amount;
};
