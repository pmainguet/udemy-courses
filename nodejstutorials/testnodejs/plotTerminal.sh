#!/bin/bash
clear
node index.js | feedgnuplot --lines --title "CPU Sensor Plot" --xlabel seconds --xlen 100 --terminal "qt" --stream
