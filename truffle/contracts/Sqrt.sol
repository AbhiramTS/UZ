pragma solidity ^0.5.0;

contract Sqrt {
    function sqrt(int64  num)  public pure returns(int64){
        if( num == 1){
            return 1;
        }
          int64 root = (num)/2;
          int64 store = num;
        while(root < store) {
            // i = i +1;
            store = root;
            int64  a = (num-(root*root))/(2*root);
            int64  b = root + a;
            root = b-(a*a/(2*b));
        }
        return root;
    }
}