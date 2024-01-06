var kalinince = {
   "A": 0,
   "a": 0,
   "А": 0, //A
   "а": 0, //a
   "Ӑ": 0, //Ӑ
   "ӑ": 0, //ӑ
   "Ă": 0, //Ă
   "ă": 0, //ă
   "E": 1,
   "e": 1,
   "Е": 1, //Kiril ye-yo
   "е": 1, //Kiril ye-yo
   "Э": 1, //É
   "э": 1, //é
   "Ә": 1, //Ä
   "ә": 1, //ä
   "Ə": 1, //Ä - Azerbaycan
   "ə": 1, //ä - Azerbaycan
   "Ӗ": 1, //Ӗ
   "ӗ": 1, //ӗ
   "O": 0,
   "o": 0,
   "О": 0, //O
   "о": 0, //o
   "Ö": 1,
   "ö": 1,
   "Ө": 1, //Ö
   "ө": 1, //ö
   "Ѳ": 1, //Ö - kırgız
   "ѳ": 1, //ö - kırgız
   "U": 0,
   "u": 0,
   "Ұ": 0, //U
   "ұ": 0, //u
   "У": 0, //W
   "у": 0, //w
   "Ü": 1,
   "ü": 1,
   "Ү": 1, //Ü
   "ү": 1, //ü
   "Ӳ": 1, //Ӳ
   "ӳ": 1, //ӳ
   "I": 0,
   "ı": 0,
   "Ы": 0, //I
   "ы": 0, //ı
   "İ": 1,
   "i": 1,
   "І": 1, //İ
   "і": 1, //i
   "И": 1, //Ï
   "и": 1, //ï
   // Iran - Arap
   "آ": 0, //ӗ - İran
   "ا": 0, //ӗ - İran
};
var unluler = {
   "A": "&#x10C00;",
   "a": "&#x10C00;",
   "А": "&#x10C00;", //A
   "а": "&#x10C00;", //a
   "Ә": "&#x10C00;", //Ä
   "ә": "&#x10C00;", //ä
   "Ə": "&#x10C00;", //Ä - Azerbaycan
   "ə": "&#x10C00;", //ä - Azerbaycan
   "Ӑ": "&#x10C00;", //Ӑ
   "ӑ": "&#x10C00;", //ӑ
   "Ă": "&#x10C00;", //Ă
   "ă": "&#x10C00;", //ă
   "E": "&#x10C00;",
   "e": "&#x10C00;",
   "Е": "&#x10C00;", //Kiril ye-yo
   "е": "&#x10C00;", //Kiril ye-yo
   "Э": "&#x10C00;", //É
   "э": "&#x10C00;", //é
   "Ӗ": "&#x10C00;", //Ӗ
   "ӗ": "&#x10C00;", //ӗ
   "I": "&#x10C03;",
   "ı": "&#x10C03;",
   "Ы": "&#x10C03;", //I
   "ы": "&#x10C03;", //ı
   "İ": "&#x10C03;",
   "i": "&#x10C03;",
   "І": "&#x10C03;", //İ
   "і": "&#x10C03;", //i
   "И": "&#x10C03;", //Ï
   "и": "&#x10C03;", //ï
   "O": "&#x10C06;",
   "o": "&#x10C06;",
   "О": "&#x10C06;", //O
   "о": "&#x10C06;", //o
   "U": "&#x10C06;",
   "u": "&#x10C06;",
   "Ұ": "&#x10C06;", //U
   "ұ": "&#x10C06;", //u
   "У": "&#x10C06;", //V
   "у": "&#x10C06;", //v
   "Ö": "&#x10C07;",
   "ö": "&#x10C07;",
   "Ө": "&#x10C07;", //Ö
   "ө": "&#x10C07;", //ö
   "Ѳ": "&#x10C07;", //Ö - kırgız
   "ѳ": "&#x10C07;", //ö - kırgız
   "Ü": "&#x10C07;",
   "ü": "&#x10C07;",
   "Ӳ": "&#x10C07;", //Ӳ
   "ӳ": "&#x10C07;", //ӳ
   "Ү": "&#x10C07;", //Ü
   "ү": "&#x10C07;", //ü
   // Iran - Arap
   "آ": "&#x10C00;", //alef-a-ir
   "ا": "&#x10C00;", //alef-a-ir
   "ی": "&#x10C03;", //ye-i-y-ir
   "ي": "&#x10C03;", //ye-i-y-ir
   "ي": "&#x10C03;", //ye-i-y-ir
   "ی": "&#x10C03;", //ye-i-y-ir
};

