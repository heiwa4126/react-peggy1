// https://tars0x9752.com/posts/try-peg-js
// `Name: foo;` という構文を受けとったら `Hello, foo` に変換するというもの

Input
  = NameKeyword name:$Name EndKeyword { return "Hello, " + name }

NameKeyword = 'Name: '

Name = [^;\n ]+

EndKeyword = ';' / EOL

EOL = '\n'
