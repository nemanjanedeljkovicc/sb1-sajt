//funkcija za dohvatanje ajax-a , kojoj se proseldjuju parametri url i naziv funkcije
function dohvatiJson(url,callback){
$.ajax({
    url:url,
    method:"get",
    dataType:"json",
    success:function(nizPodataka){
        callback(nizPodataka);
    },
    error:function(xhr){
        console.log(xhr);
    }
});
}

//funkcija za ispis navigacije
function ispisNavigacije(nizMeni){
    let ispis="";
    ispis+=`<ul class="navbar-nav ms-auto">`;
    for(let m of nizMeni){
        ispis+=`<li class="nav-item">
                    <a aria-current="page" class="nav-link" href="${m.href}">${m.tekst}</a>
                </li>`;
    }
    ispis+=`<li class="nav-item">
                <a aria-current="page" class="nav-link position-relative" href="korpa.html"><i class='fa-solid fa-basket-shopping'></i><span id="broj-proizvoda" class="position-absolute top-30 start-100 
                                translate-middle badge rounded-pill bg-primary">
                                    0
                                <span class="visually-hidden">unread messages</span>
                              </span></a>
            </li>`
    ispis+=`</ul>`;
    $("#navbarNav").html(ispis);
}
dohvatiJson("assets/meni.json",ispisNavigacije);

//ispis top ponude
function ispisTopPonuda(niz,$blok,promenljiva){
    console.log(promenljiva);
    let ispis="";
    for(let n of niz){
        console.log(n[promenljiva]);
        if(n[promenljiva]==true){
        ispis+=`<div class="col-lg-3 col-md-6">
                    <div class="centriranje-proizvod">
                    <div class="card">
                        <img src="${n.src}" class="card-img-top" alt="${n.naziv}" />
                        <div class="card-body">
                            <h5 class="card-title text-center">${n.naziv}</h5>
                            <p class="card-text">${n.opis}</p>`;
                            if(n.id==2 || n.id==5){
                                ispis+=`<p class="position-relative w-50"><del>${n.cena.bezPopusta}</del><span class="position-absolute top-50 start-100 
                                translate-middle badge rounded-pill bg-primary">
                                ${n.cena.saPopustom}
                                <span class="visually-hidden">unread messages</span>
                              </span></p>`;
                            }
                            else{
                                ispis+=`<p>${n.cena.bezPopusta}</p>`;
                            }
                            ispis+=`<a href="prodavnica.html" class="btn btn-primary">Poseti prodavnicu<i class='fa-solid fa-basket-shopping'></i></a>
                        </div>
                        </div>
                    </div>
                </div>`
                        }
    }
    $blok.html(ispis);
}
dohvatiJson("assets/sviProizvodi.json",function(data){
    ispisTopPonuda(data,$("#topPonuda"),"topPonuda");
});
dohvatiJson("assets/sviProizvodi.json", function(data) {
    ispisTopPonuda(data, $("#proizvodi"),"odabranPr");
});

//funkcija za ispisivanje bloka-logo
function ispisLogo(nizLogo){
    let ispis="";
    for(let n of nizLogo){
        ispis+=`<div class="col-lg-2 col-md-4">
        <div class="centriranje-proizvod">
                    <div class="card">
                        <img src="${n.src}" class="card-img-top" alt="${n.alt}">
                    </div>
                    </div>
                </div>`;
    }
    $("#ispis_logo").html(ispis);
}
dohvatiJson("assets/logo.json",ispisLogo);




//funkcija za ispis futera
function ispisFutera(nizFuter){
    let ispis="";
    let brojac=0;
    ispis+=` <div class="col-lg-4 col-12">`;
    ispis+=`<h4 class="text-center">Prati nas</h4><ul class="d-flex justify-content-center">`;
    for(let n of nizFuter.ikonice){
        brojac++;
        ispis+=`<li class="col-3 text-center"><a href="${n.href}"><i class="${n.ikonica}"></i></a></li>`;
        if(brojac%3==0){
            ispis+=`</ul><ul class="d-flex justify-content-center">`;
        }
    }
    ispis+=`</ul></div>`;

    for(let f of nizFuter.ponuda){
        ispis+=`<div class="col-lg-4 col-12">
                    <h4 class="text-center">${f.naslov}</h4>
                    <ul class="row text-center">
                        <li class="col-12">${f.opis.prvi}</li>
                        <li class="col-12">${f.opis.drugi}</li>
                        <li class="col-12">${f.opis.treci}</li>
                    </ul>
                </div>`
    }


    $("#social").html(ispis);
}
dohvatiJson("assets/footer.json",ispisFutera);

