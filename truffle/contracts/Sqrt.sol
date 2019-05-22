pragma solidity ^0.5.0;

contract Sqrt {
    int256 public rt = 5;
    function sqrt(int256  num)  public pure returns(int256  root){
          int256 tRoot = (num)/2;
          int256 tNum = num;
        while(tRoot < tNum) {
            // i = i +1;
            tNum = tRoot;
            int256  a = (num-(tRoot*tRoot))/(2*tRoot);
            int256  b = tRoot + a;
            tRoot = b-(a*a/(2*b));
        }
        return tRoot;
    }
}