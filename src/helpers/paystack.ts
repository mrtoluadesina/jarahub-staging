import axois from 'axios';


export const verify = async (reference: string) => {
  let { data } = await axois({
    url: `https://api.paystack.co/transaction/verify/${reference}`,
    headers: {
      'Authorization': `Bearer ${process.env.PAYSTACK_KEY}`
    }
  })
  return data;
}