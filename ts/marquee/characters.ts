module DbDashboards.Marquees {

    export class Characters {

        constructor(){}

        getCharacter(character: string) : any {
            if (this.characterMap.hasOwnProperty(character)) {
                return this.characterMap[character];
            }
        }

        /**
         *  Maps characters to the bitmaps that form their shape. Characters are rendered
         *  as 6x8 dots. Currently the character set is limited to fairly traditional ASCII
         *  style characters (a..z A..9 space 0..9 and the traditional UK/US shift symbols.
         */
         characterMap:any = {
            " " : [0, 0, 0, 0, 0, 0],
            "A" : [63, 68, 68, 68, 63, 0],
            "B" : [127, 73, 73, 73, 54, 0],
            "C" : [62, 65, 65, 65, 34, 0],
            "D" : [127, 65, 65, 34, 28, 0],
            "E" : [127, 73, 73, 73, 65, 0],
            "F" : [127, 72, 72, 72, 64, 0],
            "G" : [62, 65, 73, 73, 47, 0],
            "H" : [127, 8, 8, 8, 127, 0],
            "I" : [0, 65, 127, 65, 0, 0],
            "J" : [0, 2, 65, 126, 64, 0],
            "K" : [127, 8, 20, 34, 65, 0],
            "L" : [127, 1, 1, 1, 1, 0],
            "M" : [127, 32, 16, 32, 127, 0],
            "N" : [127, 16, 8, 4, 127, 0],
            "O" : [62, 65, 65, 65, 62, 0],
            "P" : [127, 72, 72, 72, 48, 0],
            "Q" : [62, 65, 69, 66, 61, 0],
            "R" : [127, 72, 76, 74, 49, 0],
            "S" : [49, 73, 73, 73, 102, 0],
            "T" : [64, 64, 127, 64, 64, 0],
            "U" : [126, 1, 1, 1, 126, 0],
            "V" : [124, 2, 1, 2, 124, 0],
            "W" : [126, 1, 6, 1, 126, 0],
            "X" : [99, 20, 8, 20, 99, 0],
            "Y" : [112, 8, 7, 8, 112, 0],
            "Z" : [67, 69, 73, 81, 97, 0],
            "a" : [2, 21, 21, 21, 15, 0],
            "b" : [127, 9, 17, 17, 14, 0],
            "c" : [14, 17, 17, 17, 2, 0],
            "d" : [14, 17, 17, 9, 127, 0],
            "e" : [14, 21, 21, 21, 12, 0],
            "f" : [8, 63, 72, 64, 32, 0],
            "g" : [8, 21, 21, 21, 30, 0],
            "h" : [127, 8, 16, 16, 15, 0],
            "i" : [0, 17, 95, 1, 0, 0],
            "j" : [2, 1, 17, 94, 0, 0],
            "k" : [127, 4, 10, 17, 0, 0],
            "l" : [0, 65, 127, 1, 0, 0],
            "m" : [15, 16, 12, 16, 15, 0],
            "n" : [31, 8, 16, 16, 15, 0],
            "o" : [14, 17, 17, 17, 14, 0],
            "p" : [31, 20, 20, 20, 8, 0],
            "q" : [8, 20, 20, 12, 31, 0],
            "r" : [31, 8, 16, 16, 8, 0],
            "s" : [8, 21, 21, 21, 2, 0],
            "t" : [16, 126, 17, 1, 2, 0],
            "u" : [30, 1, 1, 2, 31, 0],
            "v" : [28, 2, 1, 2, 28, 0],
            "w" : [30, 1, 6, 1, 30, 0],
            "x" : [17, 10, 4, 10, 17, 0],
            "y" : [0, 25, 5, 5, 30, 0],
            "z" : [17, 19, 21, 25, 17, 0],
            "!" : [0, 0, 121, 0, 0, 0],
            "\\" : [ 0, 112, 0, 112, 0, 0],
            "#" : [20, 127, 20, 127, 20, 0],
            "$" : [18, 42, 127, 42, 36, 0],
            "%" : [98, 100, 8, 19, 35, 0],
            "&" : [54, 73, 85, 34, 5, 0],
            "'" : [0, 80, 96, 0, 0, 0],
            "(" : [0, 28, 34, 65, 0, 0],
            ")" : [0, 65, 34, 28, 0, 0],
            "*" : [20, 8, 62, 8, 20, 0],
            "+" : [8, 8, 62, 8, 8, 0],
            "," : [0, 5, 6, 0, 0, 0],
            "-" : [8, 8, 8, 8, 8, 0],
            "." : [0, 3, 3, 0, 0, 0],
            "/" : [2, 4, 8, 16, 32, 0],
            "0" : [62, 69, 73, 81, 62, 0],
            "1" : [0, 33, 127, 1, 0, 0],
            "2" : [33, 67, 69, 73, 49, 0],
            "3" : [66, 65, 81, 105, 70, 0],
            "4" : [8, 24, 40, 127, 8, 0],
            "5" : [114, 81, 81, 81, 78, 0],
            "6" : [30, 41, 73, 73, 6, 0],
            "7" : [64, 71, 72, 80, 96, 0],
            "8" : [54, 73, 73, 73, 54, 0],
            "9" : [48, 73, 73, 74, 60, 0],
            ":" : [0, 54, 54, 0, 0, 0],
            ";" : [0, 53, 54, 0, 0, 0],
            "<" : [8, 20, 34, 65, 0, 0],
            "=" : [20, 20, 20, 20, 20, 0],
            ">" : [65, 34, 20, 8, 0, 0],
            "?" : [32, 64, 69, 72, 48, 0],
            "@" : [38, 73, 79, 65, 62, 0],
            "[" : [0, 127, 65, 65, 0, 0],
            "]" : [0, 65, 65, 127, 0, 0],
            "£" : [9, 63, 73, 33, 0, 0],
            "^" : [16, 32, 64, 32, 16, 0],
            "_" : [1, 1, 1, 1, 1, 0],
            "`" : [64, 32, 16, 0, 0, 0],
            "{" : [0, 8, 54, 65, 0, 0],
            "|" : [0, 0, 119, 0, 0, 0],
            "}" : [0, 65, 54, 8, 0, 0]
        };
    }
}