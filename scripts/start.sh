#!/bin/bash

mongod --bind_ip 0.0.0.0 &
node index.js