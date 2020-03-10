import elasticsearch from '../elasticsearch/config';
import ControllerResponse from '../interfaces/ControllerResponse';
import sendResponse from '../helpers/response';
import { response } from 'express';

export async function searchProducts(
  searchQuery: string,
): Promise<ControllerResponse> {
  try {
    let individualQuery: Array<string> = searchQuery.split(' ');
    let product: Array<any>;

    individualQuery.forEach(async (query: string) => {
      let response = await elasticsearch.get({
        index: query,
        type: 'product',
        id: query,
      });
      console.log(response);
      product.push(response);
    });

    return sendResponse(200, 'Something', response, null, '');

    // elasticsearch.get(
    //   {
    //     index: searchQuery,
    //     type: 'product',
    //     id: '1',
    //   },
    //   function(err: any, response: any) {
    //     if (err) {
    //       console.log(err);
    //       return;
    //     } else {
    //       product = response._source;
    //       console.log(response);
    //       if (!product) {
    //         return sendResponse(404, 'No documents found', {}, null, '');
    //       }
    //       return sendResponse(200, 'Somethng was found', product, null, '');
    //     }
    //   },
    // );
  } catch (error) {
    throw new Error(error.message);
  }
}