//ispis svih proizvoda
function ispisSvihProizvoda(niz, $blok) {
    let ispis = "";
    for (let n of niz) {
        ispis += `<div class="col-12 col-md-6 col-lg-4 mt-3">
                    <div class="centriranje-proizvod">
                    <div class="card">
                        <img src="${n.src}" class="card-img-top" alt="${n.naziv}" />
                        <div class="card-body">
                            <h5 class="card-title text-center">${n.naziv}</h5>
                            <p class="card-text">${n.opis}</p>`;
        if (n.id == 2 || n.id == 5 || n.id == 12 || n.id == 9 || n.id == 16) {
            ispis += `<p class="position-relative w-50"><del>${n.cena.bezPopusta} RSD</del><span class="position-absolute top-50 start-100 
                                translate-middle badge rounded-pill bg-primary">
                                ${n.cena.saPopustom} RSD
                                <span class="visually-hidden">unread messages</span>
                              </span></p>`;
        } else {
            ispis += `<p>${n.cena.bezPopusta} RSD</p>`;
        }
        ispis += `<input id="dugmeKlik" type="button" data-id="${n.id}" value="Dodaj u korpu" class="btn btn-primary add-to-cart" />
                        </div>
                    </div>
                    </div>
                </div>`;
    }
    $blok.html(ispis);
    $('.add-to-cart').click(addToCart);
}

dohvatiJson("assets/sviProizvodi.json", function(data) {
    ispisSvihProizvoda(data, $("#ispisProizvoda"));
});


//ispis padajuce liste kategorija
function ispisKategorije(niz,$blok){
    let ispis = "";
    ispis+="<h3>Kategorije</h3>"
    for (let n of niz) {
        ispis += `<input type="checkbox" id="${n.id}" value="${n.id}" />
                   <label for="${n.id}">${n.naziv}</label><br>`;
    }
    $blok.html(ispis);
}
dohvatiJson("assets/kategorija.json",function(data){
    ispisKategorije(data,$("#listaKategorije"));
});

//ispis padajuce liste brendovi
function ispisBrendovi(niz, $blok) {
    let ispis = "";
    ispis+="<h3>Brendovi</h3>"
    for (let n of niz) {
        ispis += `<input type="checkbox" id="brend_${n.id}" value="${n.id}" />
                   <label for="brend_${n.id}">${n.naziv}</label><br>`;
    }
    $blok.html(ispis);
}

dohvatiJson("assets/brendovi.json", function(data) {
    ispisBrendovi(data, $("#listaBrendovi"));
});



$("#sortiranjeNaziv").change(function() {
    let tip = $(this).val();
    dohvatiJson("assets/sviProizvodi.json", function(sviProizvodi) {
        sortiranje(sviProizvodi, tip);
    });
});

$("#sortiranjeBoje").change(function() {
    let tip = $(this).val();
    dohvatiJson("assets/sviProizvodi.json", function(sviProizvodi) {
        filterBoja(sviProizvodi, tip);
    });
});




$(document).on("click", "#listaKategorije input[type='checkbox']", function() {
    let odabraneKategorije = [];
    $("#listaKategorije input[type='checkbox']:checked").each(function() {
        odabraneKategorije.push($(this).val());
    });

    if (odabraneKategorije.length === 0) {
        dohvatiJson("assets/sviProizvodi.json", function(sviProizvodi) {
            ispisSvihProizvoda(sviProizvodi, $("#ispisProizvoda"));
        });
    } else {
        dohvatiJson("assets/sviProizvodi.json", function(sviProizvodi) {
            obradaKategorija(sviProizvodi, odabraneKategorije);
        });
    }
});

$(document).on("click", "#listaBrendovi input[type='checkbox']", function() {
    let odabraniBrendovi = [];
    $("#listaBrendovi input[type='checkbox']:checked").each(function() {
        odabraniBrendovi.push($(this).val());
    });

    if (odabraniBrendovi.length === 0) {
        dohvatiJson("assets/sviProizvodi.json", function(sviProizvodi) {
            ispisSvihProizvoda(sviProizvodi, $("#ispisProizvoda"));
        });
    } else {
        dohvatiJson("assets/sviProizvodi.json", function(sviProizvodi) {
            obradaBrendova(sviProizvodi, odabraniBrendovi);
        });
    }
});


//obrada kategorija
function obradaKategorija(sviProizvodi, kategorijaId) {
    let filtrirane = [];
    for (let k of sviProizvodi) {
        for(let n of kategorijaId){
        if (n == k.kategorija) {
            filtrirane.push(k);
        }
    }
}
    ispisSvihProizvoda(filtrirane, $("#ispisProizvoda"));
}

//obrada brendova
function obradaBrendova(sviProizvodi, brendId) {
    console.log("brend id je" + brendId);
    let filtrirane = [];
    for (let b of sviProizvodi) {
        for(let n of brendId){
            console.log(n);
            if (n == b.brend) {
                filtrirane.push(b);
            }
    }
}
    ispisSvihProizvoda(filtrirane, $("#ispisProizvoda"));
}

//sortiranje
function sortiranje(sviProizvodi,tip){
    let filtrirane = [];
    for (let b of sviProizvodi) {
        if(tip=="nazivAsc"){
            sviProizvodi.sort(function(a,b){
                if(a.naziv<b.naziv){
                    return -1;
                }
                else if(a.naziv>b.naziv){
                    return 1;
                }
                else{
                    return 0;
                }
            })
        }
        if(tip=="nazivDesc"){
            sviProizvodi.sort(function(a,b){
                if(a.naziv>b.naziv){
                    return -1;
                }
                else if(a.naziv<b.naziv){
                    return 1;
                }
                else{
                    return 0;
                }
            })
        }

        if(tip=="cenaDesc"){
            sviProizvodi.sort(function(a,b){
                return a.cena.bezPopusta - b.cena.bezPopusta;
            })
        }
        if(tip=="cenaAsc"){
            sviProizvodi.sort(function(a,b){
                return b.cena.bezPopusta - a.cena.bezPopusta;
            })
        }
    }
    ispisSvihProizvoda(sviProizvodi, $("#ispisProizvoda"));
}

//filtriranje po boji
function filterBoja(sviProizvodi,tip){
    let filter=[];
    for(let f of sviProizvodi){
        if(tip==f.boja){
            filter.push(f);
        }
    }
    ispisSvihProizvoda(filter,$("#ispisProizvoda"));
}

$(document).ready(function() {
    $("#pretragaNaziv").on("input", function() {
        let pretrazi = $(this).val().toLowerCase();
        dohvatiJson("assets/sviProizvodi.json", function(sviProizvodi) {
            let filtriraniProizvodi = sviProizvodi.filter(function(proizvod) {
                return proizvod.naziv.toLowerCase().includes(pretrazi);
            });
            ispisSvihProizvoda(filtriraniProizvodi, $("#ispisProizvoda"));
        });
    });
    listaDrzava();
    listaGradovi();
});


function listaGradovi(){
    let gradovi=["Beograd","Valjevo","Niš","Šabac","Novi Sad","Kraljevo"];
    let ispis="";
    ispis+=`<select id="ddlGradovi">`;
    ispis+=`<option value="0">Grad</option>`
    for(let i=1;i<gradovi.length;i++){
        ispis+=`<option value="${i}">${gradovi[i]}</option>`;
    }
    ispis+=`</select><br/>`
    ispis+=`<span class="span5">Morate izabrati bar jedan grad</span>`;
    $("#grad").html(ispis);
}


function listaDrzava(){
    let drzava=["Srbija","Hrvatska","Crna Gora","Madjarska","Bugarska","Makedonija"];
    let ispis="";
    ispis+=`<select id="ddlDrzava">`;
    ispis+=`<option value="0">Drzava</option>`
    for(let i=1;i<drzava.length;i++){
        ispis+=`<option value="${i}">${drzava[i]}</option>`;
    }
    ispis+=`</select><br/>`;
    ispis+=`<span class="span6">Morate izabrati bar jednu drzavu</span>`;
    $("#drzava").html(ispis);
}