var kalinunsuz = {
   "B": "&#x10C09;",
   "b": "&#x10C09;",
   "V": "&#x10C09;",
   "v": "&#x10C09;",
   "Б": "&#x10C09;", //B
   "б": "&#x10C09;", //b
   "В": "&#x10C09;", //V
   "в": "&#x10C09;", //v
   "C": "&#x10C32;",
   "c": "&#x10C32;",
   "Ç": "&#x10C32;",
   "ç": "&#x10C32;",
   "Ч": "&#x10C32;", //Ç
   "ч": "&#x10C32;", //ç
   "D": "&#x10C11;",
   "d": "&#x10C11;",
   "Д": "&#x10C11;", //D
   "д": "&#x10C11;", //d
   "F": "&#x10C2F;",
   "f": "&#x10C2F;",
   "Ф": "&#x10C2F;", //F
   "ф": "&#x10C2F;", //f
   "G": "&#x10C0D;",
   "g": "&#x10C0D;",
   "Г": "&#x10C0D;", //G
   "г": "&#x10C0D;", //g
   "Ğ": "&#x10C0D;",
   "ğ": "&#x10C0D;",
   "Ғ": "&#x10C0D;", //Ğ
   "ғ": "&#x10C0D;", //ğ
   "K": "&#x10C34;",
   "k": "&#x10C34;",
   "Q": "&#x10C34;",
   "q": "&#x10C34;",
   "H": "&#x10C34;",
   "h": "&#x10C34;",
   "X": "&#x10C34;",
   "x": "&#x10C34;",
   "Қ": "&#x10C34;", //Ka
   "қ": "&#x10C34;", //ka
   "К": "&#x10C34;", //K
   "к": "&#x10C34;", //k
   "Һ": "&#x10C34;", //H
   "һ": "&#x10C34;", //h
   "Х": "&#x10C34;", //HH
   "х": "&#x10C34;", //HH
   "L": "&#x10C1E;",
   "l": "&#x10C1E;",
   "Л": "&#x10C1E;", //L
   "л": "&#x10C1E;", //l
   "M": "&#x10C22;",
   "m": "&#x10C22;",
   "М": "&#x10C22;", //M
   "м": "&#x10C22;", //m
   "N": "&#x10C23;",
   "n": "&#x10C23;",
   "Н": "&#x10C23;", //N
   "н": "&#x10C23;", //n
   "Ŋ": "&#x10C2D;",
   "ŋ": "&#x10C2D;",
   "Ñ": "&#x10C2D;",
   "ñ": "&#x10C2D;",
   "Ң": "&#x10C2D;", //Ŋ
   "ң": "&#x10C2D;", //ŋ
   "p": "&#x10C2F;",
   "P": "&#x10C2F;",
   "П": "&#x10C2F;", //P
   "п": "&#x10C2F;", //p
   "R": "&#x10C3A;",
   "r": "&#x10C3A;",
   "Р": "&#x10C3A;", //R
   "р": "&#x10C3A;", //r
   "S": "&#x10C3D;",
   "s": "&#x10C3D;",
   "С": "&#x10C3D;", //S
   "с": "&#x10C3D;", //s
   "Ş": "&#x10C41;",
   "ş": "&#x10C41;",
   "Ш": "&#x10C41;", //Ş
   "ш": "&#x10C41;", //ş
   "Щ": "&#x10C41;", //Ş
   "щ": "&#x10C41;", //ş
   "T": "&#x10C43;",
   "t": "&#x10C43;",
   "Т": "&#x10C43;", //T
   "т": "&#x10C43;", //t
   "Ц": "&#x10C43;&#x10C3D;", //TS
   "ц": "&#x10C43;&#x10C3D;", //ts
   "Y": "&#x10C16;",
   "y": "&#x10C16;",
   "J": "&#x10C16;",
   "j": "&#x10C16;",
   "Я": "&#x10C16;&#x10C00;", //YA
   "я": "&#x10C16;&#x10C00;", //ya
   "Ю": "&#x10C16;&#x10C06;", //YU
   "ю": "&#x10C16;&#x10C06;", //yu
   "Ё": "&#x10C16;&#x10C06;", //YO
   "ё": "&#x10C16;&#x10C06;", //yo
   "Й": "&#x10C16;", //Y
   "й": "&#x10C16;", //y
   "Ж": "&#x10C16;", //J
   "ж": "&#x10C16;", //j
   "Z": "&#x10C14;",
   "z": "&#x10C14;",
   "З": "&#x10C14;", //Z
   "з": "&#x10C14;", //z
   // Iran - Arap - kalınunsuz
   "د": "&#x10C11;", //dal-d-ir
   "ﺩ": "&#x10C11;", //dal-d-ir
   "ق": "&#x10C34;", //qaf-q-ir
   "ق": "&#x10C34;", //qaf-q-ir
   "ق": "&#x10C34;", //qaf-q-ir
   "ﻕ": "&#x10C34;", //qaf-q-ir
   "ک": "&#x10C1A;", //kaf-k-ir
   "ك": "&#x10C1A;", //kaf-k-ir
   "ك": "&#x10C1A;", //kaf-k-ir
   "ک": "&#x10C1A;", //kaf-k-ir
   "غ": "&#x10C0D;", //gayn-ğ-ir
   "غ": "&#x10C0D;", //gayn-ğ-ir
   "ﻏ": "&#x10C0D;", //gayn-ğ-ir
   "ﻍ": "&#x10C0D;", //gayn-ğ-ir
   "ف": "&#x10C2F;", //fe-f-ir
   "ف": "&#x10C2F;", //fe-f-ir
   "ﻓ": "&#x10C2F;", //fe-f-ir
   "ﻑ": "&#x10C2F;", //fe-f-ir
   "ﭻ": "&#x10C32;", //çe-ç-ir
   "چ": "&#x10C32;", //çe-ç-ir
   "ﭼ": "&#x10C32;", //çe-ç-ir
   "ﭺ": "&#x10C32;", //çe-ç-ir
   "ب": "&#x10C09;", //be-b-ir
   "ب": "&#x10C09;", //be-b-ir
   "ﺑ": "&#x10C09;", //be-b-ir
   "ب": "&#x10C09;", //be-b-ir
   "و": "&#x10C09;", //vav-v-ir
   "و": "&#x10C09;", //vav-v-ir
   "ط": "&#x10C43;", //ta-t-ir
   "ط": "&#x10C43;", //ta-t-ir
   "ﻃ": "&#x10C43;", //ta-t-ir
   "ﻁ": "&#x10C43;", //ta-t-ir
   "ت": "&#x10C45;", //te-t-ir
   "ت": "&#x10C45;", //te-t-ir
   "ﺗ": "&#x10C45;", //te-t-ir
   "ﺕ": "&#x10C45;", //te-t-ir
   "ص": "&#x10C41;", //şad-ş-ir
   "ص": "&#x10C41;", //şad-ş-ir
   "ﺻ": "&#x10C41;", //şad-ş-ir
   "ﺹ": "&#x10C41;", //şad-iş-r
   "پ": "&#x10C2F;", //pe-p-ir
   "پ": "&#x10C2F;", //pe-p-ir
   "ﭘ": "&#x10C2F;", //pe-p-ir
   "پ": "&#x10C2F;", //pe-p-ir
   "س": "&#x10C3D;&#x10C03", //sin-s-ir
   "س": "&#x10C3D;&#x10C03", //sin-s-ir
   "ﺳ": "&#x10C3D;&#x10C03", //sin-s-ir
   "ﺱ": "&#x10C3D;&#x10C03", //sin-s-ir
   "ش": "&#x10C41;", //sin2-ş-ir
   "ش": "&#x10C41;", //sin2-ş-ir
   "ﺷ": "&#x10C41;", //sin2-ş-ir
   "ﺵ": "&#x10C41;", //sin2-ş-ir
   "ث": "&#x10C3D;", //se-s-ir
   "ث": "&#x10C3D;", //se-s-ir
   "ﺛ": "&#x10C3D;", //se-s-ir
   "ﺙ": "&#x10C3D;", //se-s-ir
   "گ": "&#x10C0D;", //gaf-g-ir
   "گ": "&#x10C0D;", //gaf-g-ir
   "ﮔ": "&#x10C0D;", //gaf-g-ir
   "گ": "&#x10C0D;", //gaf-g-ir
   "ل": "&#x10C1E;", //lam-l-ir
   "ل": "&#x10C1E;", //lam-l-ir
   "ﻟ": "&#x10C1E;", //lam-l-ir
   "ﻝ": "&#x10C1E;", //lam-l-ir
   "م": "&#x10C22;", //mim-m-ir
   "م": "&#x10C22;", //mim-m-ir
   "ﻣ": "&#x10C22;", //mim-m-ir
   "ﻡ": "&#x10C22;", //mim-m-ir
   "ن": "&#x10C23;", //nun-ir
   "ن": "&#x10C23;", //nun-ir
   "ﻧ": "&#x10C23;", //nun-ir
   "ﻥ": "&#x10C23;", //nun-ir
   "ج": "&#x10C32;", //jim-c-ir
   "ﺞ": "&#x10C32;", //jim-c-ir
   "ﺟ": "&#x10C32;", //jim-c-ir
   "ﺝ": "&#x10C32;", //jim-c-ir
   "ﺦ": "&#x10C34;&#x10C0D;", //khe-x-h-ir
   "خ": "&#x10C34;&#x10C0D;", //khe-x-h-ir
   "ﺧ": "&#x10C34;&#x10C0D;", //khe-x-h-ir
   "ﺥ": "&#x10C34;&#x10C0D;", //khe-x-h-ir
   "ه": "&#x10C34;", //hye-h-ir
   "ه": "&#x10C34;", //hye-h-ir
   "ه": "&#x10C34;", //hye-h-ir
   "ﻩ": "&#x10C34;", //hye-h-ir
   "ﺢ": "&#x10C34;", //hje-h-ir
   "ح": "&#x10C34;", //hje-h-ir
   "ﺣ": "&#x10C34;", //hje-h-ir
   "ﺡ": "&#x10C34;", //hje-h-ir
   "ع": "&#x10C34;", //eyn-hyu-ir
   "ع": "&#x10C34;", //eyn-hyu-ir
   "ﻋ": "&#x10C34;", //eyn-hyu-ir
   "ﻉ": "&#x10C34;", //eyn-hyu-ir
   "ر": "&#x10C3A;", //re-r-ir
   "ﺭ": "&#x10C3A;", //re-r-ir
   "ظ": "&#x10C14;", //za-ir
   "ظ": "&#x10C14;", //za-ir
   "ﻇ": "&#x10C14;", //za-ir
   "ﻅ": "&#x10C14;", //za-ir
   "ض": "&#x10C14;", //zad-ir
   "ض": "&#x10C14;", //zad-ir
   "ﺿ": "&#x10C14;", //zad-ir
   "ﺽ": "&#x10C14;", //zad-ir
   "ذ": "&#x10C14;", //zal-z-ir
   "ﺫ": "&#x10C14;", //zal-z-ir
   "ز": "&#x10C14;", //ze-z-ir
   "ﺯ": "&#x10C14;", //ze-z-ir
   "ژ": "&#x10C14;", //že-z-ir
   "ژ": "&#x10C14;", //že-z-ir
}; // kalınunsuzler biter

