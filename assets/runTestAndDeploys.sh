while getopts e:o:u: option
do
    case "${option}"
    in
    e)  ENVIRONMENT=${OPTARG};;
    o)  OPERATION=${OPTARG};;
    u)  USER=${OPTARG};;
    esac
done
echo "Connecting to Environment"
sfdx force:auth:jwt:grant --clientid $ENVIRONMENT --jwtkeyfile assets/server.key --username $USER --setdefaultdevhubusername -a DevHub
mkdir temp_metadata
sfdx force:source:convert -d temp_metadata/ -n Travis_CI_Package
TEST_CLASSES=$(cd force-app/main/default/classes/ && ls -m *Test*.cls | tr -d ' ' | tr -d '.cls');
if [ "$OPERATION" = "TestOnly" ]; then
    echo "Running Validation against" $ENVIRONMENT
    sfdx force:mdapi:deploy -c -l RunSpecifiedTests -r $TEST_CLASSES -d temp_metadata/ -u DevHub -w 10
    rc=$?; if [[ $rc != 0 ]]; then exit $rc; fi
fi
if [ "$OPERATION" = "Deploy" ]; then
    echo "Running Validation against" $ENVIRONMENT
    sfdx force:mdapi:deploy -c -l RunSpecifiedTests -r $TEST_CLASSES -d temp_metadata/ -u DevHub -w 10
    rc=$?; if [[ $rc != 0 ]]; then exit $rc; fi
    echo "Running Deployment against" $ENVIRONMENT
    sfdx force:mdapi:deploy -l RunSpecifiedTests -r $TEST_CLASSES -d temp_metadata/ -u DevHub -w 10
    rc=$?; if [[ $rc != 0 ]]; then exit $rc; fi
fi