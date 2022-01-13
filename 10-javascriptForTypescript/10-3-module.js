{
  //module
  /* 
     JavaScript에서 module이란 file안에 코드를 module화 해서 작성하는 것을 말 한다.
     한 모듈이라는 것은 한 파일 안에 작성되어져 있는 코드를 말 하는 것이다.

     여러 가지의 파일들이 있다면 그 안의 모든 코드들은 Window/global scope로 책정된다.
     즉 파일안에 작성된 모든 코드들은 브라우저 환경이라면 Window에 node환경이라면 global에
     등록된다. 각각의 파일들이 Window/ global scope로 책정되어질 때 문제는 각 파일에
     function add(){}를 등록했다면 먼저 이름 충돌이 생긴다. 아무리 조심해서 작성하더라도 
     가져다 쓰는 library에서 동일한 이름을 작성할 수도 있다. 때문에 규모가 조금이라도 큰
     프로젝트라면 module화를 이용해서 코딩하는 것이 안전하다.

     module화는 코드를 그 파일 내에서만 한정할 수 있도록 만드는 것.
     module화 하게되면 다른 파일에서는 보거나 접근할 수 없다.
     다른 module에서 function add(){} 접근하고자 한다면
     제공하는 module에서 export를 해주고, 사용하고자 하는 곳에서 import를 해와야 한다.
  */
}
