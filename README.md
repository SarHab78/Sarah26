# Find Your People

A Connections-style way to split ~30–42 people into 6 teams.

Everyone gets **one word** by text. The board shows every word in play.
Find the words that belong with yours — the people holding them are your team.

## Running the game

1. Open **`/host-5bj8pr.html`** (just you). Paste your guest list, one name per line.
2. Hit **Assign words**. You get:
   - the board link to share,
   - a ready-to-send text for each person (tap *Copy text*),
   - the answer key with every team's roster.
3. Text each person their message.
4. Guests open the board link, tap their own word, then hunt for their group.

## Changing the words

Everything lives in **`puzzle.js`**. Six categories, seven words each:
the first six are always used, the seventh only kicks in above 36 guests.

Keep every word in exactly one category — overlaps make teams unsolvable.

## Headcount

Handles **30 to 42** people; the board link carries `?n=` and trims the word
list so no tile belongs to a person who isn't there. Team sizes stay even
(38 guests → two teams of 7, four of 6).

To go past 42, add an 8th word to each category in `puzzle.js`.
