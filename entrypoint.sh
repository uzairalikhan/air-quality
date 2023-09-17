#!/bin/sh

# Run Migrations in local env
echo "$NODE_ENV"
[ "$NODE_ENV" = 'local' ]\
    && npm run migration:run\
    # && npm run migration:seed-dev
exec "$@"
