const { getPosSpaces, getAllMvs, getAllJumps, doMove, initMatch } = require('../js/ruleEngine');

test('initBoard test', () => {
  const match = {
        blkUID: "AAA",
        boardState: ["r", "r", "r", "r", "r", "r", "r", "r", "r", "r", "r", "r", "e", "e", "e", "e", "e", "e", "e", "e", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b"],
        redUID: "AAA",
        status: "active",
        turn: {color: "r", chain: false, chainSpace: null},
      };
  expect(initMatch('r', 'AAA', 'AAA')).toEqual(match);
});