//provera forme
$(document).ready(function() {
    var imeRegex = /^[A-ZŠĐČĆ][a-zšđčć]{2,12}$/;
    var prezimeRegex = /^[A-ZŠĐČĆ][a-zšđčć]{2,20}$/;
    var emailRegex = /^[a-z][\w.-]*@[a-z0-9.-]+\.[a-z]{2,}$/; 
    var areaRegex = /^.{10,}$/; 
    var telefonRegex = /^\d{10}$/; 

    $("#textIme").on("input", function() {
        var ime = $(this).val();
        if (!imeRegex.test(ime)) {
            $(".span1").addClass("prikazi"); 
        } else {
            $(".span1").removeClass("prikazi");
        }
    });

    $("#textPrezime").on("input", function() {
        var prezime = $(this).val();
        if (!prezimeRegex.test(prezime)) {
            $(".span2").addClass("prikazi"); 
        } else {
            $(".span2").removeClass("prikazi");
        }
    });

    $("#textEmail").on("input", function() {
        var email = $(this).val();
        if (!emailRegex.test(email)) {
            $(".span3").addClass("prikazi"); 
        } else {
            $(".span3").removeClass("prikazi");
        }
    });

    $("#textTelefon").on("input", function() {
        var telefon = $(this).val();
        if (!telefonRegex.test(telefon)) {
            $(".span4").addClass("prikazi"); 
        } else {
            $(".span4").removeClass("prikazi");
        }
    });

    $("#ddlGradovi").on("change", function() {
        if ($("#ddlGradovi").prop('selectedIndex') === 0) {
            $(".span5").addClass("prikazi"); 
        } else {
            $(".span5").removeClass("prikazi");
        }
    });

    $("#ddlDrzava").on("change", function() {
        if ($("#ddlDrzava").prop('selectedIndex') === 0) {
            $(".span6").addClass("prikazi"); 
        } else {
            $(".span6").removeClass("prikazi");
        }
    });

    $("#textArea").on("input", function() {
        var area = $(this).val();
        if (!areaRegex.test(area)) {
            $(".span7").addClass("prikazi"); 
        } else {
            $(".span7").removeClass("prikazi");
        }
    });

    $("#dugme1").on("click",function(){
        var ime = $("#textIme").val();
        var prezime = $("#textPrezime").val();
        var email = $("#textEmail").val();
        var telefon = $("#textTelefon").val();
        var area = $("#textArea").val();
        var gradIndex = $("#ddlGradovi").prop('selectedIndex');
        var drzavaIndex = $("#ddlDrzava").prop('selectedIndex');

        if(prezimeRegex.test(prezime) && imeRegex.test(ime) && emailRegex.test(email) && telefonRegex.test(telefon) && drzavaIndex   !== 0 &&
        gradIndex !== 0 && areaRegex.test(area)){
            $(".span8").addClass("prikazi2"); 
        }

        var podaci = {
            ime: ime,
            prezime: prezime,
            email: email,
            telefon: telefon,
            area: area,
            gradIndex: gradIndex,
            drzavaIndex: drzavaIndex
        };

        skladistenjeLocalStorage(podaci);
    });
    var sacuvaniPodaci = localStorage.getItem('podaci');
    if (sacuvaniPodaci) {
        var podaci = JSON.parse(sacuvaniPodaci);
        $("#textIme").val(podaci.ime);
        $("#textPrezime").val(podaci.prezime);
        $("#textEmail").val(podaci.email);
        $("#textTelefon").val(podaci.telefon);
        $("#textArea").val(podaci.area);
        $("#ddlGradovi").prop('selectedIndex', podaci.gradIndex);
        $("#ddlDrzava").prop('selectedIndex', podaci.drzavaIndex);
    }

    $("#dugme2").on("click", function() {
        localStorage.removeItem('podaci');
        $("#textIme").val('');
        $("#textPrezime").val('');
        $("#textEmail").val('');
        $("#textTelefon").val('');
        $("#textArea").val('');
        $("#ddlGradovi").prop('selectedIndex', 0);
        $("#ddlDrzava").prop('selectedIndex', 0);
    });
});


$(document).ready(function(){
    dohvatiJson("assets/sviProizvodi.json",function(result){
        skladistenjeLocalStorage("sviProizvodi",result);
    });

    brojElemenataKorpe();
});


