#! /bin/bash
echo "REFRESH DATABASE TAGS"

git config --global user.email "pedro.oliveira.unb@gmail.com"
git config --global user.name "Pedro Oliveira"

# git config --global --unset https.proxy

COMMIT_MESSAGE=$(git show -s --format=%s)
COMMIT_MOJI=$(echo $COMMIT_MESSAGE | cut -d ' ' -f '1')

LAST_TAG=$(git tag | sort -V | tail -1)
LAST_TAG_RELEASE=$(git tag | grep release | sort -V | tail -1)

echo $LAST_TAG

if [[ -z "${LAST_TAG}" ]]; then
  LAST_TAG=1.0.0
else
  LAST_TAG=$(git tag | sort -V | tail -1)
fi

if [[ -z "${LAST_TAG}" ]]
then
  LAST_TAG_RELEASE=1.0.0-release
fi

echo "GENERATING TAG VERSION"
echo "OLD VERSION $LAST_TAG"
echo "OLD RELEASE $LAST_TAG_RELEASE"

IFS='.'
read -ra arr <<<"$LAST_TAG"
MAJOR_VERSION="${arr[0]}"
MINOR_VERSION="${arr[1]}"
PATCH_VERSION="${arr[2]}"


while :; do
  case $COMMIT_MOJI in
  :recycle:)
    MINOR_VERSION=$(expr $MINOR_VERSION + 1)
    PATCH_VERSION=0
    break
    ;;
  :bug:)
    PATCH_VERSION=$(expr $PATCH_VERSION + 1)
    break
    ;;
  :rocket:)
    break
    ;;
  :boom:)
    MAJOR_VERSION=$(expr $MAJOR_VERSION + 1)
    MINOR_VERSION=0
    PATCH_VERSION=0
    break
    ;;
  :beers:)
    break
    ;;
  :white_check_mark:)
    break
    ;;
  *)
    MINOR_VERSION=$(expr $MINOR_VERSION + 1)
    PATCH_VERSION=0
    break
    ;;
  esac
done

echo "NEW VERSION $MAJOR_VERSION.$MINOR_VERSION.$PATCH_VERSION"

git tag "$MAJOR_VERSION.$MINOR_VERSION.$PATCH_VERSION"

git push origin "$MAJOR_VERSION.$MINOR_VERSION.$PATCH_VERSION"
