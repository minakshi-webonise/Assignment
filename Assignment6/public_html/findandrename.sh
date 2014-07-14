
d=$(cd /home/minakshi/Assignment | ls -R |grep .txt$  );

for i in $d;

do mv $i webonise$i;

done
echo $d