function skladistenjeLocalStorage(name,data){
    localStorage.setItem(name,JSON.stringify(data));
}

//dodavanje proizvoda u korpu
function addToCart() {
    let id = $(this).data('id');
    let productsFromCart = getItemFromLocalStorage("productsCart");

    if (productsFromCart) {
        if (productIsAlreadyInCart()) {
            updateQuantity();
        } else {
            addToLocalStorage();
            brojElemenataKorpe();
        }
    } else {
        addFirstItemToCart();
        brojElemenataKorpe();
    }


    displayCartData();

    function addFirstItemToCart() {
        let sviProizvodi = [{
            id: id,
            quantity: 1
        }];
        localStorage.setItem("productsCart", JSON.stringify(sviProizvodi));
    }

    function productIsAlreadyInCart() {
        return productsFromCart.some(p => p.id === id);
    }

    function updateQuantity() {
        let productsLS = getItemFromLocalStorage("productsCart");
        for (let i = 0; i < productsLS.length; i++) {
            if (productsLS[i].id == id) {
                productsLS[i].quantity++;
                break;
            }
        }
        localStorage.setItem("productsCart", JSON.stringify(productsLS));
    }

    function addToLocalStorage() {
        let sviProizvodi = getItemFromLocalStorage("productsCart");
        sviProizvodi.push({
            id: id,
            quantity: 1
        });
        localStorage.setItem("productsCart", JSON.stringify(sviProizvodi));
    }

    function showEmptyCart(){
        $("#content").html("Vaša korpa je prazna");
    }
}


    
var productsFromCart=getItemFromLocalStorage("productsCart");
function brojElemenataKorpe(){
    var productsFromCart=getItemFromLocalStorage("productsCart");
    if(productsFromCart!=null)
    {
        let numberOfProducts=productsFromCart.length;
        $('#broj-proizvoda').html(`${numberOfProducts}`);
    }
    else{
        $('#broj-proizvoda').html(`0`);
    }
    
}


// Funkcija za dohvatanje podataka iz lokalnog skladišta
function getItemFromLocalStorage(name) {
    return JSON.parse(localStorage.getItem(name));
}

    if(productsFromCart==null){
        showEmptyCart();
    }
    else{
        displayCartData();
    }

    function showEmptyCart(){
        $("#content").html("<h2 class='text-center'>Vasa korpa je prazna</h2>");
    }

    function displayCartData(){
        dohvatiJson("assets/sviProizvodi.json",function(data){
            console.log(data);
            productsFromCart=getItemFromLocalStorage("productsCart");
            let productsForDisplay=[];
            productsForDisplay=data.filter(p=>{
                for(let prod of productsFromCart)
                {
                    if(p.id==prod.id){
                        p.quantity=prod.quantity;
                        return true;
                    }
                }
                return false;
            })
            
            generateTable(productsForDisplay);
        });
    }

    function generateTable(sviProizvodi){
        
        let html=`
                <table>
                    <thead>
                        <tr>
                            <th>Proizvod</th>
                            <th>Proizvod ime</th>
                            <th>Cena</th>
                            <th>Kolicina</th>
                            <th>Ukloni</th>
                        </tr>
                    </thead>
                    <tbody>
                `;
        for(let p of sviProizvodi){
            
            html+=generateTr(p);
        }
        html+=`</tbody>
                </table>`;

                $('#content').html(html);

        function generateTr(p){
            return `<tr class="rem1">
            <td class="invert-image">
                    <img src="${p.src}" style="height:100px" alt="${p.naziv}" class="img-responsive">
            </td>
            <td class="invert">${p.naziv}</td>
            <td class="invert">${p.cena.bezPopusta}RSD</td>
            <td class="invert">${p.quantity}</td>
            <td class="invert">
                <div class="rem">
                <div class=""><button onclick="removeFromCart(${p.id})">Remove</button></div>
                </div>
            </td>
            </tr>`;
        }
        
    }

    function removeFromCart(id){
        let products=getItemFromLocalStorage("productsCart");
        let filtered=products.filter(p=>p.id!=id);
        localStorage.setItem("productsCart",JSON.stringify(filtered));
        displayCartData();
        brojElemenataKorpe();
    }
    





