// https://tars0x9752.com/posts/try-peg-js
//
// ```
// Name: foo Age: 0;
// Name: hoge Age: 10;
// Name: たろう Age: 98;
// ```
// が
// ```
// [
//    {
//       "type": "person",
//       "name": "foo",
//       "age": "0"
//    },
//    {
//       "type": "person",
//       "name": "hoge",
//       "age": "10"
//    },
//    {
//       "type": "person",
//       "name": "たろう",
//       "age": "98"
//    }
// ]
// ```
// になる。

Input
  = Expr+

Expr
  = NameKeyword name:$Name _ AgeKeyword age:$Age EndKeyword+ {
      return { type: 'person', name, age }
    }

_ = WhiteSpace+
WhiteSpace = ' '

NameKeyword = 'Name: '
AgeKeyword = 'Age: '

Name = &AgeKeyword / [^;\n ]+

Age
  = '0'
  / NonZeroNum Num

Num
  = [0-9]

NonZeroNum
  = [1-9]

EndKeyword = ';' / EOL

EOL = '\n'
