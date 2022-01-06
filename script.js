var Zewnatrz = /** @class */ (function () {
    function Zewnatrz() {
        this.max_pojemnosc = 100000000000000000000;
        this.ktomozewejsc = ["Pracownik Sortowni", "Pracownik Airstrip", "Dozorca", "Menadżer", "Pracownik Transportu"];
        this.pracownicy = [
            { imie_i_nazwisko: "Remigiusz Mazurek", numer: 22, typ_karty: "Menadżer" },
            { imie_i_nazwisko: "Kornel Chmielewski", numer: 1128, typ_karty: "Dozorca" },
            { imie_i_nazwisko: "Marcel Malinowski", numer: 1032, typ_karty: "Dozorca" },
            { imie_i_nazwisko: "Cezary Kaźmierczak", numer: 665, typ_karty: "Pracownik Transportu" },
            { imie_i_nazwisko: "Dobromił Baran", numer: 230, typ_karty: "Pracownik Sortowni" },
            { imie_i_nazwisko: "Alex Ostrowski", numer: 412, typ_karty: "Pracownik Sortowni" },
            { imie_i_nazwisko: "Gniewomir Wróblewski ", numer: 154, typ_karty: "Pracownik Sortowni" }
        ];
    }
    return Zewnatrz;
}());
var Zr = /** @class */ (function () {
    function Zr() {
        this.max_pojemnosc = 5;
        this.ktomozewejsc = ["Pracownik Sortowni", "Pracownik Airstrip", "Dozorca", "Menadżer", "Pracownik Transportu"];
        this.pracownicy = [{ imie_i_nazwisko: "Błażej Szulc", numer: 725, typ_karty: "Pracownik Transportu" }];
    }
    return Zr;
}());
var Sortownia = /** @class */ (function () {
    function Sortownia() {
        this.max_pojemnosc = 7;
        this.ktomozewejsc = ["Pracownik Sortowni", "Pracownik Airstrip", "Dozorca", "Menadżer"];
        this.pracownicy = [
            { imie_i_nazwisko: "Amir Woźniak", numer: 351, typ_karty: "Pracownik Sortowni" },
            { imie_i_nazwisko: "Ariel Szczepański", numer: 186, typ_karty: "Pracownik Airstrip" }
        ];
    }
    return Sortownia;
}());
var Magazyn = /** @class */ (function () {
    function Magazyn() {
        this.max_pojemnosc = 3;
        this.ktomozewejsc = ["Pracownik Sortowni", "Dozorca", "Menadżer"];
        this.pracownicy = [];
    }
    return Magazyn;
}());
var Airstrip = /** @class */ (function () {
    function Airstrip() {
        this.max_pojemnosc = 3;
        this.pracownicy = [
            { imie_i_nazwisko: "Dorian Kowalski ", numer: 123, typ_karty: "Pracownik Airstrip" },
            { imie_i_nazwisko: "Maurycy Sokołowski", numer: 107, typ_karty: "Pracownik Airstrip" },
            { imie_i_nazwisko: "Teofil Kowalski", numer: 112, typ_karty: "Pracownik Airstrip" }
        ];
        this.ktomozewejsc = ["Pracownik Airstrip", "Menadżer"];
    }
    return Airstrip;
}());
var zewnatrz = new Zewnatrz();
var zr = new Zr();
var sortownia = new Sortownia();
var magazyn = new Magazyn();
var airstrip = new Airstrip();
var wybrany_pracownik = null;
var wybrana_strefa = null;
var wybrana_strefa_str = null;
var strefa_docelowa = null;
var strefa_docelowa_str = null;
var osoba = null;
function wiadomosc(tekst) {
    var message = document.getElementById('message');
    message.innerText = tekst;
}
function zaznacz(id) {
    if (wybrany_pracownik != null)
        document.getElementById('li_' + wybrany_pracownik).classList.remove('selected');
    wybrany_pracownik = id;
    document.getElementById('li_' + id).classList.add('selected');
}
function generowanie(nazwa) {
    var list = document.querySelector('.list');
    var lista = '';
    for (var i = 0; i < nazwa.pracownicy.length; i++) {
        lista += '<li id="li_' + i + '" onclick="zaznacz(' + i + ')">' + nazwa.pracownicy[i].imie_i_nazwisko + '</li>';
    }
    list.innerHTML = lista;
}
function updatePoj() {
    var poj_zew = zewnatrz.pracownicy.length.toString();
    document.getElementById('zewnatrz').innerText = poj_zew;
    var poj_zr = zr.pracownicy.length.toString();
    document.getElementById('zr').innerText = poj_zr;
    var poj_sortownia = sortownia.pracownicy.length.toString();
    document.getElementById('sortownia').innerText = poj_sortownia;
    var poj_magazyn = magazyn.pracownicy.length.toString();
    document.getElementById('magazyn').innerText = poj_magazyn;
    var poj_airstrip = airstrip.pracownicy.length.toString();
    document.getElementById('airstrip').innerText = poj_airstrip;
}
function Transfer(osoba, strefa_docelowa, strefa_macierzysta) {
    strefa_docelowa.pracownicy.push(osoba);
    strefa_macierzysta.pracownicy.forEach(function (element, index) {
        if (element.numer === osoba.numer)
            strefa_macierzysta.pracownicy.splice(index, 1);
    });
    wiadomosc('Przeniesienie pracownika udało się!');
    updatePoj();
}
function sprawdzStrefe(strefa_docelowa, strefa_macierzysta) {
    var strefy = [
        { strefa1: "zewnatrz", strefa2: "zr" },
        { strefa1: "zr", strefa2: "sortownia" },
        { strefa1: "sortownia", strefa2: "magazyn" },
        { strefa1: "sortownia", strefa2: "airstrip" },
        { strefa1: "zr", strefa2: "zewnatrz" },
        { strefa1: "sortownia", strefa2: "zr" },
        { strefa1: "magazyn", strefa2: "sortownia" },
        { strefa1: "airstrip", strefa2: "sortownia" }
    ];
    var s1 = strefa_docelowa;
    var s2 = strefa_macierzysta;
    for (var i = 0; i < strefy.length; i++) {
        if (s1 == strefy[i].strefa1 && s2 == strefy[i].strefa2)
            return true;
    }
}
function Drzwi(osoba, strefa_docelowa, strefa_macierzysta, strefa_docelowa_str, wybrana_strefa_str) {
    if (sprawdzStrefe(strefa_docelowa_str, wybrana_strefa_str)) {
        if (osoba.typ_karty == "Menadżer" && strefa_docelowa_str != "airstrip")
            Transfer(osoba, strefa_docelowa, strefa_macierzysta);
        else if (strefa_docelowa.ktomozewejsc.indexOf(osoba.typ_karty) !== -1) {
            if ((strefa_docelowa.pracownicy.length < strefa_docelowa.max_pojemnosc)) {
                if (osoba.numer < 1000)
                    Transfer(osoba, strefa_docelowa, strefa_macierzysta);
                else if (osoba.numer > 999 && strefa_docelowa != "airstrip") {
                    if (strefa_docelowa.pracownicy.length > 0)
                        Transfer(osoba, strefa_docelowa, strefa_macierzysta);
                    else
                        wiadomosc('Wybrany pracownik jest dozorcą, ale strefa jest pusta!');
                }
            }
            else
                wiadomosc('Wybrana strefa jest pełna!');
        }
        else
            wiadomosc('Ten pracownik nie ma dostępu do wybranej strefy!');
    }
    else
        wiadomosc('Brak połączenia pomiędzy strefami!');
}
function wybierz(nazwa_strefy, nazwa) {
    if (wybrana_strefa == null) {
        generowanie(nazwa);
        var strefa = document.querySelector('.' + nazwa_strefy);
        strefa.classList.add('selected');
        wybrana_strefa_str = nazwa_strefy;
        wybrana_strefa = nazwa;
    }
    else if (wybrana_strefa != null) {
        if (wybrana_strefa === nazwa) {
            document.querySelector('.' + wybrana_strefa_str).classList.remove('selected');
            document.querySelector('.list').innerHTML = '';
            wybrana_strefa = null;
            wybrana_strefa_str = null;
        }
        else if (wybrany_pracownik != null) {
            osoba = wybrana_strefa.pracownicy[wybrany_pracownik];
            strefa_docelowa_str = nazwa_strefy;
            strefa_docelowa = nazwa;
            Drzwi(osoba, strefa_docelowa, wybrana_strefa, strefa_docelowa_str, wybrana_strefa_str);
            document.getElementById('li_' + wybrany_pracownik).classList.remove('selected');
            generowanie(wybrana_strefa);
            document.querySelector('.' + wybrana_strefa_str).classList.remove('selected');
            document.querySelector('.' + strefa_docelowa_str).classList.remove('selected');
            wybrany_pracownik = null;
            wybrana_strefa = null;
            wybrana_strefa_str = null;
            strefa_docelowa = null;
            strefa_docelowa_str = null;
            osoba = null;
            document.querySelector('.list').innerHTML = '';
        }
        else if (wybrany_pracownik == null) {
            document.querySelector('.' + wybrana_strefa_str).classList.remove('selected');
            generowanie(nazwa);
            var strefa = document.querySelector('.' + nazwa_strefy);
            strefa.classList.add('selected');
            wybrana_strefa = nazwa;
            wybrana_strefa_str = nazwa_strefy;
        }
    }
}
function tester() {
    console.log('Przeniesienie pracownika (Amir Woźniak) ze strefy sortownia do strefy magazyn!');
    Drzwi({ imie_i_nazwisko: "Amir Woźniak", numer: 351, typ_karty: "Pracownik Sortowni" }, magazyn, sortownia, 'magazyn', 'sortownia');
    console.log('Próba przeniesienia pracownika (Ariel Szczepański) ze strefy sortownia do strefy airstrip w której jest już maksymalna liczba pracowników!');
    Drzwi({ imie_i_nazwisko: "Ariel Szczepański", numer: 186, typ_karty: "Pracownik Airstrip" }, airstrip, sortownia, 'airstrip', 'sortownia');
    console.log('Próba przeniesienia pracownika (Błażej Szulc) ze strefy załadunek/rozładunek do strefy sortowni do której nie ma praw dostępu!');
    Drzwi({ imie_i_nazwisko: "Błażej Szulc", numer: 725, typ_karty: "Pracownik Transportu" }, sortownia, zr, 'sortownia', 'zr');
    console.log('Przeniesienie pracownika (Dobromił Baran) ze strefy zewnątrz do strefy załadunku/rozładunku!');
    Drzwi({ imie_i_nazwisko: "Dobromił Baran", numer: 230, typ_karty: "Pracownik Sortowni" }, zr, zewnatrz, 'zr', 'zewnatrz');
    console.log('Próba przeniesienia dozorcy (Marcel Malinowski) ze strefy zewnątrz do strefy załadunku/rozładunku w której nie przebywa inny pracownik!');
    Drzwi({ imie_i_nazwisko: "Błażej Szulc", numer: 725, typ_karty: "Pracownik Transportu" }, zewnatrz, zr, 'zewnatrz', 'zr');
    Drzwi({ imie_i_nazwisko: "Dobromił Baran", numer: 230, typ_karty: "Pracownik Sortowni" }, zewnatrz, zr, 'zewnatrz', 'zr');
    Drzwi({ imie_i_nazwisko: "Marcel Malinowski", numer: 1032, typ_karty: "Dozorca" }, zr, zewnatrz, 'zr', 'zewnatrz');
}
tester();