var inceunsuz = { 
   "B": "&#x10C0B;",
   "b": "&#x10C0B;",
   "V": "&#x10C0B;",
   "v": "&#x10C0B;",
   "Б": "&#x10C0B;", //B
   "б": "&#x10C0B;", //b
   "В": "&#x10C0B;", //V
   "в": "&#x10C0B;", //v
   "C": "&#x10C32;",
   "c": "&#x10C32;",
   "Ç": "&#x10C32;",
   "ç": "&#x10C32;",
   "Ч": "&#x10C32;", //Ç
   "ч": "&#x10C32;", //ç
   "D": "&#x10C13;",
   "d": "&#x10C13;",
   "Д": "&#x10C13;", //D
   "д": "&#x10C13;", //d
   "F": "&#x10C2F;",
   "f": "&#x10C2F;",
   "Ф": "&#x10C2F;", //F
   "ф": "&#x10C2F;", //f
   "G": "&#x10C0F;",
   "g": "&#x10C0F;",
   "Ğ": "&#x10C0F;",
   "ğ": "&#x10C0F;",
   "Г": "&#x10C0F;", //G
   "г": "&#x10C0F;", //g
   "Ғ": "&#x10C0F;", //Ğ
   "ғ": "&#x10C0F;", //ğ
   "K": "&#x10C1A;",
   "k": "&#x10C1A;",
   "Q": "&#x10C34;",
   "q": "&#x10C34;",
   "H": "&#x10C1A;",
   "h": "&#x10C1A;",
   "X": "&#x10C1A;",
   "x": "&#x10C1A;",
   "Қ": "&#x10C34;", //Ka
   "қ": "&#x10C34;", //ka
   "К": "&#x10C1A;", //Ke
   "к": "&#x10C1A;", //ke
   "Һ": "&#x10C1A;", //He
   "һ": "&#x10C1A;", //he
   "Х": "&#x10C34;", //Ha
   "х": "&#x10C34;", //ha
   "L": "&#x10C20;",
   "l": "&#x10C20;",
   "Л": "&#x10C20;", //L
   "л": "&#x10C20;", //l
   "M": "&#x10C22;",
   "m": "&#x10C22;",
   "М": "&#x10C22;", //M
   "м": "&#x10C22;", //m
   "N": "&#x10C24;",
   "n": "&#x10C24;",
   "Н": "&#x10C24;", //N
   "н": "&#x10C24;", //n
   "Ŋ": "&#x10C2D;",
   "ŋ": "&#x10C2D;",
   "Ñ": "&#x10C2D;",
   "ñ": "&#x10C2D;",
   "Ң": "&#x10C2D;", //Ŋ
   "ң": "&#x10C2D;", //ŋ
   "p": "&#x10C2F;",
   "P": "&#x10C2F;",
   "П": "&#x10C2F;", //P
   "п": "&#x10C2F;", //p
   "R": "&#x10C3C;",
   "r": "&#x10C3C;",
   "Р": "&#x10C3C;", //R
   "р": "&#x10C3C;", //r
   "S": "&#x10C3E;",
   "s": "&#x10C3E;",
   "С": "&#x10C3E;", //S
   "с": "&#x10C3E;", //s
   "Ş": "&#x10C41;",
   "ş": "&#x10C41;",
   "Ш": "&#x10C41;", //Ş
   "ш": "&#x10C41;", //ş
   "Щ": "&#x10C41;", //Ş
   "щ": "&#x10C41;", //ş
   "T": "&#x10C45;",
   "t": "&#x10C45;",
   "Т": "&#x10C45;", //T
   "т": "&#x10C45;", //t
   "Ц": "&#x10C45;&#x10C3E;", //TS
   "ц": "&#x10C45;&#x10C3E;", //ts
   "Y": "&#x10C18;",
   "y": "&#x10C18;",
   "J": "&#x10C18;",
   "j": "&#x10C18;",
   "Я": "&#x10C16;&#x10C00;", //YA
   "я": "&#x10C16;&#x10C00;", //ya
   "Ю": "&#x10C16;&#x10C06;", //YU
   "ю": "&#x10C16;&#x10C06;", //yu
   "Ё": "&#x10C16;&#x10C06;", //YO
   "ё": "&#x10C16;&#x10C06;", //yo
   "Й": "&#x10C18;", //Y
   "й": "&#x10C18;", //y
   "Ж": "&#x10C18;", //J
   "ж": "&#x10C18;", //j
   "Z": "&#x10C14;",
   "z": "&#x10C14;",
   "З": "&#x10C14;", //Z
   "з": "&#x10C14;", //z
   // Iran - Arap - inceunsuz
   "د": "&#x10C13;", //dal-d-ir
   "ﺩ": "&#x10C13;", //dal-d-ir
   "ق": "&#x10C34;", //qaf-q-ir
   "ق": "&#x10C34;", //qaf-q-ir
   "ق": "&#x10C34;", //qaf-q-ir
   "ﻕ": "&#x10C34;", //qaf-q-ir
   "ک": "&#x10C1A;", //kaf-k-ir
   "ك": "&#x10C1A;", //kaf-k-ir
   "ك": "&#x10C1A;", //kaf-k-ir
   "ک": "&#x10C1A;", //kaf-k-ir
   "غ": "&#x10C0F;", //gayn-ğ-ir
   "غ": "&#x10C0F;", //gayn-ğ-ir
   "ﻏ": "&#x10C0F;", //gayn-ğ-ir
   "ﻍ": "&#x10C0F;", //gayn-ğ-ir
   "ف": "&#x10C2F;", //fe-f-ir
   "ف": "&#x10C2F;", //fe-f-ir
   "ﻓ": "&#x10C2F;", //fe-f-ir
   "ﻑ": "&#x10C2F;", //fe-f-ir
   "ﭻ": "&#x10C32;", //çe-ç-ir
   "چ": "&#x10C32;", //çe-ç-ir
   "ﭼ": "&#x10C32;", //çe-ç-ir
   "ﭺ": "&#x10C32;", //çe-ç-ir
   "ب": "&#x10C0B;", //be-ir
   "ب": "&#x10C0B;", //be-ir
   "ﺑ": "&#x10C0B;", //be-ir
   "ب": "&#x10C0B;", //be-ir
   "و": "&#x10C0B;", //vav-v-ir
   "و": "&#x10C0B;", //vav-v-ir
   "ط": "&#x10C43;", //ta-t-ir
   "ط": "&#x10C43;", //ta-t-ir
   "ﻃ": "&#x10C43;", //ta-t-ir
   "ﻁ": "&#x10C43;", //ta-t-ir
   "ت": "&#x10C45;", //te-t-ir
   "ت": "&#x10C45;", //te-t-ir
   "ﺗ": "&#x10C45;", //te-t-ir
   "ﺕ": "&#x10C45;", //te-t-ir
   "ص": "&#x10C41;", //şad-ş-ir
   "ص": "&#x10C41;", //şad-ş-ir
   "ﺻ": "&#x10C41;", //şad-ş-ir
   "ﺹ": "&#x10C41;", //şad-ş-ir
   "پ": "&#x10C2F;", //pe-ir
   "پ": "&#x10C2F;", //pe-ir
   "ﭘ": "&#x10C2F;", //pe-ir
   "پ": "&#x10C2F;", //pe-ir
   "س": "&#x10C3E;&#x10C03", //sin-s-ir
   "س": "&#x10C3E;&#x10C03", //sin-s-ir
   "ﺳ": "&#x10C3E;&#x10C03", //sin-s-ir
   "ﺱ": "&#x10C3E;&#x10C03", //sin-s-ir
   "ش": "&#x10C41;", //sin2-ş-ir
   "ش": "&#x10C41;", //sin2-ş-ir
   "ﺷ": "&#x10C41;", //sin2-ş-ir
   "ﺵ": "&#x10C41;", //sin2-ş-ir
   "ث": "&#x10C3E;", //se-s-ir
   "ث": "&#x10C3E;", //se-s-ir
   "ﺛ": "&#x10C3E;", //se-s-ir
   "ﺙ": "&#x10C3E;", //se-s-ir
   "گ": "&#x10C13;", //gaf-ir
   "گ": "&#x10C13;", //gaf-ir
   "ﮔ": "&#x10C13;", //gaf-ir
   "گ": "&#x10C13;", //gaf-ir
   "ل": "&#x10C20;", //lam-l-ir
   "ل": "&#x10C20;", //lam-l-ir
   "ﻟ": "&#x10C20;", //lam-l-ir
   "ﻝ": "&#x10C20;", //lam-l-ir
   "م": "&#x10C22;&#x10C0F;", //mim-m-ir
   "م": "&#x10C22;&#x10C0F;", //mim-m-ir
   "ﻣ": "&#x10C22;&#x10C0F;", //mim-m-ir
   "ﻡ": "&#x10C22;&#x10C0F;", //mim-m-ir
   "ﺦ": "&#x10C1A;", //khe-x-h-ir
   "خ": "&#x10C1A;", //khe-x-h-ir
   "ﺧ": "&#x10C1A;", //khe-x-h-ir
   "ﺥ": "&#x10C1A;", //khe-x-h-ir
   "ه": "&#x10C1A;", //hye-h-ir
   "ه": "&#x10C1A;", //hye-h-ir
   "ه": "&#x10C1A;", //hye-h-ir
   "ﻩ": "&#x10C1A;", //hye-h-ir
   "ﺢ": "&#x10C1A;", //hje-h-ir
   "ح": "&#x10C1A;", //hje-h-ir
   "ﺣ": "&#x10C1A;", //hje-h-ir
   "ﺡ": "&#x10C1A;", //hje-h-ir
   "ع": "&#x10C34;", //eyn-hyu-ir
   "ع": "&#x10C34;", //eyn-hyu-ir
   "ﻋ": "&#x10C34;", //eyn-hyu-ir
   "ﻉ": "&#x10C34;", //eyn-hyu-ir
   "ن": "&#x10C24;", //nu-n-ir
   "ن": "&#x10C24;", //nun-n-ir
   "ﻧ": "&#x10C24;", //nun-n-ir
   "ﻥ": "&#x10C24;", //nun-n-ir
   "ج": "&#x10C32;", //jim-c-ir
   "ﺞ": "&#x10C32;", //jim-c-ir
   "ﺟ": "&#x10C32;", //jim-c-ir
   "ﺝ": "&#x10C32;", //jim-c-ir
   "ر": "&#x10C3C;", //re-r-ir
   "ﺭ": "&#x10C3C;", //re-r-ir
   "ظ": "&#x10C14;", //za-z-ir
   "ظ": "&#x10C14;", //za-z-ir
   "ﻇ": "&#x10C14;", //za-z-ir
   "ﻅ": "&#x10C14;", //za-z-ir
   "ض": "&#x10C14;", //zad-z-ir
   "ض": "&#x10C14;", //zad-z-ir
   "ﺿ": "&#x10C14;", //zad-z-ir
   "ﺽ": "&#x10C14;", //zad-z-ir
   "ذ": "&#x10C14;", //zal-z-ir
   "ﺫ": "&#x10C14;", //zal-z-ir
   "ز": "&#x10C14;", //ze-z-ir
   "ﺯ": "&#x10C14;", //ze-z-ir
   "ژ": "&#x10C14;", //že-z-ir
   "ژ": "&#x10C14;", //že-z-ir
}; // inceunsuz biter

