#!/bin/bash
curl -X POST -H "Content-Type: application/json"  --data-binary @./request.json 'http://127.0.0.1:3001' -v