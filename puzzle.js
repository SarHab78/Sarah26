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
      /* Deliberately NOT groceries, so every food word on the board falls
         through to money slang or bands instead. GOLD pulls toward money. */
      id: "costco",
      name: "ONLY AT COSTCO",
      color: "#FFC928",
      words: ["GOLD", "ROTISSERIE", "CHURRO", "PALLET", "SAMPLES", "CASKET", "KIRKLAND"],
    },
    {
      /* All six are things Costco sells - the pull runs both directions */
      id: "beach",
      name: "IN THE BEACH BAG",
      color: "#35A7FF",
      words: ["TOWEL", "SUNSCREEN", "COOLER", "SANDALS", "UMBRELLA", "FRISBEE", "CHAIR"],
    },
    {
      /* Every one is food-sounding. BREAD is the cruel one: real band AND
         classic money slang - only the 6-slot constraint resolves it. */
      id: "bands",
      name: "ACTUALLY BANDS",
      color: "#A05CFF",
      words: ["BREAD", "GARBAGE", "CAKE", "CREAM", "PULP", "KORN", "TOTO"],
    },
    {
      /* Reads as a Costco grocery run; CLAMS reads as beach */
      id: "money",
      name: "SLANG FOR MONEY",
      color: "#2ED9A8",
      words: ["CLAMS", "CHEDDAR", "DOUGH", "BACON", "CABBAGE", "LETTUCE", "SCRATCH"],
    },
    {
      /* BLUE and POKER pull toward money, TORTILLA and CHOCOLATE toward Costco */
      id: "chips",
      name: "KINDS OF CHIPS",
      color: "#FF8A3D",
      words: ["BLUE", "POKER", "TORTILLA", "CHOCOLATE", "WOOD", "MICRO", "PAINT"],
    },
    {
      /* Steals the two most obvious beach words; BILL and CARD pull money */
      id: "board",
      name: "___ BOARD",
      color: "#FF4D8D",
      words: ["SURF", "BOOGIE", "BILL", "CARD", "SKATE", "CHALK", "DASH"],
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
