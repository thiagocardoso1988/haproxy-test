

## HAProxy

Open a terminal, access this folder and then run the following commands:

```sh
# run all containers
docker-compose up

# if any changes on the images has been made, build it
docker-compose up --build --force-recreate

# restart haproxy after any changes in config file
docker-compose restart haproxy

# enters haproxy container
docker exec -it haproxy_test_haproxy_1 /bin/bash
```

### Access pages

With the HAProxy container running, open the desired page, as specified below.

- Default frontend: http://localhost:9000
- Stats page: http://localhost:8404/stats
- Data Plane API
    - Docs: http://localhost:5555/v2/docs
    - Specs (OpenAPI doc): http://localhost:5555/v2/specification