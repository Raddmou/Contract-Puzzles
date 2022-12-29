const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();
    const signer = ethers.provider.getSigner(0);
    const threshold = "0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf";

    let found = false;
    let wallet;
    
    while(!found) {
      wallet = await ethers.Wallet.createRandom();
      const addressCreated = await wallet.getAddress();
      wallet = await wallet.connect(ethers.provider);

      if (addressCreated < threshold) {
        await signer.sendTransaction({to: wallet.address, value: ethers.utils.parseEther("1")});
        found = true;
      }
    }

    return { game, signer, wallet };
  }
  it('should be a winner', async function () {
    const { game, wallet } = await loadFixture(deployContractAndSetVariables);

    // good luck

    await game.connect(wallet).win();

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