var ciftsesli = {
   "İÇ": "&#x10C31;",
   "iç": "&#x10C31;",
   "İç": "&#x10C31;",
   "iÇ": "&#x10C31;",
   "İC": "&#x10C31;",
   "ic": "&#x10C31;",
   "İc": "&#x10C31;",
   "iC": "&#x10C31;",
   "ІЧ": "&#x10C31;", //İÇ
   "іч": "&#x10C31;", //iç
   "Іч": "&#x10C31;", //İç
   "іЧ": "&#x10C31;", //iÇ
   "IK": "&#x10C36;",
   "ık": "&#x10C36;",
   "Ik": "&#x10C36;",
   "ıK": "&#x10C36;",
   "ЫҚ": "&#x10C36;", //IK
   "ық": "&#x10C36;", //ık
   "Ық": "&#x10C36;", //Ik
   "ыҚ": "&#x10C36;", //ıK
   "OK": "&#x10C38;",
   "ok": "&#x10C38;",
   "Ok": "&#x10C38;",
   "oK": "&#x10C38;",
   "ОҚ": "&#x10C38;", //OK
   "оқ": "&#x10C38;", //ok
   "Оқ": "&#x10C38;", //Ok
   "оҚ": "&#x10C38;", //oK
   "UK": "&#x10C38;",
   "uk": "&#x10C38;",
   "Uk": "&#x10C38;",
   "uK": "&#x10C38;",
   "ҰҚ": "&#x10C38;", //UK
   "ұқ": "&#x10C38;", //uk
   "Ұқ": "&#x10C38;", //Uk
   "ұҚ": "&#x10C38;", //uK
   "ÖK": "&#x10C1C;",
   "ök": "&#x10C1C;",
   "Ök": "&#x10C1C;",
   "öK": "&#x10C1C;",
   "ӨК": "&#x10C1C;", //ÖK
   "өк": "&#x10C1C;", //ök
   "Өк": "&#x10C1C;", //Ök
   "өК": "&#x10C1C;", //öK
   "ÜK": "&#x10C1C;",
   "ük": "&#x10C1C;",
   "Ük": "&#x10C1C;",
   "üK": "&#x10C1C;",
   "ҮК": "&#x10C1C;", //ÜK
   "үк": "&#x10C1C;", //ük
   "Үк": "&#x10C1C;", //Ük
   "үК": "&#x10C1C;" //üK
}; // ciftsesli biter

