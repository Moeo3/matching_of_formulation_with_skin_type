#!/bin/bash
cd data
echo "Geting information on cosmetic formulation tables ..."
node info.js
echo "Geting information on comments ..."
node comment.js
cd ../algorithm
echo "Collecting the data of formulation tables and comments ..."
python3 collect.py
echo "Selecting some training or test units from data ..."
python3 select.py
echo "Training ... the score of the test will be shown ..."
python3 train.py