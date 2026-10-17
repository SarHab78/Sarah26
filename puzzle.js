/* ============================================================
   THE PUZZLE CONTENT — this is the only file you need to edit
   to change the game.

   6 categories. Each category = one team.
   List 7 words per category: the first 6 are the core words,
   the 7th is a spare used only if your headcount is above 36.
   ============================================================ */

window.PUZZLE = {
  title: "Find Your People",

  categories: [
    {
      /* keyboard · keystone · keynote — KEY wants to be here */
      id: "board",
      name: "___ BOARD",
      color: "#F0B429",
      words: ["SKATE", "DASH", "SURF", "BILL", "CHALK", "CARD", "SPRING"],
    },
    {
      /* limelight vs limestone · moonlight vs moonstone */
      id: "light",
      name: "___ LIGHT",
      color: "#7FB069",
      words: ["MOON", "SPOT", "DAY", "SEARCH", "LIME", "HIGH", "SUN"],
    },
    {
      /* cornerstone vs cornerback · keystone vs keyboard */
      id: "stone",
      name: "___ STONE",
      color: "#5B8FD9",
      words: ["BRIM", "CORNER", "MILE", "GRAVE", "SAND", "KEY", "FLINT"],
    },
    {
      /* the gentle way in — every puzzle needs one */
      id: "work",
      name: "___ WORK",
      color: "#A86FD1",
      words: ["NET", "HOME", "TEAM", "FRAME", "PATCH", "CLOCK", "GROUND"],
    },
    {
      /* paperback vs paperwork vs paperboard — PAPER pulls three ways */
      id: "back",
      name: "___ BACK",
      color: "#3FA7A0",
      words: ["FLASH", "GREEN", "PAPER", "DRAW", "SET", "FEED", "QUARTER"],
    },
    {
      /* firefly vs firework · horsefly vs horseback · housefly vs housework */
      id: "fly",
      name: "___ FLY",
      color: "#E8795A",
      words: ["BUTTER", "FIRE", "DRAGON", "HORSE", "MAY", "HOUSE", "BAR"],
    },
  ],
};

/* ============================================================
   Shared logic. Host page and board page both call this so they
   always agree on exactly which words are in play.
   ============================================================ */

PUZZLE.MIN_PLAYERS = PUZZLE.categories.length * 5;                    // 30
PUZZLE.MAX_PLAYERS = PUZZLE.categories.length * PUZZLE.categories[0].words.length; // 42

/* Given a headcount, deterministically pick the active words so that
   team sizes stay as even as possible. 36 -> six teams of 6.
   38 -> two teams of 7, four teams of 6. */
PUZZLE.activeGroups = function (headcount) {
  var cats = PUZZLE.categories;
  var n = Math.max(PUZZLE.MIN_PLAYERS, Math.min(PUZZLE.MAX_PLAYERS, headcount | 0));
  var base = Math.floor(n / cats.length);
  var extra = n % cats.length;
  return cats.map(function (c, i) {
    var size = base + (i < extra ? 1 : 0);
    return {
      id: c.id,
      name: c.name,
      color: c.color,
      words: c.words.slice(0, size),
    };
  });
};

PUZZLE.allActiveWords = function (headcount) {
  return PUZZLE.activeGroups(headcount).reduce(function (acc, g) {
    return acc.concat(g.words);
  }, []);
};

PUZZLE.groupOf = function (word, headcount) {
  return PUZZLE.activeGroups(headcount).find(function (g) {
    return g.words.indexOf(word) !== -1;
  });
};

/* Stable shuffle driven by a seed, so the board looks the same for
   everyone at the party and the tile order never jumps around. */
PUZZLE.seededShuffle = function (arr, seed) {
  var a = arr.slice();
  var s = seed || 1;
  function rnd() {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  }
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(rnd() * (i + 1));
    var t = a[i];
    a[i] = a[j];
    a[j] = t;
  }
  return a;
};
