# Sourced, hidden, at the start of each tape: a plain prompt, and an empty
# directory under /tmp to create the project in, outside any repository.
# git-annex write-protects its objects, so a previous run is made writable
# before it is removed. If the directory can't be entered, the shell exits
# and the recording fails, rather than running the demo here.
DEMO=$(pwd)
PS1='\[\e[36m\]\W\[\e[0m\] $ '
export UV_LINK_MODE=copy
[ -d /tmp/lightcone-demo ] && chmod -R u+w /tmp/lightcone-demo
rm -rf /tmp/lightcone-demo && mkdir /tmp/lightcone-demo && cd /tmp/lightcone-demo || exit 1
command -v lc >/dev/null || exit 1
