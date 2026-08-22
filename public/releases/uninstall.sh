#!/bin/bash
# Removes every trace of SuperMissionControl, so the next launch is a first launch.
#
#   ./uninstall.sh          say what would go, change nothing
#   ./uninstall.sh --yes    actually remove it
#
# For testing the parts of this app that only happen once and are otherwise
# impossible to see again: the permission panel, the welcome, the start of a
# trial. Several of those leave marks on purpose — the trial date survives
# deleting the app precisely so that reinstalling does not hand out another
# fortnight — so "drag it to the Trash and try again" does not work.
#
# Everything below is scoped to this app's own identifier. It touches nothing else.
set -euo pipefail

BUNDLE=me.pablomon.SuperMissionControl
NAME=SuperMissionControl
DRY=1
[ "${1:-}" = "--yes" ] && DRY=0

say() { printf '  %-52s %s\n' "$1" "$2"; }
gone() { [ "$DRY" = 1 ] && echo "would remove" || echo "removed"; }
kept() { echo "not present"; }

echo
[ "$DRY" = 1 ] && echo "Dry run. Nothing will be changed — pass --yes to do it." && echo

echo "Running copies"
if pgrep -x "$NAME" > /dev/null 2>&1; then
	[ "$DRY" = 0 ] && { killall "$NAME" 2>/dev/null || true; sleep 1; }
	say "the running app" "$(gone)"
else
	say "the running app" "$(kept)"
fi

echo
echo "The app itself"
for dir in /Applications "$HOME/Applications"; do
	app="$dir/$NAME.app"
	if [ -d "$app" ]; then
		[ "$DRY" = 0 ] && rm -rf "$app"
		say "$app" "$(gone)"
	else
		say "$app" "$(kept)"
	fi
done

echo
echo "What survives deleting the app"
# The trial start, in both places it is kept: the file goes with the app, the
# keychain entry does not, and on reading the older of the two wins. Removing one
# and not the other reinstates the same expired trial.
if security find-generic-password -s "$BUNDLE.license" > /dev/null 2>&1; then
	[ "$DRY" = 0 ] && security delete-generic-password -s "$BUNDLE.license" > /dev/null 2>&1
	say "trial and licence, in the keychain" "$(gone)"
else
	say "trial and licence, in the keychain" "$(kept)"
fi

for path in \
	"$HOME/Library/Application Support/$NAME" \
	"$HOME/Library/Preferences/$BUNDLE.plist" \
	"$HOME/Library/Caches/$BUNDLE" \
	"$HOME/Library/Logs/$NAME.log" \
	"$HOME/Library/Saved Application State/$BUNDLE.savedState" \
	"$HOME/Library/HTTPStorages/$BUNDLE" \
	"$HOME/Library/WebKit/$BUNDLE"
do
	if [ -e "$path" ]; then
		[ "$DRY" = 0 ] && rm -rf "$path"
		say "${path/#$HOME/~}" "$(gone)"
	else
		say "${path/#$HOME/~}" "$(kept)"
	fi
done

# Preferences are also held in memory by cfprefsd, which will write them back over
# a deleted file. Telling it to forget is the only way the deletion sticks.
if [ "$DRY" = 0 ]; then
	defaults delete "$BUNDLE" > /dev/null 2>&1 || true
	killall cfprefsd > /dev/null 2>&1 || true
fi

echo
echo "Permissions"
# Without this the app comes back already trusted and the permission panel — the
# thing most worth testing — never appears.
if [ "$DRY" = 0 ]; then
	tccutil reset Accessibility "$BUNDLE" > /dev/null 2>&1 || true
fi
say "Accessibility approval" "$([ "$DRY" = 1 ] && echo "would reset" || echo "reset")"

echo
echo "Odds and ends"
# A disk image left mounted from a previous round: the next one then mounts as
# "SuperMissionControl 1", and it is easy to end up testing the older of the two.
mounted=$(ls -d /Volumes/$NAME* 2>/dev/null || true)
if [ -n "$mounted" ]; then
	echo "$mounted" | while read -r volume; do
		[ "$DRY" = 0 ] && hdiutil detach "$volume" -quiet 2>/dev/null || true
		say "$volume" "$([ "$DRY" = 1 ] && echo "would eject" || echo "ejected")"
	done
else
	say "mounted disk images" "$(kept)"
fi

echo
if [ "$DRY" = 1 ]; then
	echo "Nothing was changed. Run again with --yes to go ahead."
else
	echo "Clean. The next launch will behave like the first one ever."
	echo
	echo "One thing this cannot remove: the row in Settings › Privacy & Security ›"
	echo "Accessibility. macOS leaves it there, unticked and harmless, and the app"
	echo "will reuse it. Delete it by hand with the minus button if you want the"
	echo "list to look untouched too."
fi
echo
