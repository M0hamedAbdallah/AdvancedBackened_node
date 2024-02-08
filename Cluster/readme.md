# Cluster  in node js how work

to test in Defualt way the load in server run index.ts and use this 

npx loadtest -n 1200 -c 400 -k http://localhost:3000/heavy

-n Number of requests to perform that equal 1200

-c Number of concurrent requests, default 10 but use 400

-k Use a keep-alive http agent

## solve it 

by run primary file that apply the idea of cluster

use 

npx ts-node primary.ts