// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Presale is Ownable {
    IERC20 public token;
    uint256 public startTimestamp;
    uint256 public endTimestamp;
    uint256 public claimTimestamp;
    uint256 public tokensSold;
    uint256 public tokenPrice;
    mapping(address => uint256) public presaleBalances;
    mapping(address => bool) public tokensClaimed;

    event TokensPurchased(address indexed buyer, uint256 amount);
    event TokensClaimed(address indexed buyer, uint256 amount);
    event Withdrawn(address indexed receiver, uint256 amount);

    constructor(address _token, uint256 _startTimestamp, uint256 _endTimestamp) {
        token = IERC20(_token);
        tokenPrice = 0.01 ether;
        startTimestamp = _startTimestamp;
        endTimestamp = _endTimestamp;
    }
    
    function purchaseTokens(uint256 _numTokens) external payable {
        require(block.timestamp >= startTimestamp && block.timestamp <= endTimestamp, "Presale is not active");
        require(msg.value > 0, "Ether amount must be greater then zero");
        uint256 totalPrice = _numTokens * tokenPrice;
        require(msg.value >= totalPrice);
        require(token.balanceOf(address(this)) >= _numTokens, "Insufficient tokens available for sale");
        presaleBalances[msg.sender] += _numTokens;
        tokensSold += _numTokens;
        emit TokensPurchased(msg.sender, _numTokens);
    }

    function claimTokens() external {
        require(block.timestamp > endTimestamp, "Presale has not ended yet");
        require(presaleBalances[msg.sender] > 0, "No tokens available for claim");
        require(!tokensClaimed[msg.sender], "Tokens already claimed");
        uint256 tokensToClaim = presaleBalances[msg.sender] * 10**18;

        token.transfer(msg.sender, tokensToClaim);
        tokensClaimed[msg.sender] = true;

        emit TokensClaimed(msg.sender, tokensToClaim);
    }
    // Function to withdraw all the ethers in the contract to the owners wallet
    function withdrawEther() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No Ether available for withdrawal");
        payable(owner()).transfer(balance);
        emit Withdrawn(owner(), balance);
    }
    //Function to withdraw the KIX tokens to the owner wallet
    function withdrawKIX() external  onlyOwner{
        uint256 balance = token.balanceOf(address(this));
        require(balance > 0, "No KIX available for withdrawal");
        token.transfer(owner(),balance);
        emit Withdrawn(owner(), balance);
    }
    //setter functions to change the time values
    function setClaimTimestamp(uint256 _timeStamp) public onlyOwner {
        claimTimestamp = _timeStamp;
    }
    function setStartTime(uint256 _startTimestamp) public onlyOwner{
        startTimestamp = _startTimestamp;
    }
    function setEndTime(uint256 _endTimestamp) public onlyOwner{
        endTimestamp = _endTimestamp;
    }
    function setTokenPrice(uint256 _tokenPrice) public onlyOwner{
        tokenPrice = _tokenPrice;
    }
}
