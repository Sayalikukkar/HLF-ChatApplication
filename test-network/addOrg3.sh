# launch network; create channel and join peer to channel, add org 3 and add org 4
#cd fabric-samples/test-network
./network.sh down
./network.sh up createChannel
cd addOrg3
./addOrg3.sh up
cd ..
cd addOrg4
./addOrg4.sh up