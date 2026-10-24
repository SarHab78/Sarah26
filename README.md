# Find Your People

A Connections-style way to split ~30–42 people into 6 teams.

Everyone gets **one word** by text. The board shows every word in play.
Find the words that belong with yours — the people holding them are your team.

## Running the game

Share **one link** with everyone. Each guest types their first name
(case-insensitive, first name only) and the board hands them their word.

`/host-5bj8pr.html` is the host page: it holds the answer key, the full
name-to-word list, and a ready-to-send text per person as a backup for
anyone who can't find themselves.

Teams live in `roster.js`. Each team is pinned to a category and its
members get that category's words in order - nothing is random.

## Changing the words

Everything lives in **`puzzle.js`**. Six categories, seven words each:
the first six are always used, the seventh only kicks in above 36 guests.

Keep every word in exactly one category — overlaps make teams unsolvable.

## Headcount

Handles **30 to 42** people; the board link carries `?n=` and trims the word
list so no tile belongs to a person who isn't there. Team sizes stay even
(38 guests → two teams of 7, four of 6).

To go past 42, add an 8th word to each category in `puzzle.js`.
