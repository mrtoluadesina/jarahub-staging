// this is a helper function that formats pagination queries and impliments on the models
interface Iquery {
  limit?: number;
  skip?: number;
  status?: string;
}

function queryBuilder (this: any,  query: Iquery ) {
  this.setLimit = (result: Iquery) => {
    result.limit = query.limit? +query.limit: 100;
  };

  this.setSkip = (result: Iquery) => {
    result.skip = query.skip? +query.skip: 1;
  };

  this.setStatus = (result: Iquery) => {
    if (query.status) result.status = query.status;
  };

}

const getQuery = (query: Iquery) => {
  const result: Iquery = {}
  //@ts-ignore
  const newBuilder = new queryBuilder(query)
  for (let func in newBuilder) {
    newBuilder[func](result)
  }
  return result;
};

export const getCollection = async (Model: any, queries: any) => {
  const query = getQuery(queries)
  const limit: number = +query.limit!!;
  const skip: number = (+query.skip!! - 1) * limit;

  delete query.limit;
  delete query.skip;

  return ({ data: await Model.find(query, null, { limit, skip }), total: await Model.find().estimatedDocumentCount() })
}