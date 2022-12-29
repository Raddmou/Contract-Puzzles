const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game4', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game4');
    const game = await Game.deploy();
    const [signer01, signer02, signer03] = await ethers.getSigners();

    return { game, signer01, signer02, signer03 };
  }
  it('should be a winner', async function () {
    const { game, signer01, signer02 } = await loadFixture(deployContractAndSetVariables);

    // nested mappings are rough :}
    await game.write(signer02.address);

    await game.connect(signer02).win(signer01.address);

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
