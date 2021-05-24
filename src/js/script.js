$(document).ready(function(){
  $(".owl-carousel").owlCarousel();
});

import {User} from './user.js';

let Jack = new User('Jack');
console.log(Jack.sayHello());

// RegEx
// pattern = /some/;
// //до черты ничего не может быть, после черты – уточнения, режими.

//str = 'sodmenc23somYesdjcn some data тыостывл somedata nsdjcтовт .nsdjcks!omsome dataensdcjk some23some2323 sdcjnsomesdc';
//console.log(str.search(/some data/g));
// console.log(str.match(/soMe data/gi));
//индекс найденного совпадения
//если нет совпадения, вернет -1

// str = 'dfvтjkn wo567drld 23 34djfnvk 20191 World 20233 94311111 worldsdfnworlss World wor3lds5dc 34dfvWorlds';
// console.log(str);

// result = str.match(/\w{1,5}/gi);
// console.log(result);
//match - работает в двух режимах:
//одиночного поиска и с флагом /g (global)

//флаг /i – игнор регистра

//найти все числа /\d/ – backslash

//4-x значные числа \d\d\d\d – не жадное

// world! и world! с пробелом
// str = 'dfvjkn world 23 34djfnvk world!dvf 2019 20394311111 world! sdfnworlss wor3lds5dc 34dfvWorlds';
// result = str.match(/world!/ig);
// console.log(result);


//split
// str = '5234-12-34:::5-3-33_89::98::23';
// console.log(str);
// //result = str.split(/_/);
// result = str.split(/::|_/);
// console.log(result);

//split or - or :: or _
// палка |
// result = str.split(/-|::|_/);
// console.log(result);

//групировка []
// str = '5234--12_345-3------------33895::98::23';
// console.log(str);
//result = str.split(/[-_:]+/);
//result = str.split(/[-_:]{1,2}/); //ожидаем встретить один из этих символов от одного до двух раз
// result = str.split(/\d{2,4}/);
// console.log(result);


//split example
// \d
// \w
// str = '1{2}{924}3{s}{ъ}d{template}kf{.}!1{}2{и}3{ooo}3|s{23}df|{23}sdc';
// console.log(str);
//result = str.split(/\d{1}/); // split по одной англоязычной букве или одной цифре в скобках
//result = str.split(/{\w+}/); // \w+ – ожидаем сколь угодно длинное слово или цифры в скобках
//result = str.split(/{\w*}/); // * - может быть, а может и не быть (для пустых скобок)
//result = str.split(/{[\wа-яА-Я]*}/);
//result = str.split(/\w/);
// console.log(result);


// *
// 	\w === a-zA-z0-9
// 	\w+ === {1,} // от одного до бесконечности раз
// 	\w* === {0,} // от нуля до бесконечности раз
// *


//split another example
//аналог * от 0 до бесконечности {0,}
//аналог + от 1 до бесконечности {1,}
// str = 'sdf{fgh}ff{}ирои{0}345{123123}:::';
// console.log(str);
// result = str.split(/{\w{0,}}/);
// console.log(result);

// str = '1988  55+ 12 год qwerш 11йhe44llo55 Как 23234234...57 дела? что 23. делать? 368Когда нет ничего в 18!лет.';
// console.log(str);
// result = str.match(/\d{2}/gi); //массив двухзначных чисел
//result = str.match(/\D{2}/gi); //большое D – все, что не числа
//result = str.match(/\b\d{2}\b/gi); // \b – граница слова только для англ
// result = str.match(/\d{1,}\.*\d{0,}/gi); // цифр(от 1 до бесконечности), точка(экранированная, может быть, а может и не быть), число(может быть, а может и не быть)
// console.log(result);


// ? предыдущий символ может быть, а может и не быть
// ? аналог {0,1}
// result = str.match(/\d{1,}\.?\d{0,}/gi);
// console.log(result);

// result = str.match(/\d+(\.*\d*)?/gi); // сколько угодно раз повторяющееся число, () - группировка с точкой и обязательно хотя бы одной цифрой
// console.log(result);

// result = str.match(/[a-zA-Z0-9_]/gi); // аналог \w
// result = str.match(/[a-zA-ZА-яа-я]{5}/gi); //все слова из 5 букв
// console.log(result);

// -----

// str = 'dfv dfvdf hwodsdc howoudsdc';
// console.log(str);
// result = str.replace(/(wod|woud)/gi, 'blablabla'); // замена wod,woud на blablabla
// console.log(result);

// -----

// . ? [ ] { } &  / \ |
// // \. \? \/ \| \\

// str = 'How are \\ \\ //\\\\ | yo hello.foo u \n \t \s \f [123] [123] }';
// console.log(str);
// result = str.match(/\/\/\\\\/g); //\\
// str = 'https://google.co.ua sdchbjhb http://goo-gle.com http://goo.gle.com';
// console.log(str);
// // result = str.macth(/https://google.com/g);
// result = str.match(/https?:\/\/[a-zA-Z-]+\.[a-zA-Z0-9\.]+/g);
// console.log(result);

// str  = 'sdcsda-zcnsjnck234234a-zырвиоa-zсиdnsnsckj--.sdc'
// result = str.match(/(a-z)+/g);
// console.log(result);

// -----

// str = 'Pet+a! Hello Pethelloa Hello Petia! Hello Pet^ra Pet9ra Petra! Petгггra';
// console.log(str);
// result = str.match(/Pet[\w+-a-яА-Я]+a/gi);
// result = str.match(/^Pet[+]a/gi); //домик в скобках – все, что угодно, но не то, что после ^. Если домик в начале, то просто ожидание всего, что в скобках.
// console.log(result);

// ----- https://www.regextester.com/100026
// ^ – начало строки
// & – конец строки (\n – скрытый enter)
// [a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+ – сколь угодно раз должно повторится то, что в скобках, но хотя бы один раз точно +.
// @ - просто символ
// [A-Z0-9.-]+ – сколь угодно раз должно повторится то, что в скобках, но хотя бы один раз точно +.
// .[A-Z]{2,} – co, com


//---- Validate datetime https://www.regextester.com/1966

// ---- Find YouTube Links https://www.regextester.com/1947