var birlunsuz = {
   //    "LT" : "&#x10C21;",
   //    "lt" : "&#x10C21;",
   //    "Lt" : "&#x10C21;",
   //    "Lt" : "&#x10C21;",
   //    "ЛТ" : "&#x10C21;",//LT
   //    "лт" : "&#x10C21;",//lt
   //    "Лт" : "&#x10C21;",//Lt
   //    "лТ" : "&#x10C21;",//lT
   "LD": "&#x10C21;",
   "ld": "&#x10C21;",
   "Ld": "&#x10C21;",
   "lD": "&#x10C21;",
   "ЛД": "&#x10C21;", //LD
   "лд": "&#x10C21;", //ld
   "Лд": "&#x10C21;", //Ld
   "лД": "&#x10C21;", //lD
   "NÇ": "&#x10C28;",
   "nç": "&#x10C28;",
   "Nç": "&#x10C28;",
   "nÇ": "&#x10C28;",
   "НЧ": "&#x10C28;", //NÇ
   "нч": "&#x10C28;", //nç
   "Нч": "&#x10C28;", //Nç
   "нЧ": "&#x10C28;", //NÇ
   "NG": "&#x10C2D;",
   "ng": "&#x10C2D;",
   "Ng": "&#x10C2D;",
   "nG": "&#x10C2D;",
   "НГ": "&#x10C2D;", //NG
   "нг": "&#x10C2D;", //ng
   "Нг": "&#x10C2D;", //Ng
   "нГ": "&#x10C2D;", //nG
   "NY": "&#x10C2A;",
   "ny": "&#x10C2A;",
   "Ny": "&#x10C2A;",
   "nY": "&#x10C2A;",
   "НЙ": "&#x10C2A;", //NY
   "нй": "&#x10C2A;", //ny
   "Нй": "&#x10C2A;", //Ny
   "нЙ": "&#x10C2A;", //nY
   //    "NT" : "&#x10C26;",
   //    "nt" : "&#x10C26;",
   //    "Nt" : "&#x10C26;",
   //    "nT" : "&#x10C26;",
   //    "НТ" : "&#x10C26;",//NT
   //    "нт" : "&#x10C26;",//nt
   //    "Нт" : "&#x10C26;",//Nt
   //    "нТ" : "&#x10C26;",//nT
   "ND": "&#x10C26;",
   "nd": "&#x10C26;",
   "Nd": "&#x10C26;",
   "nD": "&#x10C26;",
   "НД": "&#x10C26;", //ND
   "нд": "&#x10C26;", //nd
   "Нд": "&#x10C26;", //Nd
   "нД": "&#x10C26;" //nD
}; // birlunsuz biter

