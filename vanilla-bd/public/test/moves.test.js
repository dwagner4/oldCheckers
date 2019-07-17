const { getPosSpaces, getAllMvs, getAllJumps, doMove, initMatch } = require('../js/ruleEngine');


let match = {};
beforeEach(() => {
  match = {
        blkUID: "AAA",
        boardState: ["r", "e", "e", "e",
                     "e", "r", "e", "r",
                     "e", "r", "e", "e",
                     "e", "e", "e", "e",
                     "e", "e", "R", "e",
                     "e", "e", "e", "e",
                     "b", "b", "b", "b",
                     "b", "b", "b", "b"
                   ],
        redUID: "AAA",
        status: "active",
        turn: {color: "r", chain: false, chainSpace: null},
      };
});


test('move from 9 to 12', () => {
  const result = {
    "lastMove": {"fm": 9, "to": 12},
    "msg": "Great Move!!",
    "newMatchState": {
      "blkUID": "AAA",
      "boardState": ["r", "e", "e", "e",
                     "e", "r", "e", "r",
                     "e", "e", "e", "e",
                     "r", "e", "e", "e",
                     "e", "e", "R", "e",
                     "e", "e", "e", "e",
                     "b", "b", "b", "b",
                     "b", "b", "b", "b"
                   ],
      "redUID": "AAA",
      "status": "active",
      "turn": {"chain": false, "chainSpace": null, "color": "b"}
    }
  };
  expect(doMove(match, 9, 12)).toEqual(result);
});

test('move from 0 to 4', () => {
  const result = {
    "lastMove": {"fm": 0, "to": 4},
    "msg": "Great Move!!",
    "newMatchState": {
      "blkUID": "AAA",
      "boardState": ["e", "e", "e", "e",
                   "r", "r", "e", "r",
                   "e", "r", "e", "e",
                   "e", "e", "e", "e",
                   "e", "e", "R", "e",
                   "e", "e", "e", "e",
                   "b", "b", "b", "b",
                   "b", "b", "b", "b"
                   ],
      "redUID": "AAA",
      "status": "active",
      "turn": {"chain": false, "chainSpace": null, "color": "b"}
    }
  };
  expect(doMove(match, 0, 4)).toEqual(result);
});
