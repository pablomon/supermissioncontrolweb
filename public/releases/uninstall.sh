#!/bin/bash
# Removes SuperMissionControl from this Mac.
#
#   ./uninstall.sh          say what would go, change nothing
#   ./uninstall.sh --yes    actually remove it
#
# The app, its settings, its caches, its logs and its Accessibility approval.
# Dragging the app to the Trash leaves most of that behind; this does not.
#
# **One thing is left on purpose: the record of when the trial started.** It is
# kept outside the app precisely so that reinstalling cannot hand out another
# fortnight, and wiping it here would turn a clean uninstall into a way of starting
# the trial over. If it needs clearing —a trial spent on a build that was broken, a
# Mac being sold— write to support@supermissioncontrol.com.
#
# The counterpart that does wipe it is `reset.sh`, which is deliberately not
# published: see the note at the top of that file.
#
# Everything below is scoped to this app's own identifier. It touches nothing else.
set -euo pipefail

BUNDLE=me.pablomon.SuperMissionControl
NAME=SuperMissionControl
DRY=1
[ "${1:-}" = "--yes" ] && DRY=0

# Set by `reset.sh`, which calls this script and then removes the trial record.
# It suppresses the opening banner and the closing verdict so that the chained run
# reads as one operation with one conclusion, instead of announcing twice that it
# is finished and contradicting itself about what is left.
CHAINED=${SMC_CHAINED:-0}

say() { printf '  %-52s %s\n' "$1" "$2"; }
gone() { [ "$DRY" = 1 ] && echo "would remove" || echo "removed"; }
kept() { echo "not present"; }

echo
if [ "$CHAINED" = 0 ] && [ "$DRY" = 1 ]; then
	echo "Dry run. Nothing will be changed — pass --yes to do it."
	echo
fi

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
echo "Settings and leftovers"
# `~/Library/Application Support/SuperMissionControl` is **not** in this list, and
# that is the whole difference between this script and `reset.sh`: the only thing
# in that folder is `license.json`, which holds the trial start and the licence.
for path in \
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
if [ "$DRY" = 0 ]; then
	tccutil reset Accessibility "$BUNDLE" > /dev/null 2>&1 || true
fi
say "Accessibility approval" "$([ "$DRY" = 1 ] && echo "would reset" || echo "reset")"
# macOS keeps the row itself, unticked and harmless, and the app will reuse it.
# Said here rather than at the end because it is a limit of this step, not a
# conclusion about the whole run.
echo "  macOS leaves the row in Settings › Privacy & Security › Accessibility."
echo "  It is unticked and harmless; remove it by hand with − if you want the"
echo "  list to look untouched too."

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

if [ "$CHAINED" = 0 ]; then
	echo
	if [ "$DRY" = 1 ]; then
		echo "Nothing was changed. Run again with --yes to go ahead."
	else
		echo "Removed. One thing stays on purpose: the record of when the trial"
		echo "started, kept so that reinstalling does not hand out another"
		echo "fortnight. If it needs clearing, write to"
		echo "support@supermissioncontrol.com."
	fi
	echo
fi
