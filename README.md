# Codemirror Shopify GQL

Codemirror 6 with shopify grapqhql Auto complete

## Fetch Schema from Shopify

You can get a token by creating a private app in shopify.
Then use this to fetch schema https://github.com/prisma-labs/get-graphql-schema

```shell

get-graphql-schema --header X-Shopify-Access-Token=shpat_966e<..token> https://<store-name>.myshopify.com/admin/api/2023-07/graphql.json > schema.graphql

get-graphql-schema --json --header X-Shopify-Access-Token=shpat_966e<..token> https://<store-name>.myshopify.com/admin/api/2023-07/graphql.json > schema.json
```
