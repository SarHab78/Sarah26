/* ============================================================
   THE REAL TEAMS — Sarah's pre-set groups.

   Teams are already decided, so words are NOT assigned randomly:
   each team is pinned to one category, and its members get that
   category's words in order.

   A team may be SMALLER than its category (we keep the full 36-word
   board even at 33 people, so three words go unclaimed - the host
   page lists exactly which). A team may never be larger.

   To change the teams: edit the people arrays and update
   headcount to match the new total.
   ============================================================ */

window.ROSTER = {
  headcount: 36,

  teams: [
    { label: "Team 1", categoryId: "costco",
      people: ["Anjia", "Noorain", "Jack", "Riley", "Ryan", "Zack"] },

    { label: "Team 3", categoryId: "beach",
      people: ["Inaara", "Sean", "Grace", "Tanner", "Sarina", "Ethan Gahm"] },

    { label: "Team 4", categoryId: "bands",
      people: ["Zorin", "Nurin", "Hannah", "Daniel", "Priyanka", "Sadie"] },

    { label: "Team 2", categoryId: "money",
      people: ["Freya", "Ammar", "Cory", "Nhi", "Brandon"] },

    { label: "Team 5", categoryId: "chips",
      people: ["Ashley", "Joel", "Maya", "Shaz", "Ayaz"] },

    { label: "Team 6", categoryId: "board",
      people: ["Emily", "Kevin", "Rachel", "Joe", "Kate"] },
  ],
};
