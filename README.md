



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