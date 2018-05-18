#/bin/bash
node index.js | feedgnuplot --with 'lines lw 4' --title "ISS world position in real time" --stream --domain --xmax 180 --ymax 85 --xmin -180 --ymin -85 --equation '"test.png" binary filetype=png dx=.4 dy=.34 origin=(-180,-85) with rgbimage'
