const { getPosSpaces, getAllMvs, getAllJumps, doMove, initMatch } = require('../js/ruleEngine');

const match1 = {
      blkUID: "AAA",
      boardState: ["e", "e", "e", "e",
                   "r", "r", "r", "r",
                   "e", "e", "e", "e",
                   "e", "e", "e", "e",
                   "r", "R", "r", "r",
                   "e", "e", "e", "e",
                   "e", "r", "e", "e",
                   "e", "b", "b", "b",
                 ],
      redUID: "AAA",
      status: "active",
      turn: {color: "r", chain: false, chainSpace: null},
    };

test('checking getAllMvs for red', () => {
  const result = [  [8, 4],[9, 4],[9, 5],[10, 5],[10, 6],
                    [11, 6],[11, 7],[20, 16],[20, 17],[21, 17],
                    [12, 17],[13, 17],[21, 18],[22, 18],[22, 19],
                    [23, 19],[28, 25]
                 ];
  expect(getAllMvs(match1)).toEqual(result);
});

const match2 = {
      blkUID: "AAA",
      boardState: ["e", "e", "e", "e",
                   "r", "r", "e", "r",
                   "e", "b", "e", "b",
                   "e", "e", "e", "e",
                   "b", "B", "b", "b",
                   "e", "e", "e", "e",
                   "e", "e", "e", "e",
                   "b", "b", "b", "b",
                 ],
      redUID: "AAA",
      status: "active",
      turn: {color: "b", chain: false, chainSpace: null},
    };

test('checking getAllMvs for black', () => {
  const result = [  [6, 11],[12, 16],[20, 17],[21, 17],[12, 17],
                    [13, 17],[13, 18],[14, 18],[14, 19],[15, 19],
                    [24, 28],[25, 28],[25, 29],[26, 29],[26, 30],
                    [27, 30],[27, 31]
                 ];
  expect(getAllMvs(match2)).toEqual(result);
});

const match3 = {
      blkUID: "AAA",
      boardState: ["e", "e", "e", "e",
                   "r", "r", "r", "r",
                   "b", "r", "b", "b",
                   "e", "e", "e", "e",
                   "r", "r", "r", "r",
                   "b", "r", "b", "b",
                   "e", "e", "e", "e",
                   "e", "e", "e", "e",
                 ],
      redUID: "AAA",
      status: "active",
      turn: {color: "r", chain: false, chainSpace: null},
    };

test('all jumps', () => {
  const result = [  [14, 10, 5],[13, 10, 6],[15, 11, 6],[14, 11, 7],
                    [25, 20, 16],[24, 20, 17],[27, 22, 18],[26, 22, 19]
                 ];
  expect(getAllJumps(match3)).toEqual(result);
});
