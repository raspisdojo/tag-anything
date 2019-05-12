# DEFAULT VALUES:
source ./assets/defaults.config

while getopts e:c:u:r:f:l:b:f: option
do
    case "${option}"
    in
    e)  CLIENT_ID=${OPTARG};;
    c)  CHECK_ONLY=${OPTARG};;
    u)  USERNAME=${OPTARG};;
    r)  INSTANCE_URL=${OPTARG};;
    f)  CUSTOM_DEPLOY=${OPTARG};;
    l)  TEST_LEVEL=${OPTARG};;
    b)  BRANCHNAME=${OPTARG};;
    f)  SERVER_KEY_PATH=${OPTARG};;
    esac
done

if [ "$CUSTOM_DEPLOY" = 1 ]; then
    echo "Reading custom config file: .build-config/$BRANCHNAME.config ..."
    source .build-config/$BRANCHNAME.config
fi

echo "Connecting to Environment"
sfdx force:auth:jwt:grant -i $CLIENT_ID -f $SERVER_KEY_PATH -u $USERNAME -d -s -r $INSTANCE_URL -a DevHub
rc=$?; if [[ $rc != 0 ]]; then exit $rc; fi
sfdx force:source:convert -d temp_metadata/
cp destructiveChanges/destructiveChangesPre.xml temp_metadata/
cp destructiveChanges/destructiveChangesPost.xml temp_metadata/

if [[ $CHECK_ONLY != 0 ]]; then CHECK_ONLY="-c"; else CHECK_ONLY=""; fi

if [ "$TEST_LEVEL" = "RunSpecifiedTests" ]; then
    echo "Getting repository test classes"
    TEST_CLASSES=$(cd force-app/main/default/classes/ && ls -p *Test*.cls | grep -v / | tr '\n' ',')
    TEST_CLASSES="${TEST_CLASSES//.cls/}"
    RUN_TESTS="-r $TEST_CLASSES"
fi

echo "

    =========================
    == STARTING DEPLOYMENT ==
    =========================

"
sfdx force:mdapi:deploy -d temp_metadata/ -u DevHub -g -w 100 -l $TEST_LEVEL $CHECK_ONLY $RUN_TESTS
rc=$?; if [[ $rc != 0 ]]; then exit $rc; fi