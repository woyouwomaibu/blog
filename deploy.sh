set -e

yarn build

cd docs/.vuepress/dist
echo 'zhw1995.com' > CNAME

git init
git add -A
git commit -m 'deploy'

git push -f github:woyouwomaibu/woyouwomaibu.github.io.git master

cd -