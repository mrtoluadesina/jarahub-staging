import elasticsearch from 'elasticsearch';

const client = new elasticsearch.Client({
  host: `${process.env.ELASTICSEARCH_URI}` || 'http://localhost:9200',
});

export default client;