// This function takes a string input and returns an array of its individual characters.
function strToArr(str) {
  var charList = str.split('');
  return charList;
}

// This function converts a given input string into its corresponding HTML entity codes in hexadecimal format.
function chtohx(input) {
  // This function pads the input string with leading zeros to ensure it has a length of 5 characters.
  function pad_four(input) {
    var l = input.length;
    if (l == 0) return '00000';
    if (l == 1) return '0000' + input;
    if (l == 2) return '000' + input;
    if (l == 3) return '00' + input;
    if (l == 4) return '0' + input;
    return input;
  }
  // This variable will hold the final output string.
  var output = '';
  // Loop through each character in the input string.
  for (var i = 0, l = input.length; i < l; i++) {
    // Convert the current character to its corresponding HTML entity code in hexadecimal format.
    output += pad_four('&#' + input.charCodeAt(i).toString(16)) + ';';
  }
  // Return the final output string.
  return output;
}

// This is the main function that performs text conversion.
function lto(str) {
  // This variable will hold the final output string.
  var ret = "";
  // Convert the input string into an array of individual characters.
  var chra = strToArr(str);
  // Get the length of the input string.
  var sz = chra.length;
  // This variable keeps track of the previous character's kalin/ince status.
  var lki = 0;
  // Loop through each character in the input string.
  for (var i = 0; i < sz; i++) {
    var ch = chra[i];
    var chn = "";
    // Get the next character in the input string, if there is one.
    if (i < sz - 1) {
      chn = chra[i + 1];
    }
    var och = "";
    // Get the previous character in the input string, if there is one.
    if (i > 0) {
      och = chra[i - 1];
    }

    // Combine the current and next characters into a two-letter string.
    var ikili = ch + chn;
    // Combine the previous and current characters into a two-letter string.
    var eik = och + ch;
    // Check if the current character is a newline character.
    if (ch == "\n") {
      // Replace newlines with a dot followed by a space.
      ret += " .";
      continue;
    }

    if (ch == " ") {
      // Repeat the space.
      ret += "  ";
      continue;
    }

    // Check if the current character is one of these.
    if (ch == " " 
            || ch == "1" 
            || ch == "2" 
            || ch == "3" 
            || ch == "4" 
            || ch == "5" 
            || ch == "6" 
            || ch == "7" 
            || ch == "8" 
            || ch == "9" 
            || ch == "0" 
            || ch == ":" 
            || ch == ";"
            || ch == "!"
            || ch == "?"
            || ch == "/"
            || ch == "\\"
            || ch == "."
            || ch == ","
            || ch == "("
            || ch == ")"
            || ch == "\["
            || ch == "\]"
            || ch == "\{"
            || ch == "\}"
            || ch == "\#"
            || ch == "$"
            || ch == "€"
            || ch == "₺"
            || ch == "<"
            || ch == ">"
            || ch == '"'
            || ch == "'"
            || ch == "_"
            || ch == "─"
            || ch == "-"
            || ch == "+"
            || ch == "="
            || ch == "*"
            || ch == "&"
            || ch == "%"
            || ch == "@"
            || ch == "~") {    // Leave these as they are.
      ret += ch;
      continue;
      }

    // Check if the current and previous characters make up a cift-gokturk pair.
    if (eik in ciftsesli) {
      // Replace the previous character and current character with their corresponding ciftsesli.
      ret = ret.slice(0, -9);
      ret += ciftsesli[eik];
    } else if (ch in unluler) {
      // Replace the current character with its corresponding unluler.
      ret += unluler[ch];
      // Update the previous character's kalin/ince status.
      lki = kalinince[ch];
      continue;
    } else if (ikili in birlunsuz) {
      // Replace the current and next characters with their corresponding birlunsuz.
      ret += birlunsuz[ikili];
      i++;
      continue;
    } else if (ch in inceunsuz) {
      // Check if the current character is an ince harf.
      if (chn in kalinince) {
        // Check if the next character is a kalin that can form a pair with the current character.
        if ((chn == "a" || chn == "e") && (chra[i + 2] != " "   && chra[i + 2] != "\n")) {
          // Check the kalin/ince status of the next character.
          var cs = kalinince[chn];
          // Replace the current character with its corresponding inceunsuz or kalinunsuz, depending on the kalin/ince status of the next character.
          if (cs == 1) {
                if (
                chra[i - 1] == "a"
                || chra[i - 1] == "e"
                ) {
                ret += inceunsuz[ch];
              } else {
                ret += inceunsuz[ch] + unluler[chn];
              }
          } else if (cs == 0) {
                if (
                chra[i - 1] == "a"
                || chra[i - 1] == "e"
                ) {
                ret += kalinunsuz[ch];
              } else {
                ret += kalinunsuz[ch] + unluler[chn];
              }
          }
        } else
        if ((chn == "ı" || chn == "ü" || chn == "ö") && (chra[i + 2] != " "   && chra[i + 2] != "\n")) {
          // Check the kalin/ince status of the next character.
          var cs = kalinince[chn];
          // Replace the current character with its corresponding inceunsuz or kalinunsuz, depending on the kalin/ince status of the next character.
          if (cs == 1) {

                if (chra[i + 2] == "k") {
                ret += inceunsuz[ch] + unluler[chn];
              } else if  (chra[i - 1] == "ö" || chra[i - 1] == "ü") {
                ret += inceunsuz[ch];
              } else {
                ret += inceunsuz[ch] + unluler[chn];
              }

          } else if (cs == 0) {

                if (chra[i + 2] == "k") {
                ret += kalinunsuz[ch] + unluler[chn];
              } else if  (chra[i - 1] == "ı") {
                ret += kalinunsuz[ch];
              } else if  (chra[i - 1] == "ı" || chra[i - 1] == "i") {
                ret += kalinunsuz[ch];
              } else {
                ret += kalinunsuz[ch] + unluler[chn];
              }

          }

        } else
        if ((chn == "i" || chn == "o" || chn == "u") && (chra[i + 2] != " "   && chra[i + 2] != "\n")) {
          // Check the kalin/ince status of the next character.
          var cs = kalinince[chn];
          // Replace the current character with its corresponding inceunsuz or kalinunsuz, depending on the kalin/ince status of the next character.
          if (cs == 1) {
                if (chra[i + 2] == "ç" || chra[i + 2] == "c") {
                ret += inceunsuz[ch] + unluler[chn];
                } else if  (chra[i - 1] == "i" || chra[i - 1] == "ı") {
                ret += inceunsuz[ch];
              } else {
                ret += inceunsuz[ch] + unluler[chn];
              }

          } else if (cs == 0) {

                if (chra[i + 2] == "k") {
                ret += kalinunsuz[ch] + unluler[chn];
              } else if  (chra[i - 1] == "o" || chra[i - 1] == "u") {
                ret += kalinunsuz[ch];
              } else {
                ret += kalinunsuz[ch] + unluler[chn];
              }

          }
        } else {

          // If the next character is not a kalin that can form a pair with the current character, replace the current and next characters with their corresponding kalinince.
          var cs = kalinince[chn];
          if (cs == 1) {
            ret += inceunsuz[ch] + unluler[chn];
          } else if (cs == 0) {
            ret += kalinunsuz[ch] + unluler[chn];
          }
        }
        // Move the loop's counter to skip the next character.
        i++;
        // Update the previous character's kalin/ince status.
        lki = cs;
        continue;
      } else {
        // If the current character is an ince and the previous character is kalin, replace the current character with its corresponding inceunsuz.
        if (lki == 1) {
          ret += inceunsuz[ch];
        }
        // If the current character is an ince and the previous character is also ince, replace the current character with its corresponding kalinunsuz.
        if (lki == 0) {
          ret += kalinunsuz[ch];
        }
      }
    }
  }
  // Return the final output string.
  return ret;
}

// Wait for the DOM content to be loaded
document.addEventListener('DOMContentLoaded', function() {
  var ltnInput = document.getElementById('ltn');
  ltnInput.addEventListener('input', function() {
    eski();
  });
});

// Function to handle the transformation
function eski() {
  var ltnInput = document.getElementById('ltn');
  var orhnInput = document.getElementById('orhn');
  var gtextInput = document.getElementById('gtext');
  var str = ltnInput.value + " ";
  var data = lto(str);
  data = decodeEntities(data).trim();
//  data = decodeEntities(data).trim().replace(/\./g, "\n");
  orhnInput.value = data;
  gtextInput.value = data;
}

// Function to decode HTML entities
function decodeEntities(encodedString) {
  var element = document.createElement('div');
  element.innerHTML = encodedString;
  return element.textContent || element.innerText;
}
