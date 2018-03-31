#if [ $# = 0 ] ; then
#	ps aux | grep "testrpc" | grep -F "testrpc" | grep -v "grep"
#fi

if [ $# = 0 ] ; then
	OUT="$(ps aux | grep testrpc | grep -v "grep" | awk '{print $2}')"
	PID=$(echo $OUT | tr " " "\n")
	for i in "${PID[@]}" ; do
		echo $i
		kill $i
	done
fi

#ln -s /usr/bin/nodejs /usr/bin/node

xterm -e testrpc &
truffle test
