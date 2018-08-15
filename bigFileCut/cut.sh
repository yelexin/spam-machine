#!/bin/bash
split -l 100000 ./bigFiles/large.txt 163
sed -i 's/\r//g' ./163* # \r\n -->  \n
sed -i 's/\\/\\\\/g' ./163* # \ -->  \\
sed -i 's/"/\\"/g' ./163* # "  -->  \"
sed -i "s/'/\\\'/g" ./163* # '  -->  \'
sed -i 's/^/{email:"/g' ./163*
sed -i 's/$/"},/g' ./163*
sed -i 's/----/",password:"/g' ./163*
sed -i '1i\module.exports=[' ./163*
sed -i '$a\]' ./163*
