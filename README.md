# Chat application in Hyperledger fabric


Step.1
fabric-samples/chaincode/5G-chat: ./startNetwork.sh javascript

This script will be first down the network, up the network, create channels on org1 and org2, deploy chaincode on channel.

Step.2 ../../test-network
export PATH=${PWD}/../bin:${PWD}:$PATH export FABRIC_CFG_PATH=$PWD/../config/ export CORE_PEER_TLS_ENABLED=true export CORE_PEER_LOCALMSPID="Org1MSP" export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp export CORE_PEER_ADDRESS=localhost:7051 export TARGET_TLS_OPTIONS=(-o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt")

Step. 3 Peer command to register admin and users [Function name : register]
peer chaincode invoke "${TARGET_TLS_OPTIONS[@]}" -C mychannel -n latest -c '{"function":"register","Args":["x1","12345","jack Dev"]}'

peer chaincode invoke "${TARGET_TLS_OPTIONS[@]}" -C mychannel -n latest -c '{"function":"register","Args":["s2","12345","jack Dev"]}'

peer chaincode invoke "${TARGET_TLS_OPTIONS[@]}" -C mychannel -n latest -c '{"function":"register","Args":["s3","12345","jack Dev"]} And so on……..

Step.4 Send Message[function name : sendMessage2]
peer chaincode invoke "${TARGET_TLS_OPTIONS[@]}" -C mychannel -n latest -c '{"function":"sendMessage","Args":["s1","12345","["s2", "s3","s4","s5"]","How Are You?"]}'

peer chaincode invoke "${TARGET_TLS_OPTIONS[@]}" -C mychannel -n latest -c '{"function":"sendMessage","Args":["s1","12345","["s2", "s3","s4","s5"]","hey"]}'

peer chaincode invoke "${TARGET_TLS_OPTIONS[@]}" -C mychannel -n latest -c '{"function":"sendMessage","Args":["x1","12345","["x2", "x3","x4","x5"]","Hello, How are you?"]}'

Chaincode invoke successful. result: status:200 payload:"Message has been sent."

Step.5 Invoke users details[function name : invokeUsers2]
peer chaincode invoke "${TARGET_TLS_OPTIONS[@]}" -C mychannel -n latest -c '{"function":"invokeUser","Args":["s3"]}'

Before fetching message: Chaincode invoke successful. result: status:200 payload:"{"AccessKey":"12345","Name":"Saumya Dev","ReceivedMessages":[{"Message":"How Are You?","Time":"2021-10-08T08:04:04.000Z","From":"s1","To":"s3","isRead":false}],"SentMessages":[],"UserId":"s3"}"

After fetching message: Chaincode invoke successful. result: status:200 payload:"{"AccessKey":"12345","Name":"Saumya Dev","ReceivedMessages":[{"Message":"How Are You?","Time":"2021-10-08T08:04:04.000Z","From":"s1","To":"s2","isRead":true}],"SentMessages":[],"UserId":"s2"}"

Step.6 Fetch message to check message isread= true or false[function name : fetchMessage]
The findIndex() method returns the index of the first element in the array that satisfies the provided testing function, Otherwise -1 , including that no element passed the test.

Does not execute a function for an empty array elements

Does not change the original array.

peer chaincode invoke "${TARGET_TLS_OPTIONS[@]}" -C mychannel -n latest -c '{"function":"fetchMessage","Args":["s4"]}'

Chaincode invoke successful. result: status:200 payload:"{"AccessKey":"12345","Name":"Saumya Dev","ReceivedMessages":[{"Message":"How Are You?","Time":"2021-10-08T10:19:41.000Z","From":"s1","To":"s4","isRead":true}],"SentMessages":[],"UserId":"s4"}"
