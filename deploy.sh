set -e

bun run build

cd docs/.vitepress/dist
#echo fxxkit.com > CNAME

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:woyouwomaibu/woyouwomaibu.github.io.git master

cd -