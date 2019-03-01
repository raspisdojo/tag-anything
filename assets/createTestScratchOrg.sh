DURATIONDAYS=3
SETALIAS="TestScratchOrg"
DEFINITIONFILE="./config/project-scratch-def.json"
NEED_HELP=0
help_message="
    [HELP]    How to use this script:
    Params:
    -h  --help                  :display help about this script
    -p  PULL_REQUEST_NUMBER     :number of the PullRequest to create a Test Environment (mandatory)
    -v  TARGET_DEV_HUB_NAME     :alias or username of the DevHub.
    -d  DURATIONDAYS            :duration in days for the Scratch Org (default: 3)
    -a  SETALIAS                :alias for the new Scratch Org (default: TestScratchOrg)
    -f  DEFINITIONFILE          :scratch org definition file (default: .config/project-scratch-def.json)
"
if [ $# -eq 0 ]; then
    echo "
    
    [ERROR]   No arguments provided
    
    "
    echo "$help_message"
    NEED_HELP=1
    exit 1
fi
if [ "$1" = "--help" ]; then
  echo "$help_message"
  NEED_HELP=1
  exit 1
fi
if [ "$1" = "-h" ]; then
  echo "$help_message"
  NEED_HELP=1
  exit
fi
while getopts v:d:a:f:p: option
do
    case "${option}"
    in
    v)  TARGETDEVHUBNAME=${OPTARG};;
    d)  DURATIONDAYS=${OPTARG};;
    a)  SETALIAS=${OPTARG};;
    f)  DEFINITIONFILE=$OPTARG;;
    p)  PULLREQUEST=$OPTARG;;
    esac
done
if [ "$NEED_HELP" = 0 ]; then
    if ! [[ "$PULLREQUEST" =~ ^[0-9]+$ ]]; then
        echo "
        
        [ERROR] Need to provide a Pull Request Number with -p param. More info in --help
        
        "
    else
        FEATURE_BRANCH=$(git branch | grep \* | cut -d ' ' -f2)
        echo "[INFO] Current Branch:" $FEATURE_BRANCH
        echo "[INFO] Getting Pull Request number #"$PULLREQUEST
        git fetch origin pull/$PULLREQUEST/head:temp_qa_branch
        echo "[INFO] Checkout to temp_qa_branch"
        git checkout temp_qa_branch
        echo "[INFO] Creating the Scratch Org..."
        if [ -z "$TARGETDEVHUBNAME" ]; then 
            sfdx force:org:create -f $DEFINITIONFILE -d $DURATIONDAYS -a $SETALIAS
        else
            sfdx force:org:create -f $DEFINITIONFILE -d $DURATIONDAYS -v $TARGETDEVHUBNAME -a $SETALIAS
        fi
        echo "[INFO] Pushing Source Code to" $SETALIAS"..."
        sfdx force:source:push -u $SETALIAS
        echo "[INFO] Opening Org:" $SETALIAS
        sfdx force:org:open -u $SETALIAS
        git checkout $FEATURE_BRANCH
    fi
fi